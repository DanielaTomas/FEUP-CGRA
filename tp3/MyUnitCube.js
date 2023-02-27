import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, -0.5,   //0
			-0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5, 	//1
			0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			0.5, -0.5, 0.5, 	//2
			0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5, 	//3
			-0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5, -0.5,    //4
			-0.5, 0.5, -0.5, 
			-0.5, 0.5, -0.5, 
			0.5, 0.5, -0.5, 	//5
			0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, 0.5, 0.5, 		//6
			0.5, 0.5, 0.5, 
			0.5, 0.5, 0.5, 
			-0.5, 0.5, 0.5, 	//7
			-0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			3,9,0, // face inferior
			6,9,3,
			12,21,15, // face superior
			15,21,18,
			21,9,18, // face frontal
			18,9,6,
			12,0,9, // face esquerda
			9,21,12,
			3,0,12, // face traseira
			12,15,3,
			6,3,15, // face direita
			15,18,6
		];

		this.normals = [ // vetor normal x, y, z
			-1 ,0 ,0, //0
			0 ,-1 ,0,
			0 ,0 ,-1,
			1 ,0 ,0 ,  //1
			0 ,-1 ,0,
			0 ,0 ,-1,
			1 ,0 ,0 ,  //2
			0 ,-1 ,0,
			0 ,0 ,1 ,
			-1 ,0 ,0,  //3
			0 ,-1 ,0,
			0 ,0 ,1 ,
			-1 ,0 ,0,  //4
			0 ,1 ,0,
			0 ,0 ,-1,
			1 ,0 ,0 ,  //5
			0 ,1 ,0 ,
			0 ,0 ,-1,
			1 ,0 ,0 ,  //6
			0 ,1 ,0 ,
			0 ,0 ,1 ,
			-1 ,0 ,0,  //7
			0 ,1 ,0 ,
			0 ,0 ,1 ,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
