export default class OriginImage {
  originImage;

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

  handleLoadImage() {
    this.originImage.addEventListener("load", () => {
      console.log("Loaded!");
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
}
