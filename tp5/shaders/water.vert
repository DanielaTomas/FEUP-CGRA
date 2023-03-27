attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform sampler2D uSampler2;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float timeFactor;

void main() {
	vec2 manipulatedTexCoord = (aTextureCoord + vec2(0.01 * timeFactor, 0.01 * timeFactor));
	vec4 waterMapColor = texture2D(uSampler2, manipulatedTexCoord);
	vec3 heightMultiplier = aVertexNormal * waterMapColor.b * 0.06;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + heightMultiplier, 1.0);

	vTextureCoord = aTextureCoord;
}

