package arm.io;

import haxe.io.Bytes;
import kha.Window;
import kha.Blob;
import kha.Image;
import kha.graphics4.TextureFormat;
import kha.graphics4.DepthStencilFormat;
import zui.Nodes;
import iron.data.MaterialData;
import iron.data.MeshData;
import iron.data.Data;
import iron.data.SceneFormat;
import iron.system.ArmPack;
import iron.object.Object;
import iron.object.MeshObject;
import iron.Scene;
import iron.RenderPath;
import arm.ProjectFormat;
import arm.ui.UISidebar;
import arm.ui.UIFiles;
import arm.sys.Path;
import arm.sys.File;
import arm.format.Lz4;
import arm.util.RenderUtil;
import arm.util.ViewportUtil;
import arm.util.MeshUtil;
import arm.data.LayerSlot;
import arm.data.BrushSlot;
import arm.data.MaterialSlot;
import arm.node.MaterialParser;
import arm.Enums;

class ImportArm {

	public static function runMesh(raw: TSceneFormat) {
		Project.paintObjects = [];
		for (i in 0...raw.mesh_datas.length) {
			new MeshData(raw.mesh_datas[i], function(md: MeshData) {
				var object: MeshObject = null;
				if (i == 0) {
					Context.paintObject.setData(md);
					object = Context.paintObject;
				}
				else {
					object = Scene.active.addMeshObject(md, Context.paintObject.materials, Context.paintObject);
					object.name = md.name;
					object.skip_context = "paint";
					md.handle = md.name;
					Data.cachedMeshes.set(md.handle, md);
				}
				object.transform.scale.set(1, 1, 1);
				object.transform.buildMatrix();
				object.name = md.name;
				Project.paintObjects.push(object);
			});
		}
		iron.App.notifyOnRender(Layers.initLayers);
		History.reset();
	}

	public static function runScene(raw: TSceneFormat, path: String) {
		var _dataPath = Data.dataPath;
		Data.dataPath = path.substring(0, path.lastIndexOf(Path.sep) + 1);
		raw.name += "_imported";
		Data.cachedSceneRaws.set(raw.name, raw);
		Scene.active.addScene(raw.name, null, function(sceneObject: Object) {
			traverseObjects(sceneObject.children);
		});
		Data.dataPath = _dataPath;
	}

	static function traverseObjects(objects: Array<Object>) {
		if (objects == null) return;
		for (o in objects) {
			if (Std.is(o, MeshObject)) {
				var mo = cast(o, MeshObject);
				var count = mo.data.geom.indices.length;
				mo.materials = new haxe.ds.Vector(count);
				for (i in 0...count) {
					mo.materials[i] = Context.materialScene.data;
				}
			}
			traverseObjects(o.children);
		}
	}

