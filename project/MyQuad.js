import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.faceNormal = vec3.create();
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0, -0.5,  //0
			0.5, 0, -0.5, 	//1
			0.5, 0, 0.5, 	//2
			-0.5, 0, 0.5, 	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1,0,3,
			2,1,3,
		];

		//Facing Z positive
		this.normals = [
			1,0,1,
			1,0,1,
			1,0,1,
			1,0,1,
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			0, 0,
			1, 0,
			1, 1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		this.enableNormalViz();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

	updateNormals(coords) {
		//this.normals = [...coords, ...coords, ...coords, ...coords];
		//console.log(coords);

		// Calculate the face normal of the quad
		this.faceNormal = coords;
		vec3.cross(this.faceNormal, vec3.sub(vec3.create(), this.vertices.slice(0, 3), this.vertices.slice(3, 6)), vec3.sub(vec3.create(), this.vertices.slice(6, 9), this.vertices.slice(3, 6)));
		vec3.normalize(this.faceNormal, this.faceNormal);

		// Update the normals array for each vertex of the quad
		this.normals = [
			// Vertex 0 normal
			this.faceNormal[0], this.faceNormal[1], this.faceNormal[2],
			// Vertex 1 normal
			this.faceNormal[0], this.faceNormal[1], this.faceNormal[2],
			// Vertex 2 normal
			this.faceNormal[0], this.faceNormal[1], this.faceNormal[2],
			// Vertex 3 normal
			this.faceNormal[0], this.faceNormal[1], this.faceNormal[2]
		];

		this.initNormalVizBuffers();
		return(this.faceNormal);
	}
}

