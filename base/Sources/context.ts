
type context_t = {
	texture?: asset_t;
	paint_object?: mesh_object_t;
	merged_object?: mesh_object_t;
	merged_object_is_atlas?: bool;

	ddirty?: i32;
	pdirty?: i32;
	rdirty?: i32;
	brush_blend_dirty?: bool;
	node_preview_socket?: i32;

	split_view?: bool;
	view_index?: i32;
	view_index_last?: i32;

	swatch?: swatch_color_t;
	picked_color?: swatch_color_t;
	color_picker_callback?: (sc: swatch_color_t)=>void;

	default_irradiance?: f32_array_t;
	default_radiance?: image_t;
	default_radiance_mipmaps?: image_t[];
	saved_envmap?: image_t;
	empty_envmap?: image_t;
	preview_envmap?: image_t;
	envmap_loaded?: bool;
	show_envmap?: bool;
	show_envmap_handle?: zui_handle_t;
	show_envmap_blur?: bool;
	show_envmap_blur_handle?: zui_handle_t;
	envmap_angle?: f32;
	light_angle?: f32;
	cull_backfaces?: bool;
	texture_filter?: bool;

	format_type?: texture_ldr_format_t;
	format_quality?: f32;
	layers_destination?: export_destination_t;
	split_by?: split_type_t;
	parse_transform?: bool;
	parse_vcols?: bool;

	select_time?: f32;
	///if (krom_direct3d12 || krom_vulkan || krom_metal)
	pathtrace_mode?: path_trace_mode_t;
	///end
	///if (krom_direct3d12 || krom_vulkan) // || krom_metal)
	viewport_mode?: viewport_mode_t;
	///else
	viewport_mode?: viewport_mode_t;
	///end
	///if (krom_android || krom_ios)
	render_mode?: render_mode_t;
	///else
	render_mode?: render_mode_t;
	///end

	viewport_shader?: (ns: node_shader_t)=>string;
	hscale_was_changed?: bool;
	export_mesh_format?: mesh_format_t;
	export_mesh_index?: i32;
	pack_assets_on_export?: bool;

	paint_vec?: vec4_t;
	last_paint_x?: f32;
	last_paint_y?: f32;
	foreground_event?: bool;
	painted?: i32;
	brush_time?: f32;
	clone_start_x?: f32;
	clone_start_y?: f32;
	clone_delta_x?: f32;
	clone_delta_y?: f32;

	show_compass?: bool;
	project_type?: project_model_t;
	project_aspect_ratio?: i32;
	project_objects?: mesh_object_t[];

	last_paint_vec_x?: f32;
	last_paint_vec_y?: f32;
	prev_paint_vec_x?: f32;
	prev_paint_vec_y?: f32;
	frame?: i32;
	paint2d_view?: bool;

	lock_started_x?: f32;
	lock_started_y?: f32;
	brush_locked?: bool;
	brush_can_lock?: bool;
	brush_can_unlock?: bool;
	camera_type?: camera_type_t;
	cam_handle?: zui_handle_t;
	fov_handle?: zui_handle_t;
	undo_handle?: zui_handle_t;
	hssao?: zui_handle_t;
	hssr?: zui_handle_t;
	hbloom?: zui_handle_t;
	hsupersample?: zui_handle_t;
	hvxao?: zui_handle_t;
	///if is_forge
	vxao_ext?: f32;
	///else
	vxao_ext?: f32;
	///end
	vxao_offset?: f32;
	vxao_aperture?: f32;
	texture_export_path?: string;
	last_status_position?: i32;
	camera_controls?: camera_controls_t;
	pen_painting_only?: bool;

	///if (is_paint || is_sculpt)
	material?: slot_material_t;
	layer?: slot_layer_t;
	brush?: slot_brush_t;
	font?: slot_font_t;
	tool?: workspace_tool_t;

	layer_preview_dirty?: bool;
	layers_preview_dirty?: bool;
	node_preview_dirty?: bool;
	node_preview?: image_t;
	node_previews?: map_t<string, image_t>;
	node_previews_used?: string[];
	node_preview_name?: string;
	mask_preview_rgba32?: image_t;
	mask_preview_last?: slot_layer_t;

	colorid_picked?: bool;
	material_preview?: bool;
	saved_camera?: mat4_t;

	color_picker_previous_tool?: workspace_tool_t;
	materialid_picked?: i32;
	uvx_picked?: f32;
	uvy_picked?: f32;
	picker_select_material?: bool;
	picker_mask_handle?: zui_handle_t;
	pick_pos_nor_tex?: bool;
	posx_picked?: f32;
	posy_picked?: f32;
	posz_picked?: f32;
	norx_picked?: f32;
	nory_picked?: f32;
	norz_picked?: f32;

	draw_wireframe?: bool;
	wireframe_handle?: zui_handle_t;
	draw_texels?: bool;
	texels_handle?: zui_handle_t;

	colorid_handle?: zui_handle_t;
	layers_export?: export_mode_t;

	decal_image?: image_t;
	decal_preview?: bool;
	decal_x?: f32;
	decal_y?: f32;

	cache_draws?: bool;
	write_icon_on_export?: bool;

	text_tool_image?: image_t;
	text_tool_text?: string;
	particle_material?: material_data_t;
	///if arm_physics
	particle_physics?: bool;
	particle_hit_x?: f32;
	particle_hit_y?: f32;
	particle_hit_z?: f32;
	last_particle_hit_x?: f32;
	last_particle_hit_y?: f32;
	last_particle_hit_z?: f32;
	particle_timer?: tween_anim_t;
	paint_body?: physics_body_t;
	///end

	layer_filter?: i32;
	brush_output_node_inst?: brush_output_node_t;
	run_brush?: (self: any, i: i32)=>void;
	parse_brush_inputs?: (self: any)=>void;

	gizmo?: object_t;
	gizmo_translate_x?: object_t;
	gizmo_translate_y?: object_t;
	gizmo_translate_z?: object_t;
	gizmo_scale_x?: object_t;
	gizmo_scale_y?: object_t;
	gizmo_scale_z?: object_t;
	gizmo_rotate_x?: object_t;
	gizmo_rotate_y?: object_t;
	gizmo_rotate_z?: object_t;
	gizmo_started?: bool;
	gizmo_offset?: f32;
	gizmo_drag?: f32;
	gizmo_drag_last?: f32;
	translate_x?: bool;
	translate_y?: bool;
	translate_z?: bool;
	scale_x?: bool;
	scale_y?: bool;
	scale_z?: bool;
	rotate_x?: bool;
	rotate_y?: bool;
	rotate_z?: bool;

	brush_nodes_radius?: f32;
	brush_nodes_opacity?: f32;
	brush_mask_image?: image_t;
	brush_mask_image_is_alpha?: bool;
	brush_stencil_image?: image_t;
	brush_stencil_image_is_alpha?: bool;
	brush_stencil_x?: f32;
	brush_stencil_y?: f32;
	brush_stencil_scale?: f32;
	brush_stencil_scaling?: bool;
	brush_stencil_angle?: f32;
	brush_stencil_rotating?: bool;
	brush_nodes_scale?: f32;
	brush_nodes_angle?: f32;
	brush_nodes_hardness?: f32;
	brush_directional?: bool;

	brush_radius?: f32;
	brush_radius_handle?: zui_handle_t;
	brush_scale_x?: f32;
	brush_decal_mask_radius?: f32;
	brush_decal_mask_radius_handle?: zui_handle_t;
	brush_scale_x_handle?: zui_handle_t;
	brush_blending?: blend_type_t;
	brush_opacity?: f32;
	brush_opacity_handle?: zui_handle_t;
	brush_scale?: f32;
	brush_angle?: f32;
	brush_angle_handle?: zui_handle_t;
	///if is_paint
	brush_hardness?: f32;
	///end
	///if is_sculpt
	brush_hardness?: f32;
	///end
	brush_lazy_radius?: f32;
	brush_lazy_step?: f32;
	brush_lazy_x?: f32;
	brush_lazy_y?: f32;
	brush_paint?: uv_type_t;
	brush_angle_reject_dot?: f32;
	bake_type?: bake_type_t;
	bake_axis?: bake_axis_t;
	bake_up_axis?: bake_up_axis_t;
	bake_samples?: i32;
	bake_ao_strength?: f32;
	bake_ao_radius?: f32;
	bake_ao_offset?: f32;
	bake_curv_strength?: f32;
	bake_curv_radius?: f32;
	bake_curv_offset?: f32;
	bake_curv_smooth?: i32;
	bake_high_poly?: i32;

	xray?: bool;
	sym_x?: bool;
	sym_y?: bool;
	sym_z?: bool;
	fill_type_handle?: zui_handle_t;

	paint2d?: bool;

	last_htab0_pos?: i32;
	maximized_sidebar_width?: i32;
	drag_dest?: i32;
	///end

	///if is_lab
	material?: any; ////
	layer?: any; ////
	tool?: workspace_tool_t;

	color_picker_previous_tool?: workspace_tool_t;

	brush_radius?: f32;
	brush_radius_handle?: zui_handle_t;
	brush_scale?: f32;

	coords?: vec4_t;
	start_x?: f32;
	start_y?: f32;

	// Brush ruler
	lock_begin?: bool;
	lock_x?: bool;
	lock_y?: bool;
	lock_start_x?: f32;
	lock_start_y?: f32;
	registered?: bool;
	///end

	///if is_forge
	selected_object?: object_t;
	///end
}