	public static function runProject(path: String) {
		Data.getBlob(path, function(b: Blob) {
			var project: TProjectFormat = ArmPack.decode(b.toBytes());

			// Upgrade project format
			if (project.version == "0.8") {
				if (project.mesh_datas != null) {
					for (md in project.mesh_datas) {
						for (va in md.vertex_arrays) {
							if (va.data == null) {
								va.data = va.attrib == "pos" ? "short4norm" : "short2norm";
							}
						}
					}
				}
			}

			// Import as material instead
			if (project.version != null && project.layer_datas == null) {
				runMaterialFromProject(project, path);
				return;
			}

			Context.layersPreviewDirty = true;
			Project.projectNew(false);
			Project.filepath = path;
			UIFiles.filename = path.substring(path.lastIndexOf(Path.sep) + 1, path.lastIndexOf("."));
			Window.get(0).title = UIFiles.filename + " - ArmorPaint";

			// Import as mesh instead
			if (project.version == null) {
				untyped project.objects == null ? runMesh(untyped project) : runScene(untyped project, path);
				return;
			}

			Project.raw = project;

			var l0 = project.layer_datas[0];
			App.resHandle.position = Config.getTextureResPos(l0.res);
			var bitsPos = l0.bpp == 8 ? Bits8 : l0.bpp == 16 ? Bits16 : Bits32;
			App.bitsHandle.position = bitsPos;
			var bytesPerPixel = Std.int(l0.bpp / 8);
			var format = l0.bpp == 8 ? TextureFormat.RGBA32 : l0.bpp == 16 ? TextureFormat.RGBA64 : TextureFormat.RGBA128;

			var base = Path.baseDir(path);
			for (file in project.assets) {
				#if krom_windows
				file = file.replace("/", "\\");
				#else
				file = file.replace("\\", "/");
				#end
				// Convert image path from relative to absolute
				var abs = Data.isAbsolute(file) ? file : base + file;
				if (!File.exists(abs)) {
					makePink(abs);
				}
				ImportTexture.run(abs);
			}

			var m0: MaterialData = null;
			Data.getMaterial("Scene", "Material", function(m: MaterialData) {
				m0 = m;
			});

			Project.materials = [];
			for (n in project.material_nodes) {
				initNodes(n.nodes);
				Context.material = new MaterialSlot(m0, n);
				Project.materials.push(Context.material);
				MaterialParser.parsePaintMaterial();
				RenderUtil.makeMaterialPreview();
			}

			Project.brushes = [];
			for (n in project.brush_nodes) {
				initNodes(n.nodes);
				Context.brush = new BrushSlot(n);
				Project.brushes.push(Context.brush);
				MaterialParser.parseBrush();
				Context.parseBrushInputs();
				RenderUtil.makeBrushPreview();
			}

			// Synchronous for now
			new MeshData(project.mesh_datas[0], function(md: MeshData) {
				Context.paintObject.setData(md);
				Context.paintObject.transform.scale.set(1, 1, 1);
				Context.paintObject.transform.buildMatrix();
				Context.paintObject.name = md.name;
				Project.paintObjects = [Context.paintObject];
			});

			for (i in 1...project.mesh_datas.length) {
				var raw = project.mesh_datas[i];
				new MeshData(raw, function(md: MeshData) {
					var object = iron.Scene.active.addMeshObject(md, Context.paintObject.materials, Context.paintObject);
					object.name = md.name;
					object.skip_context = "paint";
					Project.paintObjects.push(object);
				});
			}

			if (project.mesh_assets != null && project.mesh_assets.length > 0) {
				var file = project.mesh_assets[0];
				var abs = Data.isAbsolute(file) ? file : base + file;
				Project.meshAssets = [abs];
			}

			// No mask by default
			if (Context.mergedObject == null) MeshUtil.mergeMesh();
			Context.selectPaintObject(Context.mainObject());
			ViewportUtil.scaleToBounds();
			Context.paintObject.skip_context = "paint";
			Context.mergedObject.visible = true;

			if (Project.layers[0].texpaint.width != Config.getTextureRes()) {
				for (l in Project.layers) l.resizeAndSetBits();
				if (History.undoLayers != null) for (l in History.undoLayers) l.resizeAndSetBits();
				var rts = RenderPath.active.renderTargets;
				rts.get("texpaint_blend0").image.unload();
				rts.get("texpaint_blend0").raw.width = Config.getTextureRes();
				rts.get("texpaint_blend0").raw.height = Config.getTextureRes();
				rts.get("texpaint_blend0").image = Image.createRenderTarget(Config.getTextureRes(), Config.getTextureRes(), TextureFormat.L8, DepthStencilFormat.NoDepthAndStencil);
				rts.get("texpaint_blend1").image.unload();
				rts.get("texpaint_blend1").raw.width = Config.getTextureRes();
				rts.get("texpaint_blend1").raw.height = Config.getTextureRes();
				rts.get("texpaint_blend1").image = Image.createRenderTarget(Config.getTextureRes(), Config.getTextureRes(), TextureFormat.L8, DepthStencilFormat.NoDepthAndStencil);
				Context.brushBlendDirty = true;
			}

			// for (l in Project.layers) l.unload();
			Project.layers = [];
			for (i in 0...project.layer_datas.length) {
				var ld = project.layer_datas[i];
				var isGroup = ld.texpaint == null;
				var l = new LayerSlot("", isGroup);
				Project.layers.push(l);

				if (!isGroup) {
					if (Layers.pipeMerge == null) Layers.makePipe();

					// TODO: create render target from bytes
					var texpaint = Image.fromBytes(Lz4.decode(ld.texpaint, ld.res * ld.res * 4 * bytesPerPixel), ld.res, ld.res, format);
					l.texpaint.g2.begin(false);
					l.texpaint.g2.pipeline = Layers.pipeCopy;
					l.texpaint.g2.drawImage(texpaint, 0, 0);
					l.texpaint.g2.pipeline = null;
					l.texpaint.g2.end();

					var texpaint_nor = Image.fromBytes(Lz4.decode(ld.texpaint_nor, ld.res * ld.res * 4 * bytesPerPixel), ld.res, ld.res, format);
					l.texpaint_nor.g2.begin(false);
					l.texpaint_nor.g2.pipeline = Layers.pipeCopy;
					l.texpaint_nor.g2.drawImage(texpaint_nor, 0, 0);
					l.texpaint_nor.g2.pipeline = null;
					l.texpaint_nor.g2.end();

					var texpaint_pack = Image.fromBytes(Lz4.decode(ld.texpaint_pack, ld.res * ld.res * 4 * bytesPerPixel), ld.res, ld.res, format);
					l.texpaint_pack.g2.begin(false);
					l.texpaint_pack.g2.pipeline = Layers.pipeCopy;
					l.texpaint_pack.g2.drawImage(texpaint_pack, 0, 0);
					l.texpaint_pack.g2.pipeline = null;
					l.texpaint_pack.g2.end();

					var texpaint_mask: kha.Image = null;
					if (ld.texpaint_mask != null) {
						l.createMask(0, false);
						texpaint_mask = Image.fromBytes(Lz4.decode(ld.texpaint_mask, ld.res * ld.res), ld.res, ld.res, TextureFormat.L8);
						l.texpaint_mask.g2.begin(false);
						l.texpaint_mask.g2.pipeline = Layers.pipeCopy8;
						l.texpaint_mask.g2.drawImage(texpaint_mask, 0, 0);
						l.texpaint_mask.g2.pipeline = null;
						l.texpaint_mask.g2.end();
					}

					l.scale = ld.uv_scale;
					l.angle = ld.uv_rot;
					l.uvType = ld.uv_type;
					l.maskOpacity = ld.opacity_mask;
					l.material_mask = ld.material_mask > -1 ? Project.materials[ld.material_mask] : null;
					l.objectMask = ld.object_mask;
					l.blending = ld.blending;
					l.visible = ld.visible;
					l.paintBase = ld.paint_base;
					l.paintOpac = ld.paint_opac;
					l.paintOcc = ld.paint_occ;
					l.paintRough = ld.paint_rough;
					l.paintMet = ld.paint_met;
					l.paintNor = ld.paint_nor;
					l.paintHeight = ld.paint_height;
					l.paintEmis = ld.paint_emis;
					l.paintSubs = ld.paint_subs;

					// texpaint.unload();
					// texpaint_nor.unload();
					// texpaint_pack.unload();
					// if (texpaint_mask != null) texpaint_mask.unload();
				}
			}

			// Create groups
			for (i in 0...project.layer_datas.length) {
				var ld = project.layer_datas[i];
				if (ld.parent >= 0) Project.layers[i].parent = Project.layers[ld.parent];
			}

			Context.setLayer(Project.layers[0]);

			Context.ddirty = 4;
			UISidebar.inst.hwnd.redraws = 2;
			UISidebar.inst.hwnd1.redraws = 2;
			UISidebar.inst.hwnd2.redraws = 2;

			Data.deleteBlob(path);
		});
	}

