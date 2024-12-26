export default class ImageAnalyzer {
  imageData;

  constructor(stateService, originImage, transformCanvas) {
    this.appState = stateService.state;
    this.originImage = originImage;
    this.transformCanvas = transformCanvas;
  }

  getColorMode() {

    this.transformCanvas.canvas.width = this.originImage.baseImage.width;
    this.transformCanvas.canvas.height = this.originImage.baseImage.height;

    this.transformCanvas.ctx.drawImage(
      this.originImage.baseImage,
      0,
      0,
      this.transformCanvas.canvas.width,
      this.transformCanvas.canvas.height
    );

    this.imageData = this.transformCanvas.ctx.getImageData(
      0,
      0,
      this.transformCanvas.canvas.width,
      this.transformCanvas.canvas.height)

  }
}
