import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import {CGFOBJModel} from "./CGFOBJModel.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.amogus = new CGFOBJModel(this, 'models/amogus.obj');
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.bird = new MyBird(this);
    this.nest = new MyNest(this);
    this.egg = new MyBirdEgg(this,15,6,1);
    this.tree = new MyBillboard(this,0,0,0);
    this.treeGroupPatch = new MyTreeGroupPatch(this,8.5,-8.5,2.5);
    this.treeRowPatch = new MyTreeRowPatch(this,12,-8.5,-6);

    this.eggs = [
			new MyBirdEgg(this,15,6,1),
      new MyBirdEgg(this,15,6,1),
      new MyBirdEgg(this,15,6,1),
      new MyBirdEgg(this,15,6,1)
		];

    this.treeShader = new CGFshader(this.gl, "shaders/tree.vert", "shaders/tree.frag");

    this.treeShader.setUniformsValues({ //uWindDirection: (1,0,0),
                                        uWindIntensity: 0.1,
                                        uTime: 0})
    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayBird = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.panoramaTexture = new CGFtexture(this, "images/panorama_do_gaspar.jpg");

    this.panorama = new MyPanorama(this, this.panoramaTexture)

    this.amogusMaterial = new CGFappearance(this);
    this.amogusMaterial.setColor(0,1,0.4,0);


    this.setUpdatePeriod(50);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
      this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(10, 10, 5),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    if (this.gui.isKeyPressed("KeyW")){
      text += " W ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")){
      text += " S "
      keysPressed = true;
    }

    if (keysPressed)
      console.log(text)
  }

  update(t) {
    this.checkKeys();
    this.bird.update(this.scaleFactor,this.speedFactor);
    this.treeShader.setUniformsValues({uTime: t / 100 % 100})
	}

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    //Atualizar todas as luzes 
    this.lights[0].update();
    //console.log("camera position x: " + this.camera.position[0] + " y:" + this.camera.position[1] + " z:" +this.camera.position[2])


    this.amogusMaterial.apply();
    this.pushMatrix();
    this.translate(70,-71.1,75);
    this.rotate(Math.PI,0,1,0);
    //this.translate(0,0,60);
    this
    this.scale(0.01,0.01,0.01);
    this.amogus.display();
    this.popMatrix();
    // Draw axis
    if (this.displayAxis) this.axis.display();

    

    // ---- BEGIN Primitive drawing section

    if (this.displayBird) this.bird.display();


    this.setActiveShader(this.treeShader);
    //this.tree.display();
    this.pushMatrix()
    //this.translate(60,-68,35);
    this.scale(8,8,8);
    this.treeGroupPatch.display();
    this.treeRowPatch.display();
    this.popMatrix();
    this.setActiveShader(this.defaultShader);

    this.pushMatrix()
    this.translate(80,-71,0);
    this.nest.display();
    this.popMatrix();


    this.egg.eggMaterial.apply();
    this.pushMatrix();
    this.scale(0.3,0.3,0.3);
    for (var i = 0; i < this.eggs.length; i++){
      this.pushMatrix();
      this.translate(this.eggs[i].position.x,this.eggs[i].position.y,this.eggs[i].position.z);
      this.rotate(this.eggs[i].angle,1,0,0);
      this.eggs[i].display();
      this.popMatrix();
    }
    this.popMatrix();
    
    //this.egg.display();
    //this.appearance.apply();

    this.pushMatrix();
    this.translate(0,-115,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.terrain.display();
    this.popMatrix();

    this.panorama.display();

    

    // ---- END Primitive drawing section
  }
}
