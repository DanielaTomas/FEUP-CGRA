import {CGFobject,CGFappearance} from '../lib/CGF.js';
import {MyQuad } from "./MyQuad.js"

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene,upTex,frontTex, rightTex, backTex, leftTex, infTex) {
		super(scene);

        this.infQuad = new MyQuad(this.scene);
        this.leftQuad = new MyQuad(this.scene);
        this.rightQuad = new MyQuad(this.scene);
        this.frontQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.upQuad = new MyQuad(this.scene);


        if(upTex !== undefined){
            this.upMaterial = new CGFappearance(this.scene);
            this.upMaterial.setTexture(upTex)
        }

        if(frontTex !== undefined){
            this.frontMaterial = new CGFappearance(this.scene);
            this.frontMaterial.setTexture(frontTex)
        }

        if(rightTex !== undefined){
            this.rightMaterial = new CGFappearance(this.scene);
            this.rightMaterial.setTexture(rightTex)
        }

        if(backTex !== undefined){
            this.backMaterial = new CGFappearance(this.scene);
            this.backMaterial.setTexture(backTex)
        }
        
        if(leftTex !== undefined){
            this.leftMaterial = new CGFappearance(this.scene);
            this.leftMaterial.setTexture(leftTex)
        }

        if(infTex !== undefined){
            this.infMaterial = new CGFappearance(this.scene);
            this.infMaterial.setTexture(infTex)
        }

		this.initBuffers();
	}

    enableNormalViz(){
        this.infQuad.enableNormalViz();
        this.leftQuad.enableNormalViz();
        this.rightQuad.enableNormalViz();
        this.frontQuad.enableNormalViz();
        this.backQuad.enableNormalViz();
        this.upQuad.enableNormalViz();
    }

    toggleTextureFiltering(){
        if(this.scene.displayTextureFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

    }
	
    display(){
        //Inf
        if(this.infMaterial !== undefined) {
            this.infMaterial.apply();
            this.toggleTextureFiltering();
        }
    
        this.infQuad.display();
        
        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/2,0,1,0);

        if(this.leftMaterial !== undefined) {
            this.leftMaterial.apply();
            this.toggleTextureFiltering();
        }

        this.leftQuad.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0.5,0.5,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.rotate(Math.PI/2,0,1,0);


        if(this.rightMaterial !== undefined) {
            this.rightMaterial.apply();
            this.toggleTextureFiltering();
        }

        this.rightQuad.display();
        this.scene.popMatrix();
        
        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);

        if(this.frontMaterial !== undefined) {
            this.frontMaterial.apply();
            this.toggleTextureFiltering();
        }

        this.frontQuad.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,0,1,0);

        if(this.backMaterial !== undefined) {
            this.backMaterial.apply();
            this.toggleTextureFiltering();
        }

        this.backQuad.display();
        this.scene.popMatrix();

        //Up
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(0,-1,0);

        if(this.upMaterial !== undefined) {
            this.upMaterial.apply();
            this.toggleTextureFiltering();
        }

        this.upQuad.display();
        this.scene.popMatrix();

    }
}
