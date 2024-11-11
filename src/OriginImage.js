export default class OriginImage {
  originImage;

  params = { xCenter: 0, yCenter: 0, width: 0, height: 0 };

  constructor(stateService, imageLoadService, mainCanvas) {
    this.appState = stateService.state;
    this.imageLoadService = imageLoadService;
    this.mainCanvas = mainCanvas;
    this.originImage = new Image();

    this.init();
  }

  init() {
    this.handleLoadImage();
    this.loadImageFromMenu();
  }

  loadImageFromMenu() {
    const inputElement = this.appState.elements.appbarFileInputElement;
    this.imageLoadService.loadImageFromInput(this.originImage, inputElement);
  }

  closeOriginImage() {
    this.originImage.src = "";
    this.appState.image.isLoaded = false;
  }

  handleLoadImage() {
    this.originImage.addEventListener("load", () => {
      this.appState.image.isLoaded = true;
      this.collectParams();
      this.drawImage();
    });
  }

  drawImage() {
    this.mainCanvas.ctx.drawImage(
      this.originImage,
      0,
      0,
      this.mainCanvas.canvas.width,
      this.mainCanvas.canvas.height
    );
  }

  collectParams() {
    this.params.width = this.originImage.width;
    this.params.height = this.originImage.height;
    this.params.xCenter = Math.round(this.originImage.width / 2);
    this.params.yCenter = Math.round(this.originImage.height / 2);`                                                             `
  }
}
