// Linearly Transformed Cosines
// https://eheitzresearch.wordpress.com/415-2/

#ifndef _LTC_GLSL_
#define _LTC_GLSL_

const float LUT_SIZE = 64.0;
const float LUT_SCALE = (LUT_SIZE - 1.0) / LUT_SIZE;
const float LUT_BIAS = 0.5 / LUT_SIZE;

float integrate_edge(vec3 v1, vec3 v2) {
	float cos_theta = dot(v1, v2);
	float theta = acos(cos_theta);
	float res = cross(v1, v2).z * ((theta > 0.001) ? theta / sin(theta) : 1.0);
	return res;
}

float ltc_evaluate(vec3 N, vec3 V, float dotnv, vec3 P, mat3 Minv, vec3 points0, vec3 points1, vec3 points2, vec3 points3) {
	// Construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize(V - N * dotnv);
	T2 = cross(N, T1);

	// Rotate area light in (T1, T2, R) basis
	Minv = Minv * transpose(mat3(T1, T2, N));

	// Polygon (allocate 5 vertices for clipping)
	vec3 L0 = Minv * (points0 - P);
	vec3 L1 = Minv * (points1 - P);
	vec3 L2 = Minv * (points2 - P);
	vec3 L3 = Minv * (points3 - P);
	vec3 L4 = vec3(0.0);

	int n = 0;
	// Detect clipping config
	int config = 0;
	if (L0.z > 0.0) config += 1;
	if (L1.z > 0.0) config += 2;
	if (L2.z > 0.0) config += 4;
	if (L3.z > 0.0) config += 8;

	// Clip
	if (config == 0) {
		// Clip all
	}
	else if (config == 1) { // V1 clip V2 V3 V4
		n = 3;
		L1 = -L1.z * L0 + L0.z * L1;
		L2 = -L3.z * L0 + L0.z * L3;
	}
	else if (config == 2) { // V2 clip V1 V3 V4
		n = 3;
		L0 = -L0.z * L1 + L1.z * L0;
		L2 = -L2.z * L1 + L1.z * L2;
	}
	else if (config == 3) { // V1 V2 clip V3 V4
		n = 4;
		L2 = -L2.z * L1 + L1.z * L2;
		L3 = -L3.z * L0 + L0.z * L3;
	}
	else if (config == 4) { // V3 clip V1 V2 V4
		n = 3;
		L0 = -L3.z * L2 + L2.z * L3;
		L1 = -L1.z * L2 + L2.z * L1;
	}
	else if (config == 5) { // V1 V3 clip V2 V4) impossible
		n = 0;
	}
	else if (config == 6) { // V2 V3 clip V1 V4
		n = 4;
		L0 = -L0.z * L1 + L1.z * L0;
		L3 = -L3.z * L2 + L2.z * L3;
	}
	else if (config == 7) { // V1 V2 V3 clip V4
		n = 5;
		L4 = -L3.z * L0 + L0.z * L3;
		L3 = -L3.z * L2 + L2.z * L3;
	}
	else if (config == 8) { // V4 clip V1 V2 V3
		n = 3;
		L0 = -L0.z * L3 + L3.z * L0;
		L1 = -L2.z * L3 + L3.z * L2;
		L2 =  L3;
	}
	else if (config == 9) { // V1 V4 clip V2 V3
		n = 4;
		L1 = -L1.z * L0 + L0.z * L1;
		L2 = -L2.z * L3 + L3.z * L2;
	}
	else if (config == 10) { // V2 V4 clip V1 V3) impossible
		n = 0;
	}
	else if (config == 11) { // V1 V2 V4 clip V3
		n = 5;
		L4 = L3;
		L3 = -L2.z * L3 + L3.z * L2;
		L2 = -L2.z * L1 + L1.z * L2;
	}
	else if (config == 12) { // V3 V4 clip V1 V2
		n = 4;
		L1 = -L1.z * L2 + L2.z * L1;
		L0 = -L0.z * L3 + L3.z * L0;
	}
	else if (config == 13) { // V1 V3 V4 clip V2
		n = 5;
		L4 = L3;
		L3 = L2;
		L2 = -L1.z * L2 + L2.z * L1;
		L1 = -L1.z * L0 + L0.z * L1;
	}
	else if (config == 14) { // V2 V3 V4 clip V1
		n = 5;
		L4 = -L0.z * L3 + L3.z * L0;
		L0 = -L0.z * L1 + L1.z * L0;
	}
	else if (config == 15) { // V1 V2 V3 V4
		n = 4;
	}

	if (n == 0) return 0.0;
	if (n == 3) L3 = L0;
	if (n == 4) L4 = L0;

	// Project onto sphere
	L0 = normalize(L0);
	L1 = normalize(L1);
	L2 = normalize(L2);
	L3 = normalize(L3);
	L4 = normalize(L4);

	// Integrate
	float sum = 0.0;

	sum += integrate_edge(L0, L1);
	sum += integrate_edge(L1, L2);
	sum += integrate_edge(L2, L3);

	if (n >= 4) sum += integrate_edge(L3, L4);
	if (n == 5) sum += integrate_edge(L4, L0);

	return max(0.0, -sum);
}

#endif
