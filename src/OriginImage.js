export default class OriginImage {
  originImage;

  constructor(stateService, imageLoadService) {
    this.appState = stateService.state;
    this.imageLoadService = imageLoadService;
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
    });
  }
}
