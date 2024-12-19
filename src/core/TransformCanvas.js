export default class TransformCanvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
  }

  clear() {
    // this.canvas.width = this.canvas.width;
    // test
    this.canvas.width = 0;
    this.canvas.height = 0;
  }
}

//2023
// const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
// const ofctx = offscreenCanvas.getContext("2d");
