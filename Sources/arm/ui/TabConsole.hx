package arm.ui;

import haxe.io.Bytes;
import zui.Zui;
import zui.Id;
import arm.sys.Path;
import arm.io.ImportAsset;

class TabConsole {

	@:access(zui.Zui)
	public static function draw() {
		var ui = UISidebar.inst.ui;

		var title = Log.messageTimer > 0 ? Log.message + "        " : tr("Console");
		var color = Log.messageTimer > 0 ? Log.messageColor : -1;

		if (ui.tab(UIStatus.inst.statustab, title, false, color) && UIStatus.inst.statush > UIStatus.defaultStatusH * ui.SCALE()) {

			ui.row([1 / 20, 1 / 20]);

			if (ui.button(tr("Clear"))) {
				Log.lastTraces = [];
			}
			if (ui.button(tr("Export"))) {
				var str = Log.lastTraces.join("\n");
				UIFiles.show("txt", true, function(path: String) {
					var f = UIFiles.filename;
					if (f == "") f = tr("untitled");
					path = path + Path.sep + f;
					if (!path.endsWith(".txt")) path += ".txt";
					Krom.fileSaveBytes(path, Bytes.ofString(str).getData());
				});
			}

			for (t in Log.lastTraces) {
				ui.text(t);
			}
		}
	}
}
