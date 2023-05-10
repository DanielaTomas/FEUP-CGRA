import {CGFobject} from '../lib/CGF.js';


export class MyCircumference extends CGFobject {
  constructor(scene, sliceCount) {
    super(scene);

    this.sliceCount = sliceCount;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = 0;
    var alphaAng = (2 * Math.PI) / this.sliceCount;

    for (let slice = 0; slice <= this.sliceCount; slice++) {
      var x = Math.cos(alpha);
      var y = 0;
      var z = Math.sin(alpha);
      this.vertices.push(x, y, z);
      this.texCoords.push(slice / this.sliceCount, 0);

      if (slice < this.sliceCount) {
        var current = slice;
        var next = current + 1;

        this.indices.push(0, current, next);
        this.indices.push(0, next, current);
      }

      this.normals.push(0, 1, 0);

      alpha += alphaAng;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  
  }

  updateBuffers(){
    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
  