import {CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene,x ,y ,z) {
		super(scene);

        this.trees = [];

        this.x = x;
        this.y = y;
        this.z = z;

        for (var i = 0; i < 3; i++){
            for( var j = 0; j < 3; j++){
                var offsetX = Math.random() * (0.5 - 0.2) + 0.2;
                var treeX = i * 2 + offsetX;
                var offsetZ = Math.random() * (0.5 - 0.2) + 0.2;
                var treeZ = j * 2 + offsetZ;
                this.index = i * 3 + j;
                this.trees[this.index] = new MyBillboard(scene, this.x +  treeX, this.y , this.z + treeZ);
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