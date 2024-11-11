export default class ImageProcessor {
  constructor(stateService, resizeService, mainCanvas, originImage) {
    this.appState = stateService.state;
    this.resizeService = resizeService;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;

    this.init();
  }
  init() {
    this.resizeService.handleResize(this.drawCurrentImage.bind(this));
  }

  drawCurrentImage() {
    if (this.appState.image.isLoaded) {
      this.originImage.drawImage();
    } else {
      this.mainCanvas.drawPromo();
    }
  }
}
