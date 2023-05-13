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

        this.ownOrigin = vec3.fromValues(this.x, this.y, this.z);
        this.quad = new MyQuad(scene);
        this.normals = [...this.quad.normals];

        this.cameraNormalized = vec3.create();
        this.quadToCamera = vec3.create();
        this.quadToCameraNormalized = vec3.create();
        this.faceNormal = vec3.create();
        this.axis = vec3.create();
        this.axisNormalized = vec3.create();
        this.angle = 0;

        
        

        /*this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({normScale: 3});
        this.terrainShader.setUniformsValues({uSampler2: 1});
        this.terrainShader.setUniformsValues({uSampler3: 2});

        this.heightTex = new CGFtexture(this.scene, 'images/heightmap_editado.jpg');
        this.altimetryTex = new CGFtexture(this.scene, 'images/altimetry.png');*/
        
        this.initBuffers();
	}

    display() {

        vec3.normalize(this.cameraNormalized, this.scene.camera.position);

        this.faceNormal = this.quad.updateNormals(this.cameraNormalized);

        vec3.subtract(this.quadToCamera, this.scene.camera.position, this.ownOrigin);
        vec3.normalize(this.quadToCameraNormalized, this.quadToCamera);

        this.angle = Math.acos(vec3.dot(this.faceNormal , this.quadToCameraNormalized));
        vec3.cross(this.axis, this.faceNormal , this.quadToCameraNormalized);
        vec3.normalize(this.axisNormalized, this.axis);

        this.scene.pushMatrix();
        this.scene.rotate(this.angle, this.axisNormalized[0], this.axisNormalized[1] , this.axisNormalized[2]);
        this.quad.display();
        this.scene.popMatrix();

    }

}
