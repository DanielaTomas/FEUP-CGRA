uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
//uniform vec3 uWindDirection;
uniform float uWindIntensity;
uniform float uTime;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main() {
	vec3 WindDirection = vec3(0,0,1);
    vec3 windOffset = aVertexNormal * uWindIntensity * dot(normalize(WindDirection), aVertexNormal);
	float wobbleOffset = sin(uTime) * 0.1;
    vec4 displacedPosition = vec4(aVertexPosition + windOffset * wobbleOffset, 1.0);

    gl_Position = uPMatrix * uMVMatrix * displacedPosition;
    vTextureCoord = aTextureCoord;
}
