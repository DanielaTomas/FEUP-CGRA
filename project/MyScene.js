import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyUnitCube } from "./MyUnitCube.js";

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
    this.unitCube = new MyUnitCube(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.panoramaTexture = new CGFtexture(this, "images/panorama_do_gaspar.jpg");

    this.panorama = new MyPanorama(this, this.panoramaTexture)

    this.setUpdatePeriod(50);

    this.appStartTime = Date.now();
    this.animVal = 0;
    this.startVal = 0;
    this.endVal = 1;
    this.animStartTimeSecs = 1;
    this.animDurationSecs = 1;
    this.length = (this.endVal-this.startVal);
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

    var timeSinceAppStart = (t-this.appStartTime)/1000.0;
    this.animVal = this.startVal + 0.2 * Math.sin((2*Math.PI)*(timeSinceAppStart)) * this.length;
    this.bird.rotateAngle = this.startVal + Math.PI / 5 * Math.sin((2*Math.PI) * timeSinceAppStart) * this.length;
    //amplitude * Math.sin(2 * Math.PI * frequency * x);
    this.checkKeys();
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

    this.pushMatrix();
    this.translate(0,this.animVal,0);
    this.bird.display();
    this.popMatrix();

    //this.appearance.apply();

    this.pushMatrix();
    this.translate(0,-3,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.terrain.display();
    this.popMatrix();

    this.panorama.display();

    // ---- END Primitive drawing section
  }
}
