import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

/**
 * MyPanorama
 * @constructor
 * @param CGFtexture
 */
export class MyBird extends CGFobject {//Gaspar
	constructor(scene) {
		super(scene);

        this.bodySphere = new MySphere(this.scene,15,15,false);
        this.headSphere = new MySphere(this.scene,15,15,false);
        
        this.initBuffers();

	}

    display(){
        
        this.scene.pushMatrix();
        //this.sphereMaterial.apply();
        
        //this.scene.rotate(Math.PI/2,0,1,0)
        this.scene.scale(1,0.3,0.3)//elipse
        this.bodySphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.sphereMaterial.apply();
        
        //this.scene.rotate(Math.PI/2,0,1,0)
        this.scene.scale(0.3,0.3,0.3)//elipse
        this.scene.translate(-2.4,0,0)
        this.headSphere.display();
        this.scene.popMatrix();
        
    }

}
