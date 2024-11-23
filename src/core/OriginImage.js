export default class OriginImage {
  baseImage;

  params = { width: 0, height: 0, scale: 1, xCenter: 0, yCenter: 0, dWidth: 0, dHeight: 0, format: "?" };

  constructor(stateService, mainCanvas, meshCanvas) {
    this.appState = stateService.state;
    this.mainCanvas = mainCanvas;
    this.meshCanvas = meshCanvas;
    this.baseImage = new Image();
  }

  init() {}

  closeOriginImage() {
    this.baseImage.src = "";
    this.appState.data.baseImage.isLoaded = false;
    this.resetParams();
  }

  drawImage() {
    const { dx, dy, dWidth, dHeight } = this.params;
    this.mainCanvas.clear();
    this.meshCanvas.drawMesh();
    this.mainCanvas.ctx.drawImage(this.baseImage, dx, dy, dWidth, dHeight);
  }

  collectParams() {
    this.setScales();
    this.transformImageSizeToCanvas();
    this.calcInitCoords();
    this.getBaseParams();
  }

  getBaseParams() {
    this.params.width = this.baseImage.width;
    this.params.height = this.baseImage.height;
    this.params.xCenter = Math.round(this.baseImage.width / 2);
    this.params.yCenter = Math.round(this.baseImage.height / 2);
  }

  setScales() {
    const wScale = this.baseImage.width / this.mainCanvas.canvas.width;
    const hScale = this.baseImage.height / this.mainCanvas.canvas.height;
    const scale = Math.max(wScale, hScale);
    this.params.scale = scale / this.appState.public.imageDisplayScale;
  }

  transformImageSizeToCanvas() {
    this.params.dWidth = Math.floor(this.baseImage.width / this.params.scale);
    this.params.dHeight = Math.floor(this.baseImage.height / this.params.scale);
  }

  calcInitCoords() {
    this.params.dx = this.mainCanvas.params.xCenter - this.params.dWidth / 2;
    this.params.dy = this.mainCanvas.params.yCenter - this.params.dHeight / 2;
  }
  // refactor, move to utils
  resetParams() {
    for (let key in this.params) {
      if (typeof this.params[key] === "number") {
        this.params[key] = 0;
      } else if (typeof this.params[key] === "boolean") {
        this.params[key] = false;
      } else {
        this.params[key] = "";
      }
    }
  }
}
