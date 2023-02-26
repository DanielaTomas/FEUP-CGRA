import {CGFobject} from '../lib/CGF.js';
import {MyQuad } from "./MyQuad.js"

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);

        this.infQuad = new MyQuad(this.scene);
        this.leftQuad = new MyQuad(this.scene);
        this.rightQuad = new MyQuad(this.scene);
        this.frontQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.upQuad = new MyQuad(this.scene);

		this.initBuffers();
	}
	
    display(){
        //Inf
        this.infQuad.display();
        
        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.leftQuad.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0.5,0.5,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.rightQuad.display();
        this.scene.popMatrix();
        
        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.frontQuad.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.backQuad.display();
        this.scene.popMatrix();

        //Up
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(0,-1,0);
        this.upQuad.display();
        this.scene.popMatrix();

    }
}