function context_create(): context_t {
	let c: context_t = {};
	c.merged_object_is_atlas = false; // Only objects referenced by atlas are merged
	c.ddirty = 0; // depth
	c.pdirty = 0; // paint
	c.rdirty = 0; // render
	c.brush_blend_dirty = true;
	c.node_preview_socket = 0;
	c.split_view = false;
	c.view_index = -1;
	c.view_index_last = -1;
	c.picked_color = make_swatch();
	c.envmap_loaded = false;
	c.show_envmap = false;
	c.show_envmap_handle = zui_handle_create({ selected: false });
	c.show_envmap_blur = false;
	c.show_envmap_blur_handle = zui_handle_create({ selected: false });
	c.envmap_angle = 0.0;
	c.light_angle = 0.0;
	c.cull_backfaces = true;
	c.texture_filter = true;
	c.format_type = texture_ldr_format_t.PNG;
	c.format_quality = 100.0;
	c.layers_destination = export_destination_t.DISK;
	c.split_by = split_type_t.OBJECT;
	c.parse_transform = true;
	c.parse_vcols = false;
	c.select_time = 0.0;
	///if (krom_direct3d12 || krom_vulkan || krom_metal)
	c.pathtrace_mode = path_trace_mode_t.CORE;
	///end
	///if (krom_direct3d12 || krom_vulkan) // || krom_metal)
	c.viewport_mode = viewport_mode_t.PATH_TRACE;
	///else
	c.viewport_mode = viewport_mode_t.LIT;
	///end
	///if (krom_android || krom_ios)
	c.render_mode = render_mode_t.FORWARD;
	///else
	c.render_mode = render_mode_t.DEFERRED;
	///end
	c.hscale_was_changed = false;
	c.export_mesh_format = mesh_format_t.OBJ;
	c.export_mesh_index = 0;
	c.pack_assets_on_export = true;
	c.paint_vec = vec4_create();
	c.last_paint_x = -1.0;
	c.last_paint_y = -1.0;
	c.foreground_event = false;
	c.painted = 0;
	c.brush_time = 0.0;
	c.clone_start_x = -1.0;
	c.clone_start_y = -1.0;
	c.clone_delta_x = 0.0;
	c.clone_delta_y = 0.0;
	c.show_compass = true;
	c.project_type = project_model_t.ROUNDED_CUBE;
	c.project_aspect_ratio = 0; // 1:1, 2:1, 1:2
	c.last_paint_vec_x = -1.0;
	c.last_paint_vec_y = -1.0;
	c.prev_paint_vec_x = -1.0;
	c.prev_paint_vec_y = -1.0;
	c.frame = 0;
	c.paint2d_view = false;
	c.lock_started_x = -1.0;
	c.lock_started_y = -1.0;
	c.brush_locked = false;
	c.brush_can_lock = false;
	c.brush_can_unlock = false;
	c.camera_type = camera_type_t.PERSPECTIVE;
	c.cam_handle = zui_handle_create();
	///if is_forge
	c.vxao_ext = 2.0;
	///else
	c.vxao_ext = 1.0;
	///end
	c.vxao_offset = 1.5;
	c.vxao_aperture = 1.2;
	c.texture_export_path = "";
	c.last_status_position = 0;
	c.camera_controls = camera_controls_t.ORBIT;
	c.pen_painting_only = false; // Reject painting with finger when using pen

	///if (is_paint || is_sculpt)
	c.tool = workspace_tool_t.BRUSH;
	c.layer_preview_dirty = true;
	c.layers_preview_dirty = false;
	c.node_preview_dirty = false;
	c.node_preview_name = "";
	c.colorid_picked = false;
	c.material_preview = false; // Drawing material previews
	c.saved_camera = mat4_identity();
	c.color_picker_previous_tool = workspace_tool_t.BRUSH;
	c.materialid_picked = 0;
	c.uvx_picked = 0.0;
	c.uvy_picked = 0.0;
	c.picker_select_material = true;
	c.picker_mask_handle = zui_handle_create();
	c.pick_pos_nor_tex = false;
	c.posx_picked = 0.0;
	c.posy_picked = 0.0;
	c.posz_picked = 0.0;
	c.norx_picked = 0.0;
	c.nory_picked = 0.0;
	c.norz_picked = 0.0;
	c.draw_wireframe = false;
	c.wireframe_handle = zui_handle_create({ selected: false });
	c.draw_texels = false;
	c.texels_handle = zui_handle_create({ selected: false });
	c.colorid_handle = zui_handle_create();
	c.layers_export = export_mode_t.VISIBLE;
	c.decal_preview = false;
	c.decal_x = 0.0;
	c.decal_y = 0.0;
	c.cache_draws = false;
	c.write_icon_on_export = false;
	///if arm_physics
	c.particle_physics = false;
	c.particle_hit_x = 0.0;
	c.particle_hit_y = 0.0;
	c.particle_hit_z = 0.0;
	c.last_particle_hit_x = 0.0;
	c.last_particle_hit_y = 0.0;
	c.last_particle_hit_z = 0.0;
	///end
	c.layer_filter = 0;
	c.gizmo_started = false;
	c.gizmo_offset = 0.0;
	c.gizmo_drag = 0.0;
	c.gizmo_drag_last = 0.0;
	c.translate_x = false;
	c.translate_y = false;
	c.translate_z = false;
	c.scale_x = false;
	c.scale_y = false;
	c.scale_z = false;
	c.rotate_x = false;
	c.rotate_y = false;
	c.rotate_z = false;
	c.brush_nodes_radius = 1.0;
	c.brush_nodes_opacity = 1.0;
	c.brush_mask_image_is_alpha = false;
	c.brush_stencil_image_is_alpha = false;
	c.brush_stencil_x = 0.02;
	c.brush_stencil_y = 0.02;
	c.brush_stencil_scale = 0.9;
	c.brush_stencil_scaling = false;
	c.brush_stencil_angle = 0.0;
	c.brush_stencil_rotating = false;
	c.brush_nodes_scale = 1.0;
	c.brush_nodes_angle = 0.0;
	c.brush_nodes_hardness = 1.0;
	c.brush_directional = false;
	c.brush_radius = 0.5;
	c.brush_radius_handle = zui_handle_create({ value: 0.5 });
	c.brush_scale_x = 1.0;
	c.brush_decal_mask_radius = 0.5;
	c.brush_decal_mask_radius_handle = zui_handle_create({ value: 0.5 });
	c.brush_scale_x_handle = zui_handle_create({ value: 1.0 });
	c.brush_blending = blend_type_t.MIX;
	c.brush_opacity = 1.0;
	c.brush_opacity_handle = zui_handle_create({ value: 1.0 });
	c.brush_scale = 1.0;
	c.brush_angle = 0.0;
	c.brush_angle_handle = zui_handle_create({ value: 0.0 });
	///if is_paint
	c.brush_hardness = 0.8;
	///end
	///if is_sculpt
	c.brush_hardness = 0.05;
	///end
	c.brush_lazy_radius = 0.0;
	c.brush_lazy_step = 0.0;
	c.brush_lazy_x = 0.0;
	c.brush_lazy_y = 0.0;
	c.brush_paint = uv_type_t.UVMAP;
	c.brush_angle_reject_dot = 0.5;
	c.bake_type = bake_type_t.AO;
	c.bake_axis = bake_axis_t.XYZ;
	c.bake_up_axis = bake_up_axis_t.Z;
	c.bake_samples = 128;
	c.bake_ao_strength = 1.0;
	c.bake_ao_radius = 1.0;
	c.bake_ao_offset = 1.0;
	c.bake_curv_strength = 1.0;
	c.bake_curv_radius = 1.0;
	c.bake_curv_offset = 0.0;
	c.bake_curv_smooth = 1;
	c.bake_high_poly = 0;
	c.xray = false;
	c.sym_x = false;
	c.sym_y = false;
	c.sym_z = false;
	c.fill_type_handle = zui_handle_create();
	c.paint2d = false;
	c.last_htab0_pos = 0;
	c.maximized_sidebar_width = 0;
	c.drag_dest = 0;
	///end

	///if is_lab
	c.tool = workspace_tool_t.ERASER;
	c.color_picker_previous_tool = workspace_tool_t.ERASER;
	c.brush_radius = 0.25;
	c.brush_radius_handle = zui_handle_create({ value: 0.25 });
	c.brush_scale = 1.0;
	c.coords = vec4_create();
	c.start_x = 0.0;
	c.start_y = 0.0;
	c.lock_begin = false;
	c.lock_x = false;
	c.lock_y = false;
	c.lock_start_x = 0.0;
	c.lock_start_y = 0.0;
	c.registered = false;
	///end

	return c;
}

