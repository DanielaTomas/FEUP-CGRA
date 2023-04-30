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

        this.plane = new MyPlane(this.scene,30);

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({normScale: 1});
        this.terrainShader.setUniformsValues({uSampler2: 1});
        this.terrainShader.setUniformsValues({uSampler3: 2});

        this.heightTex = new CGFtexture(this.scene, 'images/heightmap_editado.jpg');
        this.altimetryTex = new CGFtexture(this.scene, 'images/altimetry.png');
        
        this.initMaterials(this.scene);
        this.initBuffers();
	}

    initMaterials(scene){

        this.terrainTex = new CGFtexture(this.scene, 'images/terrain.jpg');

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.terrainTex);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(10.0, 10.0, 10.0, 1.0);
        this.appearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.appearance.setSpecular(0.8, 0.8, 0.8, 1.0);
    }

    display() {

        this.scene.setActiveShader(this.terrainShader);

        this.appearance.apply();

        this.heightTex.bind(1);
		this.altimetryTex.bind(2);

        this.plane.display();

        this.scene.setActiveShader(this.scene.defaultShader);

    }

}
