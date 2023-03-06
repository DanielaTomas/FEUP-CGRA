import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initialize scene objects
        
        this.diamond = new MyDiamond(this.scene);
        this.leftTriangle = new MyTriangle(this.scene);
        this.rightTriangle = new MyTriangle(this.scene);
        this.bottomTriangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleMid = new MyTriangleSmall(this.scene);
        this.topTriangle = new MyTriangle(this.scene);

        this.initMaterials(this.scene);
	}

    initMaterials(scene) {
        // Diamond
        this.diamondMaterial = new CGFappearance(scene);
        this.diamondMaterial.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.diamondMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.diamondMaterial.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.diamondMaterial.setShininess(10.0);

        // Left Triangle
        this.leftTriangleMaterial = new CGFappearance(scene);
        this.leftTriangleMaterial.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.leftTriangleMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.leftTriangleMaterial.setSpecular(0.0, 0.0, 1.0, 1.0);
        this.leftTriangleMaterial.setShininess(10.0);

        //Right Triangle
        this.rightTriangleMaterial = new CGFappearance(scene);
        this.rightTriangleMaterial.setAmbient(1.0, 0.65, 0.0, 1.0);
        this.rightTriangleMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.rightTriangleMaterial.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.rightTriangleMaterial.setShininess(10.0);

        //Bottom Triangle
        this.bottomTriangleMaterial = new CGFappearance(scene);
        this.bottomTriangleMaterial.setAmbient(0.63, 0.13, 0.94, 1.0);
        this.bottomTriangleMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.bottomTriangleMaterial.setSpecular(0.5, 0.1, 0.9, 1.0);
        this.bottomTriangleMaterial.setShininess(10.0);

        //Paralelogram
        this.parallelogramMaterial = new CGFappearance(scene);
        this.parallelogramMaterial.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.parallelogramMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.parallelogramMaterial.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.parallelogramMaterial.setShininess(10.0);

        //Mid Triangle
        this.MidTriangleMaterial = new CGFappearance(scene);
        this.MidTriangleMaterial.setAmbient(1.0, 0.75, 0.8, 1.0);
        this.MidTriangleMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.MidTriangleMaterial.setSpecular(1.0, 0.6, 0.0, 1.0);
        this.MidTriangleMaterial.setShininess(10.0);

        //Top Triangle
        this.topTriangleMaterial = new CGFappearance(scene);
        this.topTriangleMaterial.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.topTriangleMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.topTriangleMaterial.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.topTriangleMaterial.setShininess(10.0);
    }


    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.leftTriangle.enableNormalViz();
        this.rightTriangle.enableNormalViz();
        this.bottomTriangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleMid.enableNormalViz();
        this.topTriangle.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.leftTriangle.disableNormalViz();
        this.rightTriangle.disableNormalViz();
        this.bottomTriangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleMid.disableNormalViz();
        this.topTriangle.disableNormalViz();
    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    
	display(){

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
    
        this.scene.pushMatrix();
        this.scene.multMatrix(scaleDiamond);
        this.scene.multMatrix(rotateDiamond);
        this.scene.multMatrix(translateDiamond);
        //this.diamondMaterial.apply()
        this.scene.customMaterial.apply();
    
        // ---- BEGIN Primitive drawing section
    
        this.diamond.display();
        this.scene.popMatrix();
    
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
        
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateLeftTriangle);
        this.scene.multMatrix(translateLeftTriangle);
        this.leftTriangleMaterial.apply()

        this.leftTriangle.display();
        this.scene.popMatrix()
    
        //Orange Triangle
        this.scene.pushMatrix();
        var translateRightTriangle = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1, 0, 1
        ];
    
        this.scene.multMatrix(translateRightTriangle);
        this.rightTriangleMaterial.apply();
        
        this.rightTriangle.display();
        this.scene.popMatrix()
    
        //Purple Triangle
        this.scene.pushMatrix();
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
    
        this.scene.multMatrix(scaleBottomTriangle);
        this.scene.multMatrix(translateBottomTriangle);
        this.bottomTriangleMaterial.apply();
        this.bottomTriangle.display();
        this.scene.popMatrix()
    
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
            0, 0, -1, 0,
            0, 0, 0, 1
        ];
    
        var translateParallelogram = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -3, -1, 0, 1
        ];
    
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateParallelogram1);
        this.scene.multMatrix(rotateParallelogram2);
        this.scene.multMatrix(scaleParallelogram);
        this.scene.multMatrix(translateParallelogram);
        this.parallelogramMaterial.apply();
        
        this.parallelogram.display();
        this.scene.popMatrix()
    
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
    
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateMidTriangle);
        this.scene.multMatrix(translateMidTriangle);
        this.MidTriangleMaterial.apply();
    
        this.triangleMid.display();
        this.scene.popMatrix()
    
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
    
        this.scene.pushMatrix();
        this.scene.multMatrix(scaleTopTriangle);
        this.scene.multMatrix(rotateTopTriangle);
        this.scene.multMatrix(translateTopTriangle);
        this.topTriangleMaterial.apply();
    
        this.topTriangle.display();
        this.scene.popMatrix()
    }
}

