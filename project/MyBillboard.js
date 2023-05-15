import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
	constructor(scene,x,y,z) {
		super(scene);

        this.imagePaths = ['images/billboardtree1.png', 'images/billboardtree2.png', 'images/billboardtree3.png'];
        this.randomIndex = Math.floor(Math.random() * this.imagePaths.length);

        this.x = x;
        this.y = y;
        this.z = z;

        this.quad = new MyQuad(scene);

        this.treeTex = new CGFtexture(scene, this.imagePaths[this.randomIndex]);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10);
        this.material.setTexture(this.treeTex);


        //this.treeShader = new CGFshader(scene.gl, "shaders/tree.vert", "shaders/tree.frag");


        this.initBuffers();
	}

    display() {

        //this.scene.setActiveShader(this.treeShader);

        this.material.apply();

        this.cameraPosition = this.scene.camera.position;

        this.dx = this.cameraPosition[0] - this.x;
        this.dz = this.cameraPosition[2] - this.z;
        this.angle = Math.atan2(this.dz, this.dx);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(Math.PI/2,0,0,1);
        
        this.scene.rotate(this.angle, -1, 0, 0);

        this.quad.display();
        this.scene.popMatrix();

        //this.scene.setActiveShader(this.scene.defaultShader);

    }

}
