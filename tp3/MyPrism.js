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
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

		for(var j = 0; j < this.stacks; j++){
			
		}

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), -Math.sin(ang), 0);
            this.indices.push(this.slices-1, (i+1), i);
            this.normals.push(0,0,-1);
			
			//console.log(this.vertices);
			console.log(this.indices);
			
			ang+=alphaAng;
        }

		
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
