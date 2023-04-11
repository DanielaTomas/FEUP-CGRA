import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

/**
 * MyPanorama
 * @constructor
 * @param CGFtexture
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

		this.texture = texture;
        this.sphere = new MySphere(this.scene,30,30,true);

        this.sphereMaterial = new CGFappearance(this.scene);
        this.sphereMaterial.setTexture(this.texture)
        //this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.sphereMaterial.setAmbient(10.0, 10.0, 10.0, 1.0);
        this.sphereMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.sphereMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.sphereMaterial.setShininess(10.0);
        
        this.initBuffers();

	}

    display(){
        
        this.scene.pushMatrix();
        this.sphereMaterial.apply();

        console.log(this.scene.camera.position[2])
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2])
        this.scene.rotate(Math.PI/2,0,1,0)
        this.scene.scale(200,200,200)
        
        this.sphere.display();
        this.scene.popMatrix();

    }

}
