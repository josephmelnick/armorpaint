package arm.io;

import haxe.io.Bytes;
import haxe.io.BytesOutput;
import kha.Image;
import iron.Scene;
import arm.format.ExrWriter;
import arm.format.JpgWriter;
import arm.format.PngWriter;
import arm.format.PngTools;
import arm.render.RenderPathPaint;
import arm.node.MaterialParser;
import arm.ui.UIHeader;
import arm.ui.UISidebar;
import arm.ui.UIFiles;
import arm.ui.BoxExport;
import arm.sys.Path;
import arm.Enums;

class ExportTexture {

	public static function run(path: String, bakeMaterial = false) {
		#if arm_debug
		var timer = iron.system.Time.realTime();
		#end

		var udimTiles: Array<String> = [];
		for (l in Project.layers) {
			if (l.objectMask > 0) {
				var name = Project.paintObjects[l.objectMask - 1].name;
				if (name.substr(name.length - 5, 2) == ".1") { // tile.1001
					udimTiles.push(name.substr(name.length - 5));
				}
			}
		}

		if (bakeMaterial) {
			runBakeMaterial(path);
		}
		else if (udimTiles.length > 0 && Context.layersExport == 0) {
			for (udimTile in udimTiles) runLayers(path, udimTile);
		}
		else {
			runLayers(path);
		}

		#if arm_debug
		trace("Textures exported in " + (iron.system.Time.realTime() - timer));
		#end

		Log.info("Textures exported.");
	}

	static function runBakeMaterial(path: String) {
		if (RenderPathPaint.liveLayer == null) {
			RenderPathPaint.liveLayer = new arm.data.LayerSlot("_live");
			RenderPathPaint.liveLayer.createMask(0x00000000);
		}

		var _space = UIHeader.inst.worktab.position;
		var _tool = Context.tool;
		UIHeader.inst.worktab.position = SpacePaint;
		Context.tool = ToolFill;
		MaterialParser.parsePaintMaterial();
		var _paintObject = Context.paintObject;
		var planeo: iron.object.MeshObject = cast Scene.active.getChild(".Plane");
		planeo.visible = true;
		Context.paintObject = planeo;
		Context.pdirty = 1;
		RenderPathPaint.useLiveLayer(true);
		RenderPathPaint.commandsPaint();
		RenderPathPaint.useLiveLayer(false);
		Context.tool = _tool;
		MaterialParser.parsePaintMaterial();
		Context.pdirty = 0;
		UIHeader.inst.worktab.position = _space;
		planeo.visible = false;
		Context.paintObject = _paintObject;

		runLayers(path, "", true);
	}

