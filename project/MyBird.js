import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyWing } from './MyWing.js';
import { MyTriangleTail } from './MyTriangleTail.js';


/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {//Gaspar
	constructor(scene) {
		super(scene);

        this.bodySphere = new MySphere(this.scene,10,15,false,6);
        this.headSphere = new MySphere(this.scene,10,15,false,4);
        this.beakCone = new MyCone(this.scene,10,3);
        this.leftEyeCube = new MyUnitCube(this.scene);
        this.rightEyeCube = new MyUnitCube(this.scene);
        this.leftWing = new MyWing(this.scene);
        this.rightWing = new MyWing(this.scene);
        this.tailTriangle = new MyTriangleTail(this.scene);

        this.scene.enableTextures(true);
        this.birdTexture = new CGFtexture(this.scene, "images/textura_do_gaspar.jpg");

        this.rotateAngle = 0;

        this.initMaterials(this.scene);
        this.initBuffers();

	}

    initMaterials(scene) {

        this.birdAppearance = new CGFappearance(this.scene);
        this.birdAppearance.setTexture(this.birdTexture);
        this.birdAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.birdAppearance.setAmbient(10.0, 10.0, 10.0, 1.0);
        this.birdAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.birdAppearance.setSpecular(0.8, 0.8, 0.8, 1.0);

        this.tailAppearance = new CGFappearance(this.scene);
        this.tailAppearance.setTexture(this.birdTexture);
        this.tailAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.tailAppearance.setAmbient(4.0, 0, 0, 1.0);
        this.tailAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.tailAppearance.setSpecular(0.8, 0.8, 0.8, 1.0);

        this.beakMaterial = new CGFappearance(scene);
        this.beakMaterial.setAmbient(4, 4, 0, 1.0);
        this.beakMaterial.setDiffuse(0, 0, 0, 1.0);
        this.beakMaterial.setSpecular(0, 0, 0, 1.0);
        this.beakMaterial.setShininess(10.0);

        this.eyesMaterial = new CGFappearance(scene);
        this.eyesMaterial.setAmbient(0.5, 1, 0.5, 1.0);
        this.eyesMaterial.setDiffuse(0, 0, 0, 1.0);
        this.eyesMaterial.setSpecular(0, 0, 0, 1.0);
        this.eyesMaterial.setShininess(10.0);

    }

    display(){

        this.birdAppearance.apply();
        
        this.scene.pushMatrix();//Corpo
        this.scene.scale(1,0.35,0.35)//elipse
        this.bodySphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();//Cabeca
        this.scene.translate(-0.8,0,0)
        this.scene.scale(0.3,0.3,0.3)//elipse
        this.headSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.rotateAngle,1,0,0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.rotate(-this.rotateAngle,1,0,0);
        this.rightWing.display();
        this.scene.popMatrix();

        this.tailAppearance.apply();

        this.scene.pushMatrix();//Cauda triangulo
        this.scene.translate(0.9,0,0)
        this.scene.scale(0.3,0.3,0.3)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(this.rotateAngle,0,1,0);
        this.tailTriangle.display();
        this.scene.popMatrix();

        this.beakMaterial.apply();

        this.scene.pushMatrix();//Bico
        this.scene.translate(-1.05,-0.1,0)
        this.scene.scale(0.1,0.1,0.1)
        this.scene.rotate(100/180*Math.PI,0,0,1);
        this.beakCone.display();
        this.scene.popMatrix();

        this.eyesMaterial.apply();

        this.scene.pushMatrix();//Olho Esquerdo
        this.scene.translate(-1,0.05,0.15)
        this.scene.scale(0.1,0.1,0.1)
        this.scene.rotate(Math.PI/4,0,1,0);
        this.leftEyeCube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();//Olho Direito
        this.scene.translate(-1,0.05,-0.15)
        this.scene.scale(0.1,0.1,0.1)
        this.scene.rotate(Math.PI/4,0,1,0);
        this.rightEyeCube.display();
        this.scene.popMatrix();

    }

}
