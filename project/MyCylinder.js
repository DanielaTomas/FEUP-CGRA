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
        this.texCoords = [];

        var alphaAng = 2*Math.PI/this.slices;

		 // Vertices
		 for(var i = 0; i < this.slices; i++) {
            for(var j = 0; j < 1; j++) { 
                this.vertices.push(Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng), 0,
                		           Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng), this.stacks);
            }       
        }

        // Indices
        for(var i = 0; i < this.slices * 2; i += 2) {
            if( i + 2 == this.vertices.length/3 ) { //dont ask
                var max = i;
                i = i-(this.vertices.length/3) + 1;
                this.indices.push(max, i + 2, max + 1,
                                  i + 1, i + 2, max);
                this.indices.push(max, max + 1,i + 2,
                                  i + 1, max , i + 2);
                break;
            }
            this.indices.push(i, i + 2, i + 1,
                            i + 1, i + 2, i + 3);
            this.indices.push(i, i + 1, i + 2,		//desenhar por dentro
                            i + 3, i + 2, i + 1);
        }

        // Normals
		var ang = 0;
        var i = 0;

        for(i = 0; i < this.slices; i++) {
            for(var j = 0; j < 2; j++) {
                this.normals.push(Math.cos(ang), Math.sin(ang), 0);
            }

            this.texCoords.push(i/this.slices, 1);
            this.texCoords.push(i/this.slices, 0);
			ang+=alphaAng
        }
        this.texCoords.push(i/this.slices, 1);
        this.texCoords.push(i/this.slices, 0);

        
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
