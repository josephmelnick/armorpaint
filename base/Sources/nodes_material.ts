
let nodes_material_categories: string[] = [
	_tr("Input"),
	_tr("Texture"),
	_tr("Color"),
	_tr("Vector"),
	_tr("Converter"),
	_tr("Group")
];

let nodes_material_list: zui_node_t[][] = [
	[ // Input
		{
			id: 0,
			name: _tr("Attribute"),
			type: "ATTRIBUTE",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("Name"),
					type: "STRING"
				}
			]
		},
		{
			id: 0,
			name: _tr("Camera Data"),
			type: "CAMERA",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("View Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("View Z Depth"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("View Distance"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Fresnel"),
			type: "FRESNEL",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("IOR"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.45,
					min: 0,
					max: 3
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Geometry"),
			type: "NEW_GEOMETRY",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Position"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Tangent"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("True Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Incoming"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Parametric"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Backfacing"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Pointiness"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Random Per Island"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Layer"),
			type: "LAYER", // extension
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Base Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Opacity"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Occlusion"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Roughness"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Metallic"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Emission"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Height"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Subsurface"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: [
				{
					name: _tr("Layer"),
					type: "ENUM",
					default_value: 0,
					data: ""
				}
			]
		},
		{
			id: 0,
			name: _tr("Layer Mask"),
			type: "LAYER_MASK", // extension
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("Layer"),
					type: "ENUM",
					default_value: 0,
					data: ""
				}
			]
		},
		{
			id: 0,
			name: _tr("Layer Weight"),
			type: "LAYER_WEIGHT",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Blend"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fresnel"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Facing"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Material"),
			type: "MATERIAL", // extension
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Base Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Opacity"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Occlusion"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Roughness"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Metallic"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Emission"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Height"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Subsurface"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: [
				{
					name: _tr("Material"),
					type: "ENUM",
					default_value: 0,
					data: ""
				}
			]
		},
		{
			id: 0,
			name: _tr("Object Info"),
			type: "OBJECT_INFO",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Location"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Object Index"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Material Index"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Random"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Picker"),
			type: "PICKER", // extension
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Base Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Opacity"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Occlusion"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Roughness"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Metallic"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Emission"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Height"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Subsurface"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("RGB"),
			type: "RGB",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.5, 0.5, 0.5, 1.0)
				}
			],
			buttons: [
				{
					name: _tr("default_value"),
					type: "RGBA",
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Script"),
			type: "SCRIPT_CPU", // extension
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				}
			],
			buttons: [
				{
					name: " ",
					type: "STRING",
					default_value: ""
				}
			]
		},
		{
			id: 0,
			name: _tr("Shader"),
			type: "SHADER_GPU", // extension
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				}
			],
			buttons: [
				{
					name: " ",
					type: "STRING",
					default_value: ""
				}
			]
		},
		{
			id: 0,
			name: _tr("Tangent"),
			type: "TANGENT",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Tangent"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Texture Coordinate"),
			type: "TEX_COORD",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Generated"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("UV"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Object"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Camera"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Window"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Reflection"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("UV Map"),
			type: "UVMAP",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("UV"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Value"),
			type: "VALUE",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				}
			],
			buttons: [
				{
					name: _tr("default_value"),
					type: "VALUE",
					output: 0,
					min: 0.0,
					max: 10.0
				}
			]
		},
		{
			id: 0,
			name: _tr("Vertex Color"),
			type: "VERTEX_COLOR",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Alpha"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Wireframe"),
			type: "WIREFRAME",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Size"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.01,
					max: 0.1
				},
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("Pixel Size"),
					type: "BOOL",
					default_value: false,
					output: 0
				}
			]
		},
	],
	// [ // Output
	// 	{
	// 		id: 0,
	// 		name: _tr("Material Output"),
	// 		type: "OUTPUT_MATERIAL_PBR",
	// 		x: 0,
	// 		y: 0,
	// 		color: 0xffb34f5a,
	// 		inputs: [
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Base Color"),
	// 				type: "RGBA",
	// 				color: 0xffc7c729,
	// 				default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Opacity"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 1.0
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Occlusion"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 1.0
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Roughness"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 0.1
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Metallic"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 0.0
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Normal Map"),
	// 				type: "VECTOR",
	// 				color: -10238109,
	// 				default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Emission"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 0.0
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Height"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 0.0
	// 			},
	// 			{
	// 				id: 0,
	// 				node_id: 0,
	// 				name: _tr("Subsurface"),
	// 				type: "VALUE",
	// 				color: 0xffa1a1a1,
	// 				default_value: 0.0
	// 			}
	// 		],
	// 		outputs: [],
	// 		buttons: []
	// 	}
	// ],
	[ // Texture
		{
			id: 0,
			name: _tr("Brick Texture"),
			type: "TEX_BRICK",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color 1"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyz(0.8, 0.8, 0.8)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color 2"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyz(0.2, 0.2, 0.2)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Mortar"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Checker Texture"),
			type: "TEX_CHECKER",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color 1"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyz(0.8, 0.8, 0.8)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color 2"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyz(0.2, 0.2, 0.2)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Curvature Bake"),
			type: "BAKE_CURVATURE",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Strength"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0,
					min: 0.0,
					max: 2.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Radius"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0,
					min: 0.0,
					max: 2.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Offset"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0,
					min: -2.0,
					max: 2.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Gradient Texture"),
			type: "TEX_GRADIENT",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: [
				{
					name: _tr("gradient_type"),
					type: "ENUM",
					// data: ["Linear", "Quadratic", "Easing", "Diagonal", "Radial", "Quadratic Sphere", "Spherical"],
					data: [_tr("Linear"), _tr("Diagonal"), _tr("Radial"), _tr("Spherical")],
					default_value: 0,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Image Texture"),
			type: "TEX_IMAGE",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Alpha"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: [
				{
					name: _tr("File"),
					type: "ENUM",
					default_value: 0,
					data: ""
				},
				{
					name: _tr("Color Space"),
					type: "ENUM",
					default_value: 0,
					data: [_tr("Auto"), _tr("Linear"), _tr("sRGB"), _tr("DirectX Normal Map")]
				}
			]
		},
		{
			id: 0,
			name: _tr("Magic Texture"),
			type: "TEX_MAGIC",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Musgrave Texture"),
			type: "TEX_MUSGRAVE",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Height"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Noise Texture"),
			type: "TEX_NOISE",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Voronoi Texture"),
			type: "TEX_VORONOI",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: [
				{
					name: _tr("coloring"),
					type: "ENUM",
					data: [_tr("Intensity"), _tr("Cells")],
					default_value: 0,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Wave Texture"),
			type: "TEX_WAVE",
			x: 0,
			y: 0,
			color: 0xff4982a0,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 5.0,
					min: 0.0,
					max: 10.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: []
		}
	],
	[ // Color
		{
			id: 0,
			name: _tr("Blur"),
			type: "BLUR", // extension
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Strength"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Bright/Contrast"),
			type: "BRIGHTCONTRAST",
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Bright"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Contrast"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Gamma"),
			type: "GAMMA",
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Gamma"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Hue/Saturation"),
			type: "HUE_SAT",
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Hue"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Saturation"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Invert"),
			type: "INVERT",
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("MixRGB"),
			type: "MIX_RGB",
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color 1"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.5, 0.5, 0.5, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color 2"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.5, 0.5, 0.5, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: [
				{
					name: _tr("blend_type"),
					type: "ENUM",
					data: [_tr("Mix"), _tr("Darken"), _tr("Multiply"), _tr("Burn"), _tr("Lighten"), _tr("Screen"), _tr("Dodge"), _tr("Add"), _tr("Overlay"), _tr("Soft Light"), _tr("Linear Light"), _tr("Difference"), _tr("Subtract"), _tr("Divide"), _tr("Hue"), _tr("Saturation"), _tr("Color"), _tr("Value")],
					default_value: 0,
					output: 0
				},
				{
					name: _tr("use_clamp"),
					type: "BOOL",
					default_value: false,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Quantize"),
			type: "QUANTIZE",
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Stength"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.1,
					min: 0,
					max: 1
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Warp"),
			type: "DIRECT_WARP", // extension
			x: 0,
			y: 0,
			color: 0xff448c6d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Angle"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0,
					min: 0.0,
					max: 360.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Mask"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5,
					min: 0.0,
					max: 1.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		}
	],
	[ // Vector
		{
			id: 0,
			name: _tr("Bump"),
			type: "BUMP",
			x: 0,
			y: 0,
			color: 0xff522c99,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Strength"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Distance"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Height"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Mapping"),
			type: "MAPPING",
			x: 0,
			y: 0,
			color: 0xff522c99,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Location"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0),
					display: 1
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Rotation"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0),
					max: 360.0,
					display: 1
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Scale"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(1.0, 1.0, 1.0),
					display: 1
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Mix Normal Map"),
			type: "MIX_NORMAL_MAP",
			x: 0,
			y: 0,
			color: 0xff522c99,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map 1"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map 2"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				}
			],
			buttons: [
				{
					name: _tr("blend_type"),
					type: "ENUM",
					data: [_tr("Partial Derivative"), _tr("Whiteout"), _tr("Reoriented")],
					default_value: 0,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Normal"),
			type: "NORMAL",
			x: 0,
			y: 0,
			color: 0xff522c99,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Dot"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			buttons: [
				{
					name: _tr("Vector"),
					type: "VECTOR",
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0),
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Normal Map"),
			type: "NORMAL_MAP",
			x: 0,
			y: 0,
			color: 0xff522c99,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Stength"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0,
					min: 0.0,
					max: 2.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Normal Map"),
					type: "VECTOR",
					color: -10238109,
					default_value: f32_array_create_xyz(0.5, 0.5, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Vector Curves"),
			type: "CURVE_VEC",
			x: 0,
			y: 0,
			color: 0xff522c99,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: [
				{
					name: "nodes_material_vector_curves_button",
					type: "CUSTOM",
					default_value: [[f32_array_create_xy(0.0, 0.0), f32_array_create_xy(0.0, 0.0)], [f32_array_create_xy(0.0, 0.0), f32_array_create_xy(0.0, 0.0)], [f32_array_create_xy(0.0, 0.0), f32_array_create_xy(0.0, 0.0)]],
					output: 0,
					height: 8.5
				}
			]
		}
	],
	[ // Converter
		{
			id: 0,
			name: _tr("Clamp"),
			type: "CLAMP",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Min"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Max"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("operation"),
					type: "ENUM",
					data: [_tr("Min Max"), _tr("Range")],
					default_value: 0,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Color Ramp"),
			type: "VALTORGB",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Fac"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Alpha"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: "nodes_material_color_ramp_button",
					type: "CUSTOM",
					default_value: [f32_array_create_xyzwv(1.0, 1.0, 1.0, 1.0, 0.0)],
					data: 0,
					output: 0,
					height: 4.5
				}
			]
		},
		{
			id: 0,
			name: _tr("Color Mask"),
			type: "COLMASK",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Mask Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Radius"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.1,
					min: 0.0,
					max: 1.74
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Fuzziness"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Mask"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Combine HSV"),
			type: "COMBHSV",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("H"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("S"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("V"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Combine RGB"),
			type: "COMBRGB",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("R"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("G"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("B"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Combine XYZ"),
			type: "COMBXYZ",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("X"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Y"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Z"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Map Range"),
			type: "MAPRANGE",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("From Min"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("From Max"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("To Min"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("To Max"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 1.0
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("use_clamp"),
					type: "BOOL",
					default_value: false,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("Math"),
			type: "MATH",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.5
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("operation"),
					type: "ENUM",
					data: [_tr("Add"), _tr("Subtract"), _tr("Multiply"), _tr("Divide"), _tr("Power"), _tr("Logarithm"), _tr("Square Root"), _tr("Inverse Square Root"), _tr("Absolute"), _tr("Exponent"), _tr("Minimum"), _tr("Maximum"), _tr("Less Than"), _tr("Greater Than"), _tr("Sign"), _tr("Round"), _tr("Floor"), _tr("Ceil"), _tr("Truncate"), _tr("Fraction"), _tr("Modulo"), _tr("Snap"), _tr("Ping-Pong"), _tr("Sine"), _tr("Cosine"), _tr("Tangent"), _tr("Arcsine"), _tr("Arccosine"), _tr("Arctangent"), _tr("Arctan2"), _tr("Hyperbolic Sine"), _tr("Hyperbolic Cosine"), _tr("Hyperbolic Tangent"), _tr("To Radians"), _tr("To Degrees")],
					default_value: 0,
					output: 0
				},
				{
					name: _tr("use_clamp"),
					type: "BOOL",
					default_value: false,
					output: 0
				}
			]
		},
		{
			id: 0,
			name: _tr("RGB to BW"),
			type: "RGBTOBW",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.0, 0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Val"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Separate HSV"),
			type: "SEPHSV",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.5, 0.5, 0.5, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("H"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("S"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("V"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Separate RGB"),
			type: "SEPRGB",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Color"),
					type: "RGBA",
					color: 0xffc7c729,
					default_value: f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("R"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("G"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("B"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Separate XYZ"),
			type: "SEPXYZ",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("X"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Y"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Z"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: []
		},
		{
			id: 0,
			name: _tr("Vector Math"),
			type: "VECT_MATH",
			x: 0,
			y: 0,
			color: 0xff62676d,
			inputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				}
			],
			outputs: [
				{
					id: 0,
					node_id: 0,
					name: _tr("Vector"),
					type: "VECTOR",
					color: 0xff6363c7,
					default_value: f32_array_create_xyz(0.0, 0.0, 0.0)
				},
				{
					id: 0,
					node_id: 0,
					name: _tr("Value"),
					type: "VALUE",
					color: 0xffa1a1a1,
					default_value: 0.0
				}
			],
			buttons: [
				{
					name: _tr("operation"),
					type: "ENUM",
					data: [_tr("Add"), _tr("Subtract"), _tr("Multiply"), _tr("Divide"), _tr("Average"), _tr("Cross Product"), _tr("Project"), _tr("Reflect"), _tr("Dot Product"), _tr("Distance"), _tr("Length"), _tr("Scale"), _tr("Normalize"), _tr("Absolute"), _tr("Minimum"), _tr("Maximum"), _tr("Floor"), _tr("Ceil"), _tr("Fraction"), _tr("Modulo"), _tr("Snap"), _tr("Sine"), _tr("Cosine"), _tr("Tangent")],
					default_value: 0,
					output: 0
				}
			]
		}
	],
	[ // Input
		{
			id: 0,
			name: _tr("New Group"),
			type: "GROUP",
			x: 0,
			y: 0,
			color: 0xffb34f5a,
			inputs: [],
			outputs: [],
			buttons: [
				{
					name: "nodes_material_new_group_button",
					type: "CUSTOM",
					height: 1
				}
			]
		}
	]
];

function nodes_material_vector_curves_button(ui: zui_t, nodes: zui_nodes_t, node: zui_node_t) {
	let but: zui_node_button_t = node.buttons[0];
	let nhandle: zui_handle_t = zui_nest(zui_handle(__ID__), node.id);
	zui_row([1 / 3, 1 / 3, 1 / 3]);
	zui_radio(zui_nest(zui_nest(nhandle, 0), 1), 0, "X");
	zui_radio(zui_nest(zui_nest(nhandle, 0), 1), 1, "Y");
	zui_radio(zui_nest(zui_nest(nhandle, 0), 1), 2, "Z");
	// Preview
	let axis: i32 = zui_nest(zui_nest(nhandle, 0), 1).position;
	let val: f32_array_t[] = but.default_value[axis]; // [ [[x, y], [x, y], ..], [[x, y]], ..]
	let num: i32 = val.length;
	// for (let i: i32 = 0; i < num; ++i) { ui.line(); }
	ui._y += zui_nodes_LINE_H() * 5;
	// Edit
	zui_row([1 / 5, 1 / 5, 3 / 5]);
	if (zui_button("+")) {
		let f32a: f32_array_t = f32_array_create(2);
		f32a[0] = 0; f32a[1] = 0;
		array_push(val, f32a);
	}
	if (zui_button("-")) {
		if (val.length > 2) {
			val.pop();
		}
	}
	let ihandle: zui_handle_t = zui_nest(zui_nest(zui_nest(nhandle, 0), 2), axis, {position: 0});
	let i: i32 = math_floor(zui_slider(ihandle, "Index", 0, num - 1, false, 1, true, zui_align_t.LEFT));
	if (i >= val.length || i < 0) {
		ihandle.value = i = val.length - 1; // Stay in bounds
	}
	zui_row([1 / 2, 1 / 2]);
	zui_nest(zui_nest(nhandle, 0), 3).value = val[i][0];
	zui_nest(zui_nest(nhandle, 0), 4).value = val[i][1];
	val[i][0] = zui_slider(zui_nest(zui_nest(nhandle, 0), 3, {value: 0}), "X", -1, 1, true, 100, true, zui_align_t.LEFT);
	val[i][1] = zui_slider(zui_nest(zui_nest(nhandle, 0), 4, {value: 0}), "Y", -1, 1, true, 100, true, zui_align_t.LEFT);
}

function nodes_material_color_ramp_button(ui: zui_t, nodes: zui_nodes_t, node: zui_node_t) {
	let but: zui_node_button_t = node.buttons[0];
	let nhandle: zui_handle_t = zui_nest(zui_handle(__ID__), node.id);
	let nx: f32 = ui._x;
	let ny: f32 = ui._y;

	// Preview
	let vals: f32_array_t[] = but.default_value; // [[r, g, b, a, pos], ..]
	let sw: f32 = ui._w / zui_nodes_SCALE();
	for (let i: i32 = 0; i < vals.length; ++i) {
		let val: f32_array_t = vals[i];
		let pos: f32 = val[4];
		let col: i32 = color_from_floats(val[0], val[1], val[2], 1.0);
		zui_fill(pos * sw, 0, (1.0 - pos) * sw, zui_nodes_LINE_H() - 2 * zui_nodes_SCALE(), col);
	}
	ui._y += zui_nodes_LINE_H();
	// Edit
	let ihandle: zui_handle_t = zui_nest(zui_nest(nhandle, 0), 2);
	zui_row([1 / 4, 1 / 4, 2 / 4]);
	if (zui_button("+")) {
		let last: f32_array_t = vals[vals.length - 1];
		let f32a: f32_array_t = f32_array_create(5);
		f32a[0] = last[0];
		f32a[1] = last[1];
		f32a[2] = last[2];
		f32a[3] = last[3];
		f32a[4] = 1.0;
		array_push(vals, f32a);
		ihandle.value += 1;
	}
	if (zui_button("-") && vals.length > 1) {
		vals.pop();
		ihandle.value -= 1;
	}
	but.data = zui_combo(zui_nest(zui_nest(nhandle, 0), 1, {position: but.data}), [tr("Linear"), tr("Constant")], tr("Interpolate"));

	zui_row([1 / 2, 1 / 2]);
	let i: i32 = math_floor(zui_slider(ihandle, "Index", 0, vals.length - 1, false, 1, true, zui_align_t.LEFT));
	if (i >= vals.length || i < 0) {
		ihandle.value = i = vals.length - 1; // Stay in bounds
	}

	let val: f32_array_t = vals[i];
	zui_nest(zui_nest(nhandle, 0), 3).value = val[4];
	val[4] = zui_slider(zui_nest(zui_nest(nhandle, 0), 3), "Pos", 0, 1, true, 100, true, zui_align_t.LEFT);
	if (val[4] > 1.0) {
		val[4] = 1.0; // Stay in bounds
	}
	else if (val[4] < 0.0) {
		val[4] = 0.0;
	}

	let chandle: zui_handle_t = zui_nest(zui_nest(nhandle, 0), 4);
	chandle.color = color_from_floats(val[0], val[1], val[2], 1.0);
	if (zui_text("", zui_align_t.RIGHT, chandle.color) == zui_state_t.STARTED) {
		let rx: f32 = nx + ui._w - zui_nodes_p(37);
		let ry: f32 = ny - zui_nodes_p(5);
		nodes._input_started = ui.input_started = false;
		zui_nodes_rgba_popup(ui, chandle, val, math_floor(rx), math_floor(ry + zui_ELEMENT_H(ui)));
	}
	val[0] = color_get_rb(chandle.color) / 255;
	val[1] = color_get_gb(chandle.color) / 255;
	val[2] = color_get_bb(chandle.color) / 255;
}

function nodes_material_new_group_button(ui: zui_t, nodes: zui_nodes_t, node: zui_node_t) {
	if (node.name == "New Group") {
		for (let i: i32 = 1; i < 999; ++i) {
			node.name = tr("Group") + " " + i;

			let found: bool = false;
			for (let i: i32 = 0; i < project_material_groups.length; ++i) {
				let g: node_group_t = project_material_groups[i];
				if (g.canvas.name == node.name) {
					found = true;
					break;
				}
			}
			if (!found) {
				break;
			}
		}

		array_push(zui_node_replace, node);

		let canvas: zui_node_canvas_t = {
			name: node.name,
			nodes: [
				{
					id: 0,
					name: _tr("Group Input"),
					type: "GROUP_INPUT",
					x: 50,
					y: 200,
					color: 0xff448c6d,
					inputs: [],
					outputs: [],
					buttons: [
						{
							name: "nodes_material_group_input_button",
							type: "CUSTOM",
							height: 1
						}
					]
				},
				{
					id: 1,
					name: _tr("Group Output"),
					type: "GROUP_OUTPUT",
					x: 450,
					y: 200,
					color: 0xff448c6d,
					inputs: [],
					outputs: [],
					buttons: [
						{
							name: "nodes_material_group_output_button",
							type: "CUSTOM",
							height: 1
						}
					]
				}
			],
			links: []
		};
		array_push(project_material_groups, { canvas: canvas, nodes: zui_nodes_create() });
	}

	let group: node_group_t = null;
	for (let i: i32 = 0; i < project_material_groups.length; ++i) {
		let g: node_group_t = project_material_groups[i];
		if (g.canvas.name == node.name) {
			group = g;
			break;
		}
	}

	if (zui_button(tr("Nodes"))) {
		array_push(ui_nodes_group_stack, group);
	}
}

function nodes_material_group_input_button(ui: zui_t, nodes: zui_nodes_t, node: zui_node_t) {
	nodes_material_add_socket_button(ui, nodes, node, node.outputs);
}

function nodes_material_group_output_button(ui: zui_t, nodes: zui_nodes_t, node: zui_node_t) {
	nodes_material_add_socket_button(ui, nodes, node, node.inputs);
}

let _nodes_material_nodes: zui_nodes_t;
let _nodes_material_node: zui_node_t;
let _nodes_material_sockets: zui_node_socket_t[];

function nodes_material_add_socket_button(ui: zui_t, nodes: zui_nodes_t, node: zui_node_t, sockets: zui_node_socket_t[]) {
	if (zui_button(tr("Add"))) {
		_nodes_material_nodes = nodes;
		_nodes_material_node = node;
		_nodes_material_sockets = sockets;
		ui_menu_draw(function (ui: zui_t) {
			let nodes: zui_nodes_t = _nodes_material_nodes;
			let node: zui_node_t = _nodes_material_node;
			let sockets: zui_node_socket_t[] = _nodes_material_sockets;

			let group_stack: node_group_t[] = ui_nodes_group_stack;
			let c: zui_node_canvas_t = group_stack[group_stack.length - 1].canvas;
			if (ui_menu_button(ui, tr("RGBA"))) {
				array_push(sockets, nodes_material_create_socket(nodes, node, null, "RGBA", c));
				nodes_material_sync_sockets(node);
			}
			if (ui_menu_button(ui, tr("Vector"))) {
				array_push(sockets, nodes_material_create_socket(nodes, node, null, "VECTOR", c));
				nodes_material_sync_sockets(node);
			}
			if (ui_menu_button(ui, tr("Value"))) {
				array_push(sockets, nodes_material_create_socket(nodes, node, null, "VALUE", c));
				nodes_material_sync_sockets(node);
			}
		}, 3);
	}
}

function nodes_material_sync_sockets(node: zui_node_t) {
	let group_stack: node_group_t[] = ui_nodes_group_stack;
	let c: zui_node_canvas_t = group_stack[group_stack.length - 1].canvas;
	for (let i: i32 = 0; i < project_materials.length; ++i) {
		let m: slot_material_t = project_materials[i];
		nodes_material_sync_group_sockets(m.canvas, c.name, node);
	}
	for (let i: i32 = 0; i < project_material_groups.length; ++i) {
		let g: node_group_t = project_material_groups[i];
		nodes_material_sync_group_sockets(g.canvas, c.name, node);
	}
	array_push(zui_node_replace, node);
}

function nodes_material_sync_group_sockets(canvas: zui_node_canvas_t, group_name: string, node: zui_node_t) {
	for (let i: i32 = 0; i < canvas.nodes.length; ++i) {
		let n: zui_node_t = canvas.nodes[i];
		if (n.type == "GROUP" && n.name == group_name) {
			let is_inputs: bool = node.name == "Group Input";
			let old_sockets: zui_node_socket_t[] = is_inputs ? n.inputs : n.outputs;
			let sockets: zui_node_socket_t[] = json_parse(json_stringify(is_inputs ? node.outputs : node.inputs));
			is_inputs ? n.inputs = sockets : n.outputs = sockets;
			for (let i: i32 = 0; i < sockets.length; ++i) {
				let s: zui_node_socket_t = sockets[i];
				s.node_id = n.id;
			}
			let num_sockets: i32 = sockets.length < old_sockets.length ? sockets.length : old_sockets.length;
			for (let i: i32 = 0; i < num_sockets; ++i) {
				if (sockets[i].type == old_sockets[i].type) {
					sockets[i].default_value = old_sockets[i].default_value;
				}
			}
		}
	}
}

function nodes_material_get_socket_color(type: string): i32 {
	return type == "RGBA" ? 0xffc7c729 : type == "VECTOR" ? 0xff6363c7 : 0xffa1a1a1;
}

function nodes_material_get_socket_default_value(type: string): any {
	return type == "RGBA" ? f32_array_create_xyzw(0.8, 0.8, 0.8, 1.0) : type == "VECTOR" ? f32_array_create_xyz(0.0, 0.0, 0.0) : 0.0;
}

function nodes_material_get_socket_name(type: string): string {
	return type == "RGBA" ? _tr("Color") : type == "VECTOR" ? _tr("Vector") : _tr("Value");
}

function nodes_material_create_socket(nodes: zui_nodes_t, node: zui_node_t, name: string, type: string, canvas: zui_node_canvas_t, min = 0.0, max = 1.0, default_value: any = null): zui_node_socket_t {
	return {
		id: zui_get_socket_id(canvas.nodes),
		node_id: node.id,
		name: name == null ? nodes_material_get_socket_name(type) : name,
		type: type,
		color: nodes_material_get_socket_color(type),
		default_value: default_value == null ? nodes_material_get_socket_default_value(type) : default_value,
		min: min,
		max: max
	}
}

function nodes_material_get_node_t(node_type: string): zui_node_t {
	for (let i: i32 = 0; i < nodes_material_list.length; ++i) {
		let c: zui_node_t[] = nodes_material_list[i];
		for (let i: i32 = 0; i < c.length; ++i) {
			let n: zui_node_t = c[i];
			if (n.type == node_type) {
				return n;
			}
		}
	}
	return null;
}

function nodes_material_create_node(node_type: string, group: node_group_t = null): zui_node_t {
	let n: zui_node_t = nodes_material_get_node_t(node_type);
	if (n == null) {
		return null;
	}
	let canvas: zui_node_canvas_t = group != null ? group.canvas : context_raw.material.canvas;
	let nodes: zui_nodes_t = group != null ? group.nodes : context_raw.material.nodes;
	let node: zui_node_t = ui_nodes_make_node(n, nodes, canvas);
	array_push(canvas.nodes, node);
	return node;
}