let context_raw: context_t;

function context_init() {
	context_raw = context_create();
}

function context_use_deferred(): bool {
	///if is_paint
	return context_raw.render_mode != render_mode_t.FORWARD && (context_raw.viewport_mode == viewport_mode_t.LIT || context_raw.viewport_mode == viewport_mode_t.PATH_TRACE) && context_raw.tool != workspace_tool_t.COLORID;
	///end

	///if (is_sculpt || is_lab)
	return context_raw.render_mode != render_mode_t.FORWARD && (context_raw.viewport_mode == viewport_mode_t.LIT || context_raw.viewport_mode == viewport_mode_t.PATH_TRACE);
	///end
}

///if (is_paint || is_sculpt)
function context_select_material(i: i32) {
	if (project_materials.length <= i) {
		return;
	}
	context_set_material(project_materials[i]);
}

function context_set_material(m: slot_material_t) {
	if (array_index_of(project_materials, m) == -1) {
		return;
	}
	context_raw.material = m;
	make_material_parse_paint_material();
	ui_base_hwnds[tab_area_t.SIDEBAR1].redraws = 2;
	ui_header_handle.redraws = 2;
	ui_nodes_hwnd.redraws = 2;
	ui_nodes_group_stack = [];

	let decal: bool = context_raw.tool == workspace_tool_t.DECAL || context_raw.tool == workspace_tool_t.TEXT;
	if (decal) {
		app_notify_on_next_frame(util_render_make_decal_preview);
	}
}

