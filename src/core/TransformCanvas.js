export default class TransformCanvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
  }

  clear() {
    this.canvas.width = this.canvas.width;
  }
}

//2023
// const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
// const ofctx = offscreenCanvas.getContext("2d");
