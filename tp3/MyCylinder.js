import {CGFobject} from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyCylinder extends CGFobject {
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

        var alphaAng = 2*Math.PI/this.slices;

		 // Vertices
		 for(var i = 0; i < this.slices; i++) {
            for(var j = 0; j < 2; j++) {
                this.vertices.push(Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng), 0,
                		           Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng), this.stacks);
            }
        }

        // Indices
        for(var i = 0; i < this.slices * 4; i += 4) {
            this.indices.push(i, i + 2, i + 1,
                			  i + 1, i + 2, i + 3);
			this.indices.push(i, i + 1, i + 2,		//desenhar por dentro
							  i + 3, i + 2, i + 1);
        }

        // Normals
		var ang = 0
        for(var i = 0; i < this.slices; i++) {
            for(var j = 0; j < 4; j++) {
                if(j==0 || j==1)
                    this.normals.push(Math.cos(ang), Math.sin(ang), 0);
                else
                    this.normals.push(0,0,0);
            }
			ang+=alphaAng
        }

		console.log(this.vertices);
		//console.log(this.indices);
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }


}