function context_select_brush(i: i32) {
	if (project_brushes.length <= i) {
		return;
	}
	context_set_brush(project_brushes[i]);
}

function context_set_brush(b: slot_brush_t) {
	if (array_index_of(project_brushes, b) == -1) {
		return;
	}
	context_raw.brush = b;
	make_material_parse_brush();
	ui_base_hwnds[tab_area_t.SIDEBAR1].redraws = 2;
	ui_nodes_hwnd.redraws = 2;
}

function context_select_font(i: i32) {
	if (project_fonts.length <= i) {
		return;
	}
	context_set_font(project_fonts[i]);
}

function context_set_font(f: slot_font_t) {
	if (array_index_of(project_fonts, f) == -1) {
		return;
	}
	context_raw.font = f;
	util_render_make_text_preview();
	util_render_make_decal_preview();
	ui_base_hwnds[tab_area_t.STATUS].redraws = 2;
	ui_view2d_hwnd.redraws = 2;
}

function context_select_layer(i: i32) {
	if (project_layers.length <= i) {
		return;
	}
	context_set_layer(project_layers[i]);
}

function context_set_layer(l: slot_layer_t) {
	if (l == context_raw.layer) {
		return;
	}
	context_raw.layer = l;
	ui_header_handle.redraws = 2;

	let current: image_t = _g2_current;
	let g2_in_use: bool = _g2_in_use;
	if (g2_in_use) g2_end();

	base_set_object_mask();
	make_material_parse_mesh_material();
	make_material_parse_paint_material();

	if (g2_in_use) g2_begin(current);

	ui_base_hwnds[tab_area_t.SIDEBAR0].redraws = 2;
	ui_view2d_hwnd.redraws = 2;
}
///end

