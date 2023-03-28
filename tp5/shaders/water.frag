#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler1, vTextureCoord);
	vec4 map = texture2D(uSampler2, vTextureCoord);

	color = color- vec4(0.2*map.b, 0.2*map.b, 0.2*map.b, 0.0);
	
	gl_FragColor = color;
}