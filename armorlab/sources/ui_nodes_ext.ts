
let ui_nodes_ext_last_vertices: buffer_t = null; // Before displacement

function ui_nodes_ext_draw_buttons(ew: f32, start_y: f32) {
	let ui = ui_nodes_ui;
	if (zui_button(tr("Run"))) {

		let delay_idle_sleep = function () {
			krom_delay_idle_sleep();
		}
		app_notify_on_render_2d(delay_idle_sleep);

		console_progress(tr("Processing"));
		krom_g4_swap_buffers();

		let timer = time_time();
		parser_logic_parse(project_canvas);

		photo_to_pbr_node_cached_source = null;
		let texbase: image_t = logic_node_get_as_image(brush_output_node_inst.base, channel_type_t.BASE_COLOR);
		let texocc: image_t = logic_node_get_as_image(brush_output_node_inst.base, channel_type_t.OCCLUSION);
		let texrough: image_t = logic_node_get_as_image(brush_output_node_inst.base, channel_type_t.ROUGHNESS);
		let texnor: image_t = logic_node_get_as_image(brush_output_node_inst.base, channel_type_t.NORMAL_MAP);
		let texheight: image_t = logic_node_get_as_image(brush_output_node_inst.base, channel_type_t.HEIGHT);

		if (texbase != null) {
			let texpaint = map_get(render_path_render_targets, "texpaint")._image;
			g2_begin(texpaint);
			g2_draw_scaled_image(texbase, 0, 0, config_get_texture_res_x(), config_get_texture_res_y());
			g2_end();
		}

		if (texnor != null) {
			let texpaint_nor = map_get(render_path_render_targets, "texpaint_nor")._image;
			g2_begin(texpaint_nor);
			g2_draw_scaled_image(texnor, 0, 0, config_get_texture_res_x(), config_get_texture_res_y());
			g2_end();
		}

		if (base_pipe_copy == null) {
			base_make_pipe();
		}
		if (base_pipe_copy_a == null) {
			base_make_pipe_copy_a();
		}
		if (const_data_screen_aligned_vb == null) {
			const_data_create_screen_aligned_data();
		}

		let texpaint_pack = map_get(render_path_render_targets, "texpaint_pack")._image;

		if (texocc != null) {
			g2_begin(texpaint_pack);
			g2_set_pipeline(base_pipe_copy_r);
			g2_draw_scaled_image(texocc, 0, 0, config_get_texture_res_x(), config_get_texture_res_y());
			g2_set_pipeline(null);
			g2_end();
		}

		if (texrough != null) {
			g2_begin(texpaint_pack);
			g2_set_pipeline(base_pipe_copy_g);
			g2_draw_scaled_image(texrough, 0, 0, config_get_texture_res_x(), config_get_texture_res_y());
			g2_set_pipeline(null);
			g2_end();
		}

		if (texheight != null) {
			g4_begin(texpaint_pack);
			g4_set_pipeline(base_pipe_copy_a);
			g4_set_tex(base_pipe_copy_a_tex, texheight);
			g4_set_vertex_buffer(const_data_screen_aligned_vb);
			g4_set_index_buffer(const_data_screen_aligned_ib);
			g4_draw();
			g4_end();

			if (ui_header_worktab.position == space_type_t.SPACE3D &&
				brush_output_node_inst.base.inputs[channel_type_t.HEIGHT].node.get != float_node_get) {

				// Make copy of vertices before displacement
				let o = project_paint_objects[0];
				let g = o.data;
				let vertices = g4_vertex_buffer_lock(g._.vertex_buffer);
				if (ui_nodes_ext_last_vertices == null || ui_nodes_ext_last_vertices.length != vertices.length) {
					ui_nodes_ext_last_vertices = buffer_create(vertices.length);
					for (let i: i32 = 0; i < math_floor((vertices.length) / 2); ++i) {
						buffer_set_i16(ui_nodes_ext_last_vertices, i * 2, buffer_get_i16(vertices, i * 2));
					}
				}
				else {
					for (let i: i32 = 0; i < math_floor((vertices.length) / 2); ++i) {
						buffer_set_i16(vertices, i * 2, buffer_get_i16(ui_nodes_ext_last_vertices, i * 2));
					}
				}
				g4_vertex_buffer_unlock(g._.vertex_buffer);

				// Apply displacement
				if (config_raw.displace_strength > 0) {
					console_progress(tr("Apply Displacement"));
					krom_g4_swap_buffers();

					let uv_scale = scene_meshes[0].data.scale_tex * context_raw.brush_scale;
					util_mesh_apply_displacement(texpaint_pack, 0.05 * config_raw.displace_strength, uv_scale);
					util_mesh_calc_normals();
				}
			}
		}

		console_log("Processing finished in " + (time_time() - timer));
		krom_ml_unload();

		console_progress(null);
		context_raw.ddirty = 2;
		app_remove_render_2d(delay_idle_sleep);

		///if (krom_direct3d12 || krom_vulkan || krom_metal)
		render_path_raytrace_ready = false;
		///end
	}
	ui._x += ew + 3;
	ui._y = 2 + start_y;

	///if (krom_android || krom_ios)
	let base_res_combo: string[] = ["2K", "4K"];
	zui_combo(base_res_handle, base_res_combo, tr("Resolution"));
	///else
	let base_res_combo: string[] = ["2K", "4K", "8K", "16K"];
	zui_combo(base_res_handle, base_res_combo, tr("Resolution"));
	///end
	if (base_res_handle.changed) {
		base_on_layers_resized();
	}
	ui._x += ew + 3;
	ui._y = 2 + start_y;
}