function context_select_tool(i: i32) {
	context_raw.tool = i;
	make_material_parse_paint_material();
	make_material_parse_mesh_material();
	context_raw.ddirty = 3;
	let _viewport_mode: viewport_mode_t = context_raw.viewport_mode;
	context_raw.viewport_mode = -1 as viewport_mode_t;
	context_set_viewport_mode(_viewport_mode);

	///if (is_paint || is_sculpt)
	context_init_tool();
	ui_header_handle.redraws = 2;
	ui_toolbar_handle.redraws = 2;
	///end
}

///if (is_paint || is_sculpt)
function context_init_tool() {
	let decal: bool = context_raw.tool == workspace_tool_t.DECAL || context_raw.tool == workspace_tool_t.TEXT;
	if (decal) {
		if (context_raw.tool == workspace_tool_t.TEXT) {
			util_render_make_text_preview();
		}
		util_render_make_decal_preview();
	}

	else if (context_raw.tool == workspace_tool_t.PARTICLE) {
		util_particle_init();
		make_material_parse_particle_material();
	}

	else if (context_raw.tool == workspace_tool_t.BAKE) {
		///if (krom_direct3d12 || krom_vulkan || krom_metal)
		// Bake in lit mode for now
		if (context_raw.viewport_mode == viewport_mode_t.PATH_TRACE) {
			context_raw.viewport_mode = viewport_mode_t.LIT;
		}
		///end
	}

	else if (context_raw.tool == workspace_tool_t.MATERIAL) {
		base_update_fill_layers();
		context_main_object().skip_context = null;
	}

	///if krom_ios
	// No hover on iPad, decals are painted by pen release
	config_raw.brush_live = decal;
	///end
}
///end

function context_select_paint_object(o: mesh_object_t) {
	///if (is_paint || is_sculpt)
	ui_header_handle.redraws = 2;
	for (let i: i32 = 0; i < project_paint_objects.length; ++i) {
		let p: mesh_object_t = project_paint_objects[i];
		p.skip_context = "paint";
	}
	context_raw.paint_object = o;

	let mask: i32 = slot_layer_get_object_mask(context_raw.layer);
	if (context_layer_filter_used()) {
		mask = context_raw.layer_filter;
	}

	if (context_raw.merged_object == null || mask > 0) {
		context_raw.paint_object.skip_context = "";
	}
	util_uv_uvmap_cached = false;
	util_uv_trianglemap_cached = false;
	util_uv_dilatemap_cached = false;
	///end

	///if is_lab
	context_raw.paint_object = o;
	///end
}

function context_main_object(): mesh_object_t {
	///if (is_paint || is_sculpt)
	for (let i: i32 = 0; i < project_paint_objects.length; ++i) {
		let po: mesh_object_t = project_paint_objects[i];
		if (po.base.children.length > 0) {
			return po;
		}
	}
	return project_paint_objects[0];
	///end

	///if is_lab
	return project_paint_objects[0];
	///end
}

function context_layer_filter_used(): bool {
	///if (is_paint || is_sculpt)
	return context_raw.layer_filter > 0 && context_raw.layer_filter <= project_paint_objects.length;
	///end

	///if is_lab
	return true;
	///end
}

function context_object_mask_used(): bool {
	///if (is_paint || is_sculpt)
	return slot_layer_get_object_mask(context_raw.layer) > 0 && slot_layer_get_object_mask(context_raw.layer) <= project_paint_objects.length;
	///end

	///if is_lab
	return false;
	///end
}

function context_in_viewport(): bool {
	return context_raw.paint_vec.x < 1 && context_raw.paint_vec.x > 0 &&
		   context_raw.paint_vec.y < 1 && context_raw.paint_vec.y > 0;
}