	public static function runMaterial(path: String) {
		Data.getBlob(path, function(b: Blob) {
			var project: TProjectFormat = ArmPack.decode(b.toBytes());
			if (project.version == null) { Data.deleteBlob(path); return; }
			runMaterialFromProject(project, path);
		});
	}

	public static function runMaterialFromProject(project: TProjectFormat, path: String) {
		var base = Path.baseDir(path);
		for (file in project.assets) {
			#if krom_windows
			file = file.replace("/", "\\");
			#else
			file = file.replace("\\", "/");
			#end
			// Convert image path from relative to absolute
			var abs = Data.isAbsolute(file) ? file : base + file;
			if (!File.exists(abs)) {
				makePink(abs);
			}
			arm.io.ImportTexture.run(abs);
		}

		var m0: MaterialData = null;
		Data.getMaterial("Scene", "Material", function(m: MaterialData) {
			m0 = m;
		});

		var imported: Array<MaterialSlot> = [];

		for (n in project.material_nodes) {
			initNodes(n.nodes);
			Context.material = new MaterialSlot(m0, n);
			Project.materials.push(Context.material);
			imported.push(Context.material);
		}

		function makeMaterialPreview(_) {
			for (m in imported) {
				Context.setMaterial(m);
				MaterialParser.parsePaintMaterial();
				RenderUtil.makeMaterialPreview();
			}
			iron.App.removeRender(makeMaterialPreview);
		}
		iron.App.notifyOnRender(makeMaterialPreview);

		UISidebar.inst.hwnd1.redraws = 2;
		Data.deleteBlob(path);
	}

