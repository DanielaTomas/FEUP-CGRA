import {CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
		super(scene);

        this.trees = [];

        for (var i = 0; i < 3; i++){
            for( var j = 0; j < 3; j++){
                this.index = i * 3 + j;
                this.trees[this.index] = new MyBillboard(scene, i * 3, 0 , j * 3);
            }
        }


        this.initBuffers();
	}

    display() {
        for (var i = 0; i < 9; i++){
            this.trees[i].display();
        }
    }
}