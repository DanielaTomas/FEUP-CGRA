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
            for(var j = 0; j < 1; j++) { 
                this.vertices.push(Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng), 0,
                		           Math.cos((i + j) * alphaAng), Math.sin((i + j) * alphaAng), this.stacks);
            }       
        }

        console.log(this.vertices.length/3);

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
		var ang = 0
        for(var i = 0; i < this.slices; i++) {
            for(var j = 0; j < 2 ; j++) {

                this.normals.push(Math.cos(ang), Math.sin(ang), 0);

            }
			ang+=alphaAng
        }


        /*
        for (var i = 0; i < this.vertices.length; i+=3){
            console.log("vertice " + (i/3) + " -> x: " + this.vertices[i] + " y: " + this.vertices[i + 1] + " z:" + this.vertices[i + 2] );
        }
        
        for (var i = 0; i < this.indices.length; i+=3){
            console.log("indice -> x: " + this.indices[i] + " y: " + this.indices[i + 1] + " z:" + this.indices[i + 2] );
        }

        for (var i = 0; i < this.normals.length; i+=3){
            console.log("normals " + (i/3) + " -> x: " + this.normals[i] + " y: " + this.normals[i + 1] + " z:" + this.normals[i + 2] );
        }
        */
       
		//console.log(this.vertices);
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
