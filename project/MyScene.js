import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";

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
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.bird = new MyBird(this);
    this.nest = new MyNest(this);
    this.egg = new MyBirdEgg(this,30,30,1);

    this.eggs = [
			new MyBirdEgg(this,30,30,1),
      new MyBirdEgg(this,30,30,1),
      new MyBirdEgg(this,30,30,1),
      new MyBirdEgg(this,30,30,1),
		];

    this.eggXposition = [];
    this.eggZposition = [];

    for (var i = 0; i < this.eggs.length; i++){
      this.eggXposition[i] = Math.random() * (60 - (-60)) + (-60);
      this.eggZposition[i] = Math.random() * (120 - (-70)) + (-70);
    }

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.panoramaTexture = new CGFtexture(this, "images/panorama_do_gaspar.jpg");

    this.panorama = new MyPanorama(this, this.panoramaTexture)

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
      //vec3.fromValues(0, -10, 0),
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

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    
    this.bird.display();

    this.pushMatrix()
    this.translate(80,-71,0);
    this.nest.display();
    this.popMatrix();


    this.egg.eggMaterial.apply();
    this.pushMatrix();
    this.translate(80,-71,0);
    this.scale(0.3,0.3,0.3);
    for (var i = 0; i < this.eggs.length; i++){
      this.pushMatrix();
      this.translate(this.eggXposition[i],0,this.eggZposition[i]);
      this.eggs[i].display();
      this.popMatrix();
    }
    this.popMatrix();

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
