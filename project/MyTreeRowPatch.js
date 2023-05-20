import {CGFobject} from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeRowPatch extends CGFobject {
    constructor(scene,x ,y ,z) {
		super(scene);

        this.trees = [];

        this.x = x;
        this.y = y;
        this.z = z;

        for (var i = 0; i < 6; i++){
            var offsetX = Math.random() * (0.5 - 0.2) + 0.2;
            var treeX = i * 1.5 + offsetX;
            this.trees[i] = new MyBillboard(scene, this.x , this.y , this.z + treeX);
        }


        this.initBuffers();
	}

    display() {
        for (var i = 0; i < 6; i++){
            this.trees[i].display();
        }
    }
}