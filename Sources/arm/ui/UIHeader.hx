package arm.ui;

import kha.System;
import zui.Zui;
import zui.Id;
import iron.RenderPath;
import arm.node.MaterialParser;
import arm.util.UVUtil;
import arm.util.RenderUtil;
import arm.io.ImportFont;
import arm.Enums;

class UIHeader {

	public static var inst: UIHeader;

	public static inline var defaultHeaderH = 28;

	public var headerHandle = new Handle({layout: Horizontal});
	public var headerh = defaultHeaderH;
	public var worktab = Id.handle();

	public function new() {
		inst = this;
	}

	@:access(zui.Zui)
	public function renderUI(g: kha.graphics2.Graphics) {
		var ui = UISidebar.inst.ui;

		var panelx = iron.App.x();
		if (ui.window(headerHandle, panelx, headerh, System.windowWidth() - UIToolbar.inst.toolbarw - UISidebar.inst.windowW, Std.int(defaultHeaderH * ui.SCALE()))) {
			ui._y += 2;

			if (Context.tool == ToolColorId) {
				ui.text(tr("Picked Color"));
				if (Context.colorIdPicked) {
					ui.image(RenderPath.active.renderTargets.get("texpaint_colorid").image, 0xffffffff, 64);
				}
				if (ui.button("Clear")) Context.colorIdPicked = false;
				ui.text(tr("Color ID Map"));
				var cid = ui.combo(Context.colorIdHandle, App.enumTexts("TEX_IMAGE"), tr("Color ID"));
				if (Context.colorIdHandle.changed) Context.ddirty = 2;
				if (Project.assets.length > 0) ui.image(UISidebar.inst.getImage(Project.assets[cid]));
			}
			else if (Context.tool == ToolPicker) {
				Context.baseRPicked = Math.round(Context.baseRPicked * 10) / 10;
				Context.baseGPicked = Math.round(Context.baseGPicked * 10) / 10;
				Context.baseBPicked = Math.round(Context.baseBPicked * 10) / 10;
				Context.normalRPicked = Math.round(Context.normalRPicked * 10) / 10;
				Context.normalGPicked = Math.round(Context.normalGPicked * 10) / 10;
				Context.normalBPicked = Math.round(Context.normalBPicked * 10) / 10;
				Context.occlusionPicked = Math.round(Context.occlusionPicked * 100) / 100;
				Context.roughnessPicked = Math.round(Context.roughnessPicked * 100) / 100;
				Context.metallicPicked = Math.round(Context.metallicPicked * 100) / 100;
				var baseRPicked = Context.baseRPicked;
				var baseGPicked = Context.baseGPicked;
				var baseBPicked = Context.baseBPicked;
				var normalRPicked = Context.normalRPicked;
				var normalGPicked = Context.normalGPicked;
				var normalBPicked = Context.normalBPicked;
				var occlusionPicked = Context.occlusionPicked;
				var roughnessPicked = Context.roughnessPicked;
				var metallicPicked = Context.metallicPicked;
				#if kha_metal
				ui.text('TODO'); // Skips first draw
				#end
				ui.text(tr("Base") + ' $baseRPicked,$baseGPicked,$baseBPicked');
				ui.text(tr("Nor") + ' $normalRPicked,$normalGPicked,$normalBPicked');
				ui.text(tr("Occlusion") + ' $occlusionPicked');
				ui.text(tr("Roughness") + ' $roughnessPicked');
				ui.text(tr("Metallic") + ' $metallicPicked');
				Context.pickerSelectMaterial = ui.check(Id.handle({selected: Context.pickerSelectMaterial}), tr("Select Material"));
				ui.combo(Context.pickerMaskHandle, [tr("None"), tr("Material")], tr("Mask"), true);
				if (Context.pickerMaskHandle.changed) {
					MaterialParser.parsePaintMaterial();
				}
			}
			else if (Context.tool == ToolBake) {
				ui.changed = false;
				var bakeHandle = Id.handle({position: Context.bakeType});
				var bakes = [
					tr("AO"),
					tr("Curvature"),
					tr("Normal"),
					tr("Object Normal"),
					tr("Height"),
					tr("Derivative"),
					tr("Position"),
					tr("TexCoord"),
					tr("Material ID"),
					tr("Object ID"),
					tr("Vertex Color"),
				];
				#if kha_direct3d12
				bakes.push(tr("Lightmap"));
				bakes.push(tr("Bent Normal"));
				bakes.push(tr("Thickness"));
				#end
				Context.bakeType = ui.combo(bakeHandle, bakes, tr("Bake"));
				if (Context.bakeType == BakeNormalObject || Context.bakeType == BakePosition || Context.bakeType == BakeBentNormal) {
					var bakeUpAxisHandle = Id.handle({position: Context.bakeUpAxis});
					Context.bakeUpAxis = ui.combo(bakeUpAxisHandle, ["Z", "Y"], tr("Up Axis"), true);
				}
				if (Context.bakeType == BakeAO || Context.bakeType == BakeCurvature) {
					var bakeAxisHandle = Id.handle({position: Context.bakeAxis});
					Context.bakeAxis = ui.combo(bakeAxisHandle, ["XYZ", "X", "Y", "Z", "-X", "-Y", "-Z"], tr("Axis"), true);
				}
				if (Context.bakeType == BakeAO) {
					var strengthHandle = Id.handle({value: Context.bakeAoStrength});
					Context.bakeAoStrength = ui.slider(strengthHandle, tr("Strength"), 0.0, 2.0, true);
					var radiusHandle = Id.handle({value: Context.bakeAoRadius});
					Context.bakeAoRadius = ui.slider(radiusHandle, tr("Radius"), 0.0, 2.0, true);
					var offsetHandle = Id.handle({value: Context.bakeAoOffset});
					Context.bakeAoOffset = ui.slider(offsetHandle, tr("Offset"), 0.0, 2.0, true);
				}
				#if kha_direct3d12
				if (Context.bakeType == BakeAO || Context.bakeType == BakeLightmap || Context.bakeType == BakeBentNormal || Context.bakeType == BakeThickness) {
					ui.text(tr("Rays/pix:") + ' ${arm.render.RenderPathRaytrace.raysPix}');
					ui.text(tr("Rays/sec:") + ' ${arm.render.RenderPathRaytrace.raysSec}');
				}
				#end
				if (Context.bakeType == BakeCurvature) {
					var strengthHandle = Id.handle({value: Context.bakeCurvStrength});
					Context.bakeCurvStrength = ui.slider(strengthHandle, tr("Strength"), 0.0, 2.0, true);
					var radiusHandle = Id.handle({value: Context.bakeCurvRadius});
					Context.bakeCurvRadius = ui.slider(radiusHandle, tr("Radius"), 0.0, 2.0, true);
					var offsetHandle = Id.handle({value: Context.bakeCurvOffset});
					Context.bakeCurvOffset = ui.slider(offsetHandle, tr("Offset"), 0.0, 2.0, true);
					var smoothHandle = Id.handle({value: Context.bakeCurvSmooth});
					Context.bakeCurvSmooth = Std.int(ui.slider(smoothHandle, tr("Smooth"), 0, 5, false, 1));
				}
				if (Context.bakeType == BakeNormal || Context.bakeType == BakeHeight || Context.bakeType == BakeDerivative) {
					var ar = [for (p in Project.paintObjects) p.name];
					var polyHandle = Id.handle({position: Context.bakeHighPoly});
					Context.bakeHighPoly = ui.combo(polyHandle, ar, tr("High Poly"));
				}
				if (ui.changed) {
					MaterialParser.parsePaintMaterial();
				}
			}
			else if (Context.tool == ToolBrush ||
					 Context.tool == ToolEraser ||
					 Context.tool == ToolFill ||
					 Context.tool == ToolDecal ||
					 Context.tool == ToolText ||
					 Context.tool == ToolClone ||
					 Context.tool == ToolBlur ||
					 Context.tool == ToolParticle) {

				if (Context.tool != ToolFill) {
					Context.brushRadius = ui.slider(Context.brushRadiusHandle, tr("Radius"), 0.01, 2.0, true);
				}

				if (Context.tool == ToolDecal) {
					Context.brushScaleX = ui.slider(Context.brushScaleXHandle, tr("Scale X"), 0.01, 2.0, true);
				}

				if (Context.tool == ToolBrush  ||
					Context.tool == ToolFill   ||
					Context.tool == ToolDecal  ||
					Context.tool == ToolText) {
					var brushScaleHandle = Id.handle({value: Context.brushScale});
					Context.brushScale = ui.slider(brushScaleHandle, tr("UV Scale"), 0.01, 5.0, true);
					if (brushScaleHandle.changed) {
						if (Context.tool == ToolDecal || Context.tool == ToolText) {
							ui.g.end();
							RenderUtil.makeDecalPreview();
							ui.g.begin(false);
						}
					}

					Context.brushAngle = ui.slider(Context.brushAngleHandle, tr("Angle"), 0.0, 360.0, true, 1);
					if (Context.brushAngleHandle.changed) {
						MaterialParser.parsePaintMaterial();
					}
				}

				Context.brushOpacity = ui.slider(Context.brushOpacityHandle, tr("Opacity"), 0.0, 1.0, true);

				if (Context.tool == ToolBrush || Context.tool == ToolEraser) {
					Context.brushHardness = ui.slider(Id.handle({value: Context.brushHardness}), tr("Hardness"), 0.0, 1.0, true);
				}

				if (Context.tool != ToolEraser) {
					var brushBlendingHandle = Id.handle({value: Context.brushBlending});
					Context.brushBlending = ui.combo(brushBlendingHandle, [
						tr("Mix"),
						tr("Darken"),
						tr("Multiply"),
						tr("Burn"),
						tr("Lighten"),
						tr("Screen"),
						tr("Dodge"),
						tr("Add"),
						tr("Overlay"),
						tr("Soft Light"),
						tr("Linear Light"),
						tr("Difference"),
						tr("Subtract"),
						tr("Divide"),
						tr("Hue"),
						tr("Saturation"),
						tr("Color"),
						tr("Value"),
					], tr("Blending"));
					if (brushBlendingHandle.changed) {
						MaterialParser.parsePaintMaterial();
					}
				}

				if (Context.tool == ToolBrush || Context.tool == ToolFill) {
					var paintHandle = Id.handle();
					Context.brushPaint = ui.combo(paintHandle, [tr("UV Map"), tr("Triplanar"), tr("Project")], tr("TexCoord"));
					if (paintHandle.changed) {
						MaterialParser.parsePaintMaterial();
					}
				}
				if (Context.tool == ToolText) {
					var h = Id.handle();
					h.text = Context.textToolText;
					Context.textToolText = ui.textInput(h, "");
					if (h.changed) {
						ui.g.end();
						RenderUtil.makeTextPreview();
						RenderUtil.makeDecalPreview();
						ui.g.begin(false);
					}
				}

				if (Context.tool == ToolFill) {
					ui.combo(Context.fillTypeHandle, [tr("Object"), tr("Face"), tr("Angle")], tr("Fill Mode"));
					if (Context.fillTypeHandle.changed) {
						if (Context.fillTypeHandle.position == FillFace) {
							ui.g.end();
							// UVUtil.cacheUVMap();
							UVUtil.cacheTriangleMap();
							ui.g.begin(false);
							// wireframeHandle.selected = drawWireframe = true;
						}
						MaterialParser.parsePaintMaterial();
						MaterialParser.parseMeshMaterial();
					}
				}
				else {
					var _w = ui._w;
					var sc = ui.SCALE();
					ui._w = Std.int(60 * sc);

					var xrayHandle = Id.handle({selected: Context.xray});
					Context.xray = ui.check(xrayHandle, tr("X-Ray"));
					if (xrayHandle.changed) {
						MaterialParser.parsePaintMaterial();
					}

					var symXHandle = Id.handle({selected: false});
					var symYHandle = Id.handle({selected: false});
					var symZHandle = Id.handle({selected: false});
					ui._w = Std.int(55 * sc);
					ui.text("Symmetry");
					ui._w = Std.int(25 * sc);
					Context.symX = ui.check(symXHandle, "X");
					Context.symY = ui.check(symYHandle, "Y");
					Context.symZ = ui.check(symZHandle, "Z");
					if (symXHandle.changed || symYHandle.changed || symZHandle.changed) {
						MaterialParser.parsePaintMaterial();
					}

					ui._w = _w;
				}
			}
		}
	}
}
