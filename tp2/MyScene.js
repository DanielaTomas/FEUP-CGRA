import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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
    this.diamond = new MyDiamond(this);
    this.leftTriangle = new MyTriangle(this);
    this.rightTriangle = new MyTriangle(this);
    this.bottomTriangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleMid = new MyTriangleSmall(this);
    this.topTriangle = new MyTriangle(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
    this.displayLeftTriangle = true;
    this.displayRightTriangle = true;
    this.displayBottomTriangle = true;
    this.displayParallelogram = true;
    this.displayTriangleMid = true;
    this.displayTopTriangle = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    var scaleDiamond = [
      0.71, 0, 0, 0,
      0, 0.71, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    var angle = Math.PI/4;
    var rotateDiamond = [
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
		];
    
    var translateDiamond = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2, 1, 0, 1
		];

    this.pushMatrix();
    this.multMatrix(scaleDiamond);
    this.multMatrix(rotateDiamond);
    this.multMatrix(translateDiamond);

    // ---- BEGIN Primitive drawing section

    if (this.displayDiamond) this.diamond.display();
    this.popMatrix();

    /**REST OF TANGRAM STARTS HERE */

    //Blue Triangle
    angle = -3*Math.PI/2;
    var rotateLeftTriangle = [
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
		];

    var translateLeftTriangle = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -1, 1, 0, 1
		];
    
    this.pushMatrix();
    this.multMatrix(rotateLeftTriangle);
    this.multMatrix(translateLeftTriangle);
    if (this.displayLeftTriangle) this.leftTriangle.display();
    this.popMatrix()

    //Orange Triangle
    this.pushMatrix();
    var translateRightTriangle = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2, -1, 0, 1
    ];

    this.multMatrix(translateRightTriangle);
    if (this.displayRightTriangle) this.rightTriangle.display();
    this.popMatrix()

    //Purple Triangle
    this.pushMatrix();
    var scaleBottomTriangle = [
      0.5, 0, 0, 0,
      0, 0.5, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    
    var translateBottomTriangle = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, -3, 0, 1
    ];

    this.multMatrix(scaleBottomTriangle);
    this.multMatrix(translateBottomTriangle);
    if (this.displayBottomTriangle) this.bottomTriangle.display();
    this.popMatrix()

    //Parallelogram    
    var angle = Math.PI;
    var rotateParallelogram1 = [
      1, 0, 0, 0,
      0, Math.cos(angle), Math.sin(angle), 0,
      0, -Math.sin(angle), Math.cos(angle), 0,
      0, 0, 0, 1
		];

    var angle = -3*Math.PI/4;
    var rotateParallelogram2 = [
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
		];

    var scaleParallelogram = [
      0.71, 0, 0, 0,
      0, 0.71, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    var translateParallelogram = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -3, -1, 0, 1
    ];

    this.pushMatrix();
    this.multMatrix(rotateParallelogram1);
    this.multMatrix(rotateParallelogram2);
    this.multMatrix(scaleParallelogram);
    this.multMatrix(translateParallelogram);

    if (this.displayParallelogram) this.parallelogram.display();
    this.popMatrix()

    //Pink Triangle
    var angle = -3*Math.PI/2;
    var rotateMidTriangle = [
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    var translateMidTriangle = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 1
    ];

    this.pushMatrix();
    this.multMatrix(rotateMidTriangle);
    this.multMatrix(translateMidTriangle);

    if (this.displayTriangleMid) this.triangleMid.display();
    this.popMatrix()

    //Purple Triangle
    var scaleTopTriangle = [
      0.5, 0, 0, 0,
      0, 0.5, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    
    angle = 3*Math.PI/2;
    var rotateTopTriangle = [
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
		];

    var translateTopTriangle = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -1, 1, 0, 1
    ];

    this.pushMatrix();
    this.multMatrix(scaleTopTriangle);
    this.multMatrix(rotateTopTriangle);
    this.multMatrix(translateTopTriangle);

    if (this.displayTopTriangle) this.topTriangle.display();
    this.popMatrix()

    // ---- END Primitive drawing section
  }
}