function context_in_paint_area(): bool {
	///if (is_paint || is_sculpt)
	let right: i32 = app_w();
	if (ui_view2d_show) {
		right += ui_view2d_ww;
	}
	return mouse_view_x() > 0 && mouse_view_x() < right &&
		   mouse_view_y() > 0 && mouse_view_y() < app_h();
	///end

	///if is_lab
	return context_in_viewport();
	///end
}

function context_in_layers(): bool {
	return zui_get_hovered_tab_name() == tr("Layers");
}

function context_in_materials(): bool {
	return zui_get_hovered_tab_name() == tr("Materials");
}

///if (is_paint || is_sculpt)
function context_in_2d_view(type: view_2d_type_t = view_2d_type_t.LAYER): bool {
	return ui_view2d_show && ui_view2d_type == type &&
		   mouse_x > ui_view2d_wx && mouse_x < ui_view2d_wx + ui_view2d_ww &&
		   mouse_y > ui_view2d_wy && mouse_y < ui_view2d_wy + ui_view2d_wh;
}
///end

function context_in_nodes(): bool {
	return ui_nodes_show &&
		   mouse_x > ui_nodes_wx && mouse_x < ui_nodes_wx + ui_nodes_ww &&
		   mouse_y > ui_nodes_wy && mouse_y < ui_nodes_wy + ui_nodes_wh;
}

function context_in_swatches(): bool {
	return zui_get_hovered_tab_name() == tr("Swatches");
}

function context_in_browser(): bool {
	return zui_get_hovered_tab_name() == tr("Browser");
}

function context_get_area_type(): area_type_t {
	if (context_in_viewport()) {
		return area_type_t.VIEWPORT;
	}
	if (context_in_nodes()) {
		return area_type_t.NODES;
	}
	if (context_in_browser()) {
		return area_type_t.BROWSER;
	}
	///if (is_paint || is_sculpt)
	if (context_in_2d_view()) {
		return area_type_t.VIEW2D;
	}
	if (context_in_layers()) {
		return area_type_t.LAYERS;
	}
	if (context_in_materials()) {
		return area_type_t.MATERIALS;
	}
	///end
	return -1 as area_type_t;
}

function context_set_viewport_mode(mode: viewport_mode_t) {
	if (mode == context_raw.viewport_mode) {
		return;
	}

	context_raw.viewport_mode = mode;
	if (context_use_deferred()) {
		render_path_commands = render_path_deferred_commands;
	}
	else {
		render_path_commands = render_path_forward_commands;
	}
	let _workspace: i32 = ui_header_worktab.position;
	ui_header_worktab.position = 0;
	make_material_parse_mesh_material();
	ui_header_worktab.position = _workspace;
}

function context_load_envmap() {
	if (!context_raw.envmap_loaded) {
		// TODO: Unable to share texture for both radiance and envmap - reload image
		context_raw.envmap_loaded = true;
		map_delete(data_cached_images, "World_radiance.k");
	}
	world_data_load_envmap(scene_world);
	if (context_raw.saved_envmap == null) {
		context_raw.saved_envmap = scene_world._.envmap;
	}
}

function context_update_envmap() {
	if (context_raw.show_envmap) {
		scene_world._.envmap = context_raw.show_envmap_blur ? scene_world._.radiance_mipmaps[0] : context_raw.saved_envmap;
	}
	else {
		scene_world._.envmap = context_raw.empty_envmap;
	}
}

function context_set_viewport_shader(viewportShader: (ns: node_shader_t)=>string) {
	context_raw.viewport_shader = viewportShader;
	context_set_render_path();
}

function context_set_render_path() {
	if (context_raw.render_mode == render_mode_t.FORWARD || context_raw.viewport_shader != null) {
		render_path_commands = render_path_forward_commands;
	}
	else {
		render_path_commands = render_path_deferred_commands;
	}
	app_notify_on_init(make_material_parse_mesh_material);
}

function context_enable_import_plugin(file: string): bool {
	// Return plugin name suitable for importing the specified file
	if (box_preferences_files_plugin == null) {
		box_preferences_fetch_plugins();
	}
	let ext: string = substring(file, string_last_index_of(file, ".") + 1, file.length);
	for (let i: i32 = 0; i < box_preferences_files_plugin.length; ++i) {
		let f: string = box_preferences_files_plugin[i];
		if (starts_with(f, "import_") && string_index_of(f, ext) >= 0) {
			config_enable_plugin(f);
			console_info(f + " " + tr("plugin enabled"));
			return true;
		}
	}
	return false;
}

