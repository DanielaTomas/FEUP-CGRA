import {CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
		super(scene);

        this.trees = [];

        for (var i = 0; i < 3; i++){
            for( var j = 0; j < 3; j++){
                var offsetX = Math.random() * 1.5 - 1;
                var treeX = i * 2 + offsetX;
                var offsetZ = Math.random() * 1.5 - 1;
                var treeZ = j * 2 + offsetZ;
                this.index = i * 3 + j;
                this.trees[this.index] = new MyBillboard(scene, treeX, 0 , treeZ);
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