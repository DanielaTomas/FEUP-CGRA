import {CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeRowPatch extends CGFobject {
    constructor(scene) {
		super(scene);

        this.trees = [];

        for (var i = 0; i < 6; i++){
            this.trees[i] = new MyBillboard(scene, i * 3, 0 , 0);
        }


        this.initBuffers();
	}

    display() {
        for (var i = 0; i < 6; i++){
            this.trees[i].display();
        }
    }
}