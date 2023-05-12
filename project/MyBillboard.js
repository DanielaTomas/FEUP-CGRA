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

        this.quad = new MyQuad(this.scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.axis = vec3.create();
        this.axisNormalized = vec3.create();
        this.cameraPosition = vec3.create();
        this.cameraNormalized = vec3.create();
        this.ownOrigin = vec3.fromValues(x,y,z);
        this.ownOriginNormalized = vec3.create()
        this.quadToCamera = vec3.create();
        this.quadToCameraNormalized = vec3.create();
        vec3.normalize(this.ownOriginNormalized, this.ownOrigin);

        
        

        /*this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({normScale: 3});
        this.terrainShader.setUniformsValues({uSampler2: 1});
        this.terrainShader.setUniformsValues({uSampler3: 2});

        this.heightTex = new CGFtexture(this.scene, 'images/heightmap_editado.jpg');
        this.altimetryTex = new CGFtexture(this.scene, 'images/altimetry.png');*/
        
        this.initBuffers();
	}

    display() {

        //this.scene.setActiveShader(this.terrainShader);

        //this.appearance.apply();

        //this.heightTex.bind(1);
		//this.altimetryTex.bind(2);
        
        vec3.normalize(this.cameraNormalized, this.scene.camera.position);
        console.log(this.cameraNormalized);
        this.quad.updateNormals(this.cameraNormalized);


        vec3.subtract(this.quadToCamera, this.scene.camera.position, this.ownOrigin);
        vec3.normalize(this.quadToCameraNormalized, this.quadToCamera);

        this.angle = Math.acos(vec3.dot(this.cameraNormalized , this.quadToCameraNormalized));
        //console.log(this.angle);
        vec3.cross(this.axis, this.cameraNormalized , this.quadToCameraNormalized);
        vec3.normalize(this.axisNormalized, this.axis);

        this.scene.pushMatrix();
        this.scene.rotate(this.angle,this.axisNormalized[0],this.axisNormalized[1],this.axisNormalized[2]);
        this.quad.display();
        this.scene.popMatrix();

        

        //this.scene.setActiveShader(this.scene.defaultShader);

    }

}