	public static function runBrush(path: String) {
		Data.getBlob(path, function(b: Blob) {
			var project: TProjectFormat = ArmPack.decode(b.toBytes());
			if (project.version == null) { Data.deleteBlob(path); return; }
			runBrushFromProject(project, path);
		});
	}

	public static function runBrushFromProject(project: TProjectFormat, path: String) {
		var base = Path.baseDir(path);
		for (file in project.assets) {
			#if krom_windows
			file = file.replace("/", "\\");
			#else
			file = file.replace("\\", "/");
			#end
			// Convert image path from relative to absolute
			var abs = Data.isAbsolute(file) ? file : base + file;
			if (!File.exists(abs)) {
				makePink(abs);
			}
			arm.io.ImportTexture.run(abs);
		}

		var imported: Array<BrushSlot> = [];

		for (n in project.brush_nodes) {
			initNodes(n.nodes);
			Context.brush = new BrushSlot(n);
			Project.brushes.push(Context.brush);
			imported.push(Context.brush);
		}

		function makeBrushPreview(_) {
			for (b in imported) {
				Context.setBrush(b);
				RenderUtil.makeBrushPreview();
			}
			iron.App.removeRender(makeBrushPreview);
		}
		iron.App.notifyOnRender(makeBrushPreview);

		UISidebar.inst.hwnd1.redraws = 2;
		Data.deleteBlob(path);
	}

	static function makePink(abs: String) {
		Log.error(Strings.error2 + abs);
		var b = Bytes.alloc(4);
		b.set(0, 255);
		b.set(1, 0);
		b.set(2, 255);
		b.set(3, 255);
		var pink = Image.fromBytes(b, 1, 1);
		Data.cachedImages.set(abs, pink);
	}

	static function initNodes(nodes: Array<TNode>) {
		for (node in nodes) {
			if (node.type == "TEX_IMAGE") {
				node.buttons[0].default_value = App.getAssetIndex(node.buttons[0].data);
			}
			for (inp in node.inputs) { // Round input socket values
				if (inp.type == "VALUE") inp.default_value = Math.round(inp.default_value * 100) / 100;
			}
		}
	}
}
