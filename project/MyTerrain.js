import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);

        this.plane = new MyPlane(scene,30);

        this.initMaterials(this.scene);
        this.initShaders(this.scene);
        this.initBuffers();
	}

    initMaterials(scene){
        this.texture = new CGFtexture(scene, "images/terrain.jpg");

        this.appearance = new CGFappearance(scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(10.0, 10.0, 10.0, 1.0);
        this.appearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.appearance.setSpecular(0.8, 0.8, 0.8, 1.0);
    }

    initShaders(scene){
        this.shader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues({uSampler1: 2,uSampler2: 3});

        this.terrainTex = new CGFtexture(scene, 'images/terrain.jpg');
        this.heightTex = new CGFtexture(scene, 'images/heightmap.jpg');
    }

    display() {

        this.scene.setActiveShader(this.shader);

        //this.appearance.apply();

        this.terrainTex.bind(1);
        this.heightTex.bind(2);

        this.plane.display();

        this.scene.setActiveShader(this.scene.defaultShader);

    }

}
