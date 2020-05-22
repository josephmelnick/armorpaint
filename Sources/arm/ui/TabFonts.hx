package arm.ui;

import zui.Zui;
import zui.Id;
import iron.system.Time;
import arm.io.ImportFont;

class TabFonts {

	@:access(zui.Zui)
	public static function draw() {
		var ui = UISidebar.inst.ui;
		if (ui.tab(UISidebar.inst.htab2, tr("Fonts"))) {
			ui.row([1 / 4, 1 / 4]);

			if (ui.button(tr("Import"))) Project.importAsset("ttf");
			if (ui.isHovered) ui.tooltip(tr("Import font file") + ' (${Config.keymap.file_import_assets})');

			if (ui.button(tr("2D View"))) {
				UISidebar.inst.show2DView(View2DFont);
			}

			var slotw = Std.int(51 * ui.SCALE());
			var num = Std.int(UISidebar.inst.windowW / slotw);

			for (row in 0...Std.int(Math.ceil(Project.fonts.length / num))) {
				ui.row([for (i in 0...num) 1 / num]);

				ui._x += 2;
				if (row > 0) ui._y += 6;

				for (j in 0...num) {
					var imgw = Std.int(50 * ui.SCALE());
					var i = j + row * num;
					if (i >= Project.fonts.length) {
						@:privateAccess ui.endElement(imgw);
						continue;
					}
					var img = Project.fonts[i].image;

					if (Context.font == Project.fonts[i]) {
						// ui.fill(1, -2, img.width + 3, img.height + 3, ui.t.HIGHLIGHT_COL); // TODO
						var off = row % 2 == 1 ? 1 : 0;
						var w = 50;
						if (Config.raw.window_scale > 1) w += Std.int(Config.raw.window_scale * 2);
						ui.fill(-1,         -2, w + 3,       2, ui.t.HIGHLIGHT_COL);
						ui.fill(-1,    w - off, w + 3, 2 + off, ui.t.HIGHLIGHT_COL);
						ui.fill(-1,         -2,     2,   w + 3, ui.t.HIGHLIGHT_COL);
						ui.fill(w + 1,      -2,     2,   w + 4, ui.t.HIGHLIGHT_COL);
					}

					var tile = ui.SCALE() > 1 ? 100 : 50;
					var state = State.Idle;
					if (Project.fonts[i].previewReady) {
						// ui.g.pipeline = UIView2D.inst.pipe; // L8
						// #if kha_opengl
						// ui.currentWindow.texture.g4.setPipeline(UIView2D.inst.pipe);
						// #end
						// ui.currentWindow.texture.g4.setInt(UIView2D.inst.channelLocation, 1);
						state = ui.image(img);
						// ui.g.pipeline = null;
					}
					else {
						state = ui.image(Res.get("icons.k"), -1, null, tile * 6, tile, tile, tile);
					}

					if (state == State.Started) {
						if (Context.font != Project.fonts[i]) Context.selectFont(i);
						if (Time.time() - Context.selectTime < 0.25) UISidebar.inst.show2DView(View2DFont);
						Context.selectTime = Time.time();
					}
					if (ui.isHovered && ui.inputReleasedR) {
						var add = Project.fonts.length > 1 ? 1 : 0;
						UIMenu.draw(function(ui: Zui) {
							ui.text(Project.fonts[i].name, Right, ui.t.HIGHLIGHT_COL);

							if (Project.fonts.length > 1 && ui.button(tr("Delete"), Left)) {
								Context.selectFont(i == 0 ? 1 : 0);
								Project.fonts.splice(i, 1);
								UISidebar.inst.hwnd2.redraws = 2;
							}
						}, 1 + add);
					}
					if (ui.isHovered && img != null) ui.tooltipImage(img);
				}

				ui._y += 6;
			}
		}
	}
}