	static function runLayers(path: String, udimTile = "", bakeMaterial = false) {
		var textureSize = Config.getTextureRes();
		var formatQuality = Context.formatQuality;
		var f = UIFiles.filename;
		if (f == "") f = tr("untitled");
		var formatType = Context.formatType;
		var bits = App.bitsHandle.position == Bits8 ? 8 : 16;
		var ext = bits == 16 ? ".exr" : formatType == FormatPng ? ".png" : ".jpg";
		if (f.endsWith(ext)) f = f.substr(0, f.length - 4);
		ext = udimTile + ext;

		Layers.makeTempImg();
		Layers.makeExportImg();
		if (Layers.pipeMerge == null) Layers.makePipe();
		if (iron.data.ConstData.screenAlignedVB == null) iron.data.ConstData.createScreenAlignedData();
		var empty = iron.RenderPath.active.renderTargets.get("empty_white").image;

		// Append object mask name
		var exportAll = Context.layersExport == 0;
		if (!exportAll && Context.layer.objectMask > 0) {
			f += "_" + Project.paintObjects[Context.layer.objectMask].name;
		}

		// Clear export layer
		Layers.expa.g4.begin();
		Layers.expa.g4.clear(kha.Color.fromFloats(0.0, 0.0, 0.0, 0.0));
		Layers.expa.g4.end();
		Layers.expb.g4.begin();
		Layers.expb.g4.clear(kha.Color.fromFloats(0.5, 0.5, 1.0, 0.0));
		Layers.expb.g4.end();
		Layers.expc.g4.begin();
		Layers.expc.g4.clear(kha.Color.fromFloats(1.0, 0.0, 0.0, 0.0));
		Layers.expc.g4.end();

		// Export all visible layers or selected only
		var layers = bakeMaterial ? [RenderPathPaint.liveLayer] :
					 exportAll ? Project.layers : [Context.layer];

		// Flatten layers
		for (l1 in layers) {
			if (exportAll && !l1.isVisible()) continue;

			if (udimTile != "" && l1.objectMask > 0) {
				if (!Project.paintObjects[l1.objectMask - 1].name.endsWith(udimTile)) continue;
			}

			var hasMask = l1.texpaint_mask != null && !bakeMaterial;

			if (l1.paintBase) {
				Layers.imga.g2.begin(false); // Copy to temp
				Layers.imga.g2.pipeline = Layers.pipeCopy;
				Layers.imga.g2.drawImage(Layers.expa, 0, 0);
				Layers.imga.g2.pipeline = null;
				Layers.imga.g2.end();

				Layers.expa.g4.begin();
				Layers.expa.g4.setPipeline(Layers.pipeMerge);
				Layers.expa.g4.setTexture(Layers.tex0, l1.texpaint);
				Layers.expa.g4.setTexture(Layers.tex1, empty);
				Layers.expa.g4.setTexture(Layers.texmask, hasMask ? l1.texpaint_mask : empty);
				Layers.expa.g4.setTexture(Layers.texa, Layers.imga);
				Layers.expa.g4.setFloat(Layers.opac, l1.maskOpacity);
				Layers.expa.g4.setInt(Layers.blending, l1.blending);
				Layers.expa.g4.setVertexBuffer(iron.data.ConstData.screenAlignedVB);
				Layers.expa.g4.setIndexBuffer(iron.data.ConstData.screenAlignedIB);
				Layers.expa.g4.drawIndexedVertices();
				Layers.expa.g4.end();
			}

			if (l1.paintNor) {
				Layers.imga.g2.begin(false);
				Layers.imga.g2.pipeline = Layers.pipeCopy;
				Layers.imga.g2.drawImage(Layers.expb, 0, 0);
				Layers.imga.g2.pipeline = null;
				Layers.imga.g2.end();

				Layers.expb.g4.begin();
				Layers.expb.g4.setPipeline(Layers.pipeMerge);
				Layers.expb.g4.setTexture(Layers.tex0, l1.texpaint);
				Layers.expb.g4.setTexture(Layers.tex1, l1.texpaint_nor);
				Layers.expb.g4.setTexture(Layers.texmask, hasMask ? l1.texpaint_mask : empty);
				Layers.expb.g4.setTexture(Layers.texa, Layers.imga);
				Layers.expb.g4.setFloat(Layers.opac, l1.maskOpacity);
				Layers.expb.g4.setInt(Layers.blending, -1);
				Layers.expb.g4.setVertexBuffer(iron.data.ConstData.screenAlignedVB);
				Layers.expb.g4.setIndexBuffer(iron.data.ConstData.screenAlignedIB);
				Layers.expb.g4.drawIndexedVertices();
				Layers.expb.g4.end();
			}

			if (l1.paintOcc || l1.paintRough || l1.paintMet || l1.paintHeight) {
				Layers.imga.g2.begin(false);
				Layers.imga.g2.pipeline = Layers.pipeCopy;
				Layers.imga.g2.drawImage(Layers.expc, 0, 0);
				Layers.imga.g2.pipeline = null;
				Layers.imga.g2.end();

				if (l1.paintOcc && l1.paintRough && l1.paintMet && l1.paintHeight) {
					Layers.commandsMergePack(Layers.pipeMerge, Layers.expc, l1.texpaint, l1.texpaint_pack, l1.maskOpacity, hasMask ? l1.texpaint_mask : empty);
				}
				else {
					if (l1.paintOcc) Layers.commandsMergePack(Layers.pipeMergeR, Layers.expc, l1.texpaint, l1.texpaint_pack, l1.maskOpacity, hasMask ? l1.texpaint_mask : empty);
					if (l1.paintRough) Layers.commandsMergePack(Layers.pipeMergeG, Layers.expc, l1.texpaint, l1.texpaint_pack, l1.maskOpacity, hasMask ? l1.texpaint_mask : empty);
					if (l1.paintMet) Layers.commandsMergePack(Layers.pipeMergeB, Layers.expc, l1.texpaint, l1.texpaint_pack, l1.maskOpacity, hasMask ? l1.texpaint_mask : empty);
				}
			}
		}

		var texpaint = Layers.expa;
		var texpaint_nor = Layers.expb;
		var texpaint_pack = Layers.expc;
		var pixpaint: Bytes = null;
		var pixpaint_nor: Bytes = null;
		var pixpaint_pack: Bytes = null;
		var preset = BoxExport.preset;
		var pix: Bytes = null;

		for (t in preset.textures) {
			for (c in t.channels) {
				if      ((c == "base_r" || c == "base_g" || c == "base_b" || c == "opac") && pixpaint == null) pixpaint = texpaint.getPixels();
				else if ((c == "nor_r" || c == "nor_g" || c == "nor_b" || c == "emis" || c == "subs") && pixpaint_nor == null) pixpaint_nor = texpaint_nor.getPixels();
				else if ((c == "occ" || c == "rough" || c == "metal" || c == "height" || c == "smooth") && pixpaint_pack == null) pixpaint_pack = texpaint_pack.getPixels();
			}
		}

		for (t in preset.textures) {
			var c = t.channels;
			var tex_name = t.name != "" ? "_" + t.name : "";
			var singleChannel = c[0] == c[1] && c[1] == c[2] && c[3] == "1.0";
			if (c[0] == "base_r" && c[1] == "base_g" && c[2] == "base_b" && c[3] == "1.0") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint, 1);
			}
			else if (c[0] == "nor_r" && c[1] == "nor_g" && c[2] == "nor_b" && c[3] == "1.0") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint_nor, 1);
			}
			else if (c[0] == "occ" && c[1] == "rough" && c[2] == "metal" && c[3] == "1.0") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint_pack, 1);
			}
			else if (singleChannel && c[0] == "occ") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint_pack, 2, 0);
			}
			else if (singleChannel && c[0] == "rough") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint_pack, 2, 1);
			}
			else if (singleChannel && c[0] == "metal") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint_pack, 2, 2);
			}
			else if (singleChannel && c[0] == "height") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint_pack, 2, 3);
			}
			else if (singleChannel && c[0] == "opac") {
				writeTexture(path + Path.sep + f + tex_name + ext, pixpaint, 2, 3);
			}
			else {
				if (pix == null) pix = Bytes.alloc(textureSize * textureSize * 4 * Std.int(bits / 8));
				for (i in 0...4) {
					var c = t.channels[i];
					if      (c == "base_r") copyChannel(pixpaint, 0, pix, i); // copyChannelGamma
					else if (c == "base_g") copyChannel(pixpaint, 1, pix, i); // copyChannelGamma
					else if (c == "base_b") copyChannel(pixpaint, 2, pix, i); // copyChannelGamma
					else if (c == "height") copyChannel(pixpaint_pack, 3, pix, i);
					else if (c == "metal") copyChannel(pixpaint_pack, 2, pix, i);
					else if (c == "nor_r") copyChannel(pixpaint_nor, 0, pix, i);
					else if (c == "nor_g") copyChannel(pixpaint_nor, 1, pix, i);
					else if (c == "nor_b") copyChannel(pixpaint_nor, 2, pix, i);
					else if (c == "occ") copyChannel(pixpaint_pack, 0, pix, i);
					else if (c == "opac") copyChannel(pixpaint, 3, pix, i);
					else if (c == "rough") copyChannel(pixpaint_pack, 1, pix, i);
					else if (c == "smooth") copyChannelInv(pixpaint_pack, 1, pix, i);
					else if (c == "emis") extractChannel(pixpaint_nor, 3, pix, i, 255);
					else if (c == "subs") extractChannel(pixpaint_nor, 3, pix, i, 254);
					else if (c == "0.0") setChannel(0, pix, i);
					else if (c == "1.0") setChannel(255, pix, i);
				}
				writeTexture(path + Path.sep + f + tex_name + ext, pix, 3);
			}
		}
	}

	static function writeTexture(file: String, pixels: Bytes, type = 1, off = 0) {
		var out = new BytesOutput();
		var res = Config.getTextureRes();
		var bitsHandle = App.bitsHandle.position;
		var bits = bitsHandle == Bits8 ? 8 : bitsHandle == Bits16 ? 16 : 32;
		if (bits > 8) { // 16/32bit
			var writer = new ExrWriter(out, res, res, pixels, bits, type, off);
		}
		else if (Context.formatType == FormatPng) {
			var writer = new PngWriter(out);
			var data =
				type == 1 ?
					#if kha_metal
					PngTools.build32BGR1(res, res, pixels) :
					#else
					PngTools.build32RGB1(res, res, pixels) :
					#end
				type == 2 ?
					#if kha_metal
					PngTools.build32RRR1(res, res, pixels, 2 - off) :
					#else
					PngTools.build32RRR1(res, res, pixels, off) :
					#end

					#if kha_metal
					PngTools.build32BGRA(res, res, pixels);
					#else
					PngTools.build32RGBA(res, res, pixels);
					#end
			writer.write(data);
		}
		else {
			var writer = new JpgWriter(out);
			writer.write(
				{
					width: res,
					height: res,
					quality: Context.formatQuality,
					pixels: pixels
				},
				type,
				#if kha_metal
				2 - off, true
				#else
				off, false
				#end
			);
		}
		Krom.fileSaveBytes(file, out.getBytes().getData());
	}

	static function copyChannel(from: Bytes, fromChannel: Int, to: Bytes, toChannel: Int) {
		for (i in 0...Std.int(to.length / 4)) {
			to.set(i * 4 + toChannel, from.get(i * 4 + fromChannel));
		}
	}

	static inline var gamma = 1.0 / 2.2;
	static function copyChannelGamma(from: Bytes, fromChannel: Int, to: Bytes, toChannel: Int) {
		for (i in 0...Std.int(to.length / 4)) {
			to.set(i * 4 + toChannel, Std.int(Math.pow(from.get(i * 4 + fromChannel) / 255, gamma) * 255));
		}
	}

	static function copyChannelInv(from: Bytes, fromChannel: Int, to: Bytes, toChannel: Int) {
		for (i in 0...Std.int(to.length / 4)) {
			to.set(i * 4 + toChannel, 255 - from.get(i * 4 + fromChannel));
		}
	}

	static function setChannel(value: Int, to: Bytes, toChannel: Int) {
		for (i in 0...Std.int(to.length / 4)) {
			to.set(i * 4 + toChannel, value);
		}
	}

	static function extractChannel(from: Bytes, fromChannel: Int, to: Bytes, toChannel: Int, mask: Int) {
		for (i in 0...Std.int(to.length / 4)) {
			to.set(i * 4 + toChannel, from.get(i * 4 + fromChannel) == mask ? 255 : 0);
		}
	}
}

typedef TExportPreset = {
	public var textures: Array<TExportPresetTexture>;
}

typedef TExportPresetTexture = {
	public var name: String;
	public var channels: Array<String>;
}
