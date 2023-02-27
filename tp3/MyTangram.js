import {CGFobject} from '../lib/CGF.js';
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

		
        this.displayDiamond = true;
        this.displayLeftTriangle = true;
        this.displayRightTriangle = true;
        this.displayBottomTriangle = true;
        this.displayParallelogram = true;
        this.displayTriangleMid = true;
        this.displayTopTriangle = true;
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
    
        // ---- BEGIN Primitive drawing section
    
        if (this.displayDiamond) this.diamond.display();
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
        if (this.displayLeftTriangle) this.leftTriangle.display();
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
        if (this.displayRightTriangle) this.rightTriangle.display();
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
        if (this.displayBottomTriangle) this.bottomTriangle.display();
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
    
        if (this.displayParallelogram) this.parallelogram.display();
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
    
        if (this.displayTriangleMid) this.triangleMid.display();
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
    
        if (this.displayTopTriangle) this.topTriangle.display();
        this.scene.popMatrix()
    }
}