function context_set_swatch(s: swatch_color_t) {
	context_raw.swatch = s;
}

///if is_lab
function context_run_brush(from: i32) {
	let left: f32 = 0.0;
	let right: f32 = 1.0;

	// First time init
	if (context_raw.last_paint_x < 0 || context_raw.last_paint_y < 0) {
		context_raw.last_paint_vec_x = context_raw.paint_vec.x;
		context_raw.last_paint_vec_y = context_raw.paint_vec.y;
	}

	let nodes: zui_nodes_t = ui_nodes_get_nodes();
	let canvas: zui_node_canvas_t = ui_nodes_get_canvas(true);
	let inpaint: bool = nodes.nodes_selected_id.length > 0 && zui_get_node(canvas.nodes, nodes.nodes_selected_id[0]).type == "InpaintNode";

	// Paint bounds
	if (inpaint &&
		context_raw.paint_vec.x > left &&
		context_raw.paint_vec.x < right &&
		context_raw.paint_vec.y > 0 &&
		context_raw.paint_vec.y < 1 &&
		!base_is_dragging &&
		!base_is_resizing &&
		!base_is_scrolling() &&
		!base_is_combo_selected()) {

		let down: bool = mouse_down() || pen_down();

		// Prevent painting the same spot
		let same_spot: bool = context_raw.paint_vec.x == context_raw.last_paint_x && context_raw.paint_vec.y == context_raw.last_paint_y;
		if (down && same_spot) {
			context_raw.painted++;
		}
		else {
			context_raw.painted = 0;
		}
		context_raw.last_paint_x = context_raw.paint_vec.x;
		context_raw.last_paint_y = context_raw.paint_vec.y;

		if (context_raw.painted == 0) {
			context_parse_brush_inputs();
		}

		if (context_raw.painted <= 1) {
			context_raw.pdirty = 1;
			context_raw.rdirty = 2;
		}
	}
}

function context_parse_brush_inputs() {
	if (!context_raw.registered) {
		context_raw.registered = true;
		app_notify_on_update(context_update);
	}

	context_raw.paint_vec = context_raw.coords;
}

function context_update() {
	let paint_x: f32 = mouse_view_x() / app_w();
	let paint_y: f32 = mouse_view_y() / app_h();
	if (mouse_started()) {
		context_raw.start_x = mouse_view_x() / app_w();
		context_raw.start_y = mouse_view_y() / app_h();
	}

	if (pen_down()) {
		paint_x = pen_view_x() / app_w();
		paint_y = pen_view_y() / app_h();
	}
	if (pen_started()) {
		context_raw.start_x = pen_view_x() / app_w();
		context_raw.start_y = pen_view_y() / app_h();
	}

	if (operator_shortcut(config_keymap.brush_ruler + "+" + config_keymap.action_paint, shortcut_type_t.DOWN)) {
		if (context_raw.lock_x) {
			paint_x = context_raw.start_x;
		}
		if (context_raw.lock_y) {
			paint_y = context_raw.start_y;
		}
	}

	context_raw.coords.x = paint_x;
	context_raw.coords.y = paint_y;

	if (context_raw.lock_begin) {
		let dx: i32 = math_abs(context_raw.lock_start_x - mouse_view_x());
		let dy: i32 = math_abs(context_raw.lock_start_y - mouse_view_y());
		if (dx > 1 || dy > 1) {
			context_raw.lock_begin = false;
			dx > dy ? context_raw.lock_y = true : context_raw.lock_x = true;
		}
	}

	if (keyboard_started(config_keymap.brush_ruler)) {
		context_raw.lock_start_x = mouse_view_x();
		context_raw.lock_start_y = mouse_view_y();
		context_raw.lock_begin = true;
	}
	else if (keyboard_released(config_keymap.brush_ruler)) {
		context_raw.lock_x = context_raw.lock_y = context_raw.lock_begin = false;
	}

	context_parse_brush_inputs();
}
///end
