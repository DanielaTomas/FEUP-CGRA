import {CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeRowPatch extends CGFobject {
    constructor(scene) {
		super(scene);

        this.trees = [];

        for (var i = 0; i < 6; i++){
            var offsetX = Math.random() * 1.5 - 1;
            var treeX = i * 3 + offsetX;
            this.trees[i] = new MyBillboard(scene, treeX, 0 , 0);
        }


        this.initBuffers();
	}

    display() {
        for (var i = 0; i < 6; i++){
            this.trees[i].display();
        }
    }
}