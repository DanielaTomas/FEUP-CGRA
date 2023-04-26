import {CGFobject} from '../lib/CGF.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleWings } from './MyTriangleWings.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {//Gaspar
	constructor(scene) {
		super(scene);

        this.wingParallelogram = new MyParallelogram(this.scene);
        this.wingTriangle = new MyTriangleWings(this.scene);

        this.initBuffers();

	}

    display(){

        this.scene.pushMatrix();
        this.scene.translate(0.4,0,1.3)
        this.scene.scale(0.4,0.4,0.5)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.wingTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,0,0.3)
        this.scene.scale(0.4,0.4,0.5)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.wingParallelogram.display();
        this.scene.popMatrix();
    }

}
