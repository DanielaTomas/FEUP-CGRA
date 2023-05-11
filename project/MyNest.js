import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from "./MyCylinder.js";
import { MyQuad } from "./MyQuad.js";
import { MyCircumference } from "./MyCircumference.js";

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
	constructor(scene) {
		super(scene);

        this.cylinder = new MyCylinder(this.scene,4,2);
        this.circumference = new MyCircumference(this.scene,20);
        this.quad = new MyQuad(this.scene);

        this.angles = [];

        this.scene.enableTextures(true);

        this.initMaterials(this.scene);
        this.initBuffers();

	}
    
    initMaterials(scene) {

        this.woodTexture = new CGFtexture(this.scene, "images/textura_ninho.jpg");

        this.nestMaterial = new CGFappearance(scene);
        this.nestMaterial.setTexture(this.woodTexture);
        this.nestMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.nestMaterial.setAmbient(10.0, 10.0, 10.0, 1.0);
        this.nestMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.nestMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);

    }
    display(){

        this.nestMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(2,1,2);
        this.circumference.display();
        this.scene.popMatrix();

        var branch = 20;
        var ang = 0;
        var step = (Math.PI*2)/branch;
        
        this.scene.pushMatrix();

        for(var i = 0; i < branch; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(ang,0,1,0);

            this.scene.pushMatrix();
            this.scene.translate(1.8,0,-0.4);
            this.scene.rotate(Math.PI/4,1,0,-1);
            this.scene.scale(0.1,1,0.1);
            this.cylinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(1.8,0,0.4);
            this.scene.rotate(-Math.PI/4,1,0,1);
            this.scene.scale(0.1,1,0.1);
            this.cylinder.display();
            this.scene.popMatrix();

            this.scene.popMatrix();
            ang += step
        }
        this.scene.popMatrix();

        }


}
