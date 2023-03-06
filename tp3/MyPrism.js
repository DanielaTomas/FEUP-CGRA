import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
        this.indices = [
			1,2,0,
			1,3,2,
			1,4,5,
			1,0,4,
			4,3,5,
			4,2,3			
		];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

		 /* VERTICES */
		 for (var i = 0; i < this.slices; i++) {
            for (var j = 0; j < 2; j++) {
                this.vertices.push(Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng),0 );
                this.vertices.push(Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng),this.stacks);
            }
        }

        /* INDICES */
        for (var i = 0; i < this.slices * 4; i = i + 4) {
            this.indices.push(i, i + 2, i + 1,
                i + 1, i + 2, i + 3);
            this.indices.push(i, i + 1, i + 2,
                i + 3, i + 2, i + 1);
        }


        /* NORMALS */
        for (var i = 0; i < this.slices; i++) {
            for (var j = 0; j < 2; j++) {
                this.normals.push(Math.cos(((i) * alphaAng) + 360 * Math.PI/180 / (this.slices * 2)), 0, Math.sin(((i) * alphaAng) + 360 * Math.PI/180 / (this.slices * 2)));
                this.normals.push(Math.cos(((i) * alphaAng) + 360 * Math.PI/180 / (this.slices * 2)), 0, Math.sin(((i) * alphaAng) + 360 * Math.PI/180 / (this.slices * 2)));
            }
        }


		console.log(this.vertices);
		console.log(this.indices);
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
