package arm.node.brush;

import arm.ui.UISidebar;
import arm.ui.UIView2D;
import arm.Enums;

@:keep
class BrushOutputNode extends LogicNode {

	public var Directional = false; // button 0

	public function new(tree: LogicTree) {
		super(tree);
		Context.runBrush = run;
		Context.parseBrushInputs = parseInputs;
	}

	function parseInputs() {
		var lastMask = Context.brushMaskImage;
		var lastStencil = Context.brushStencilImage;

		Context.paintVec = inputs[0].get();
		Context.brushNodesRadius = inputs[1].get();
		Context.brushNodesScale = inputs[2].get();
		Context.brushNodesAngle = inputs[3].get();

		var opac: Dynamic = inputs[4].get(); // Float or texture name
		if (opac == null) opac = 1.0;
		if (Std.is(opac, String)) {
			Context.brushNodesOpacity = 1.0;
			var index = Project.assetNames.indexOf(opac);
			var asset = Project.assets[index];
			Context.brushMaskImage = UISidebar.inst.getImage(asset);
		}
		else {
			Context.brushNodesOpacity = opac;
			Context.brushMaskImage = null;
		}

		Context.brushNodesHardness = inputs[5].get();

		var stencil: Dynamic = inputs[6].get(); // Float or texture name
		if (stencil == null) stencil = 1.0;
		if (Std.is(stencil, String)) {
			var index = Project.assetNames.indexOf(stencil);
			var asset = Project.assets[index];
			Context.brushStencilImage = UISidebar.inst.getImage(asset);
		}
		else {
			Context.brushStencilImage = null;
		}

		if (lastMask != Context.brushMaskImage ||
			lastStencil != Context.brushStencilImage) {
			MaterialParser.parsePaintMaterial();
		}

		Context.brushDirectional = Directional;
	}

	override function run(from: Int) {

		var left = 0;
		var right = 1;
		if (Context.paint2d) {
			left = 1;
			right = 2;
		}

		// First time init
		if (Context.lastPaintX < 0 || Context.lastPaintY < 0) {
			Context.lastPaintVecX = Context.paintVec.x;
			Context.lastPaintVecY = Context.paintVec.y;
		}

		// Do not paint over fill layer
		var fillLayer = Context.layer.material_mask != null && Context.tool != ToolPicker && !Context.layerIsMask;

		// Do not paint over groups
		var groupLayer = Context.layer.getChildren() != null;

		// Paint bounds
		if (Context.paintVec.x < right && Context.paintVec.x > left &&
			Context.paintVec.y < 1 && Context.paintVec.y > 0 &&
			!UISidebar.inst.ui.isHovered &&
			!UISidebar.inst.ui.isScrolling &&
			!fillLayer &&
			!groupLayer &&
			(Context.layer.isVisible() || Context.paint2d) &&
			!arm.App.isDragging &&
			!arm.App.isResizing &&
			@:privateAccess UISidebar.inst.ui.comboSelectedHandle == null &&
			@:privateAccess UIView2D.inst.ui.comboSelectedHandle == null) { // Header combos are in use

			// Set color pick
			var down = iron.system.Input.getMouse().down() || iron.system.Input.getPen().down();
			if (down && Context.tool == ToolColorId && Project.assets.length > 0) {
				Context.colorIdPicked = true;
			}
			// Prevent painting the same spot
			var sameSpot = Context.paintVec.x == Context.lastPaintX && Context.paintVec.y == Context.lastPaintY;
			var lazy = Context.tool == ToolBrush && Context.brushLazyRadius > 0;
			if (down && (sameSpot || lazy)) {
				Context.painted++;
			}
			else {
				Context.painted = 0;
			}
			Context.lastPaintX = Context.paintVec.x;
			Context.lastPaintY = Context.paintVec.y;

			if (Context.tool == ToolParticle) {
				Context.painted = 0; // Always paint particles
			}

			if (Context.painted == 0) {
				parseInputs();
			}

			var decal = Context.tool == ToolDecal || Context.tool == ToolText;
			var paintFrames = decal ? 1 : 4;

			if (Context.painted <= paintFrames) {
				Context.pdirty = 1;
				Context.rdirty = 2;
			}
		}
	}
}
