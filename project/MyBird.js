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

        this.orientation = 0;
        this.speed = 0;
        this.scale = 1;
        this.position = [];
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.maxSpeed = 3;

        this.bodySphere = new MySphere(this.scene,10,15,false,6);;
        this.headSphere = new MySphere(this.scene,10,15,false,4);
        this.beakCone = new MyCone(this.scene,10,3);
        this.leftEyeCube = new MyUnitCube(this.scene);
        this.rightEyeCube = new MyUnitCube(this.scene);
        this.leftWing = new MyWing(this.scene);
        this.rightWing = new MyWing(this.scene);
        this.tailTriangle = new MyTriangleTail(this.scene);

        this.scene.enableTextures(true);
        this.birdTexture = new CGFtexture(this.scene, "images/textura_do_gaspar.jpg");

        this.animVal = 0;
        this.rotateAngle = 0;
        this.animAng = 0;

        this.isCatching = false;
        this.animDuration = 2;
        this.pickedUpEgg = null;//referencia ao ovo apanhado

        this.initMaterials(this.scene);
        this.initBuffers();

	}

    initMaterials(scene) {

        this.birdAppearance = new CGFappearance(scene);
        this.birdAppearance.setTexture(this.birdTexture);
        this.birdAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.birdAppearance.setAmbient(10.0, 10.0, 10.0, 1.0);
        this.birdAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.birdAppearance.setSpecular(0.8, 0.8, 0.8, 1.0);

        this.tailAppearance = new CGFappearance(scene);
        this.tailAppearance.setTexture(this.birdTexture);
        this.tailAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.tailAppearance.setAmbient(4.0, 0, 0, 1.0);
        this.tailAppearance.setDiffuse(0, 0, 0, 1.0);
        this.tailAppearance.setSpecular(0.8, 0, 0, 1.0);

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
    turn(v) {
        this.orientation = this.orientation + 0.1*v;
    }
    accelerate(v) {
        this.speed = this.speed + 0.01 * v;
    }

    catchEgg(time){

        if (time <= this.animDuration) {
            if (time <= this.animDuration-1) { // Descend movement // this.animDuration/2 ???
                console.log("descendo")
                this.position.y = this.position.y - 2;
            } 
            else { // Ascend movement
                console.log("subindo")
                this.position.y = this.position.y + 2; 
            }
        }
        else {
            this.isCatching = false;
        }
    }

    update(timeSinceAppStart,scaleFactor,speedFactor) {
        
        this.scale = scaleFactor;

        this.position.x = this.position.x - Math.cos(this.orientation) * this.speed;
        this.position.z = this.position.z + Math.sin(this.orientation) * this.speed;
        
        this.animAng = this.animAng + this.speed + 0.3*speedFactor;
        this.rotateAngle = Math.PI / 6 * Math.sin(this.animAng);
        this.animVal = 0.2 * Math.sin(this.animAng);

        //amplitude * Math.sin(2 * Math.PI * frequency * x);

        if(this.isCatching){
            this.catchEgg(timeSinceAppStart);
        }

        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.orientation = 0;
            this.speed = 0;
            this.scale = 1;
            this.position.x = 0;
            this.position.y = 0;
            this.position.z = 0;
            this.rotateAngle = 0;
            this.animVal = 0;
            this.animAng = 0;
        }
        else {
            if (this.scene.gui.isKeyPressed("KeyW")) {
                this.accelerate(speedFactor); 
                if(this.speed > this.maxSpeed) this.speed = this.maxSpeed;
            }
            if (this.scene.gui.isKeyPressed("KeyS")) {
                this.accelerate(-speedFactor);
                if(this.speed < 0) this.speed = 0;
            }
            if (this.scene.gui.isKeyPressed("KeyA")) {
                this.turn(speedFactor);
            }
            if (this.scene.gui.isKeyPressed("KeyD")) {
                this.turn(-speedFactor);
            }
            if (this.scene.gui.isKeyPressed("KeyP")) {
                this.isCatching = true;
                this.animDuration = timeSinceAppStart+2;
            }
        }
    }

    display(){

        this.birdAppearance.apply();

        //this.pickedUpEgg.display();

        this.scene.pushMatrix();

        this.scene.translate(0,this.animVal,0);
        this.scene.translate(this.position.x,this.position.y,this.position.z);
        this.scene.rotate(this.orientation,0,1,0);
        this.scene.scale(this.scale,this.scale,this.scale);

        this.scene.pushMatrix();//Corpo
        this.scene.scale(1,0.35,0.35)//elipse
        this.bodySphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();//Cabeca
        this.scene.translate(-0.8,0,0)
        this.scene.scale(0.3,0.3,0.3)//elipse
        this.headSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();//Asa esquerda
        this.scene.rotate(this.rotateAngle,1,0,0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();//Asa direita
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

        this.scene.popMatrix();
    }

}
