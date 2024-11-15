export default class OriginImage {
  originImage;

  params = { width: 0, height: 0, scale: 1, xCenter: 0, yCenter: 0, dWidth: 0, dHeight: 0 };

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
    this.resetParams();
    this.diplayDimentionInUI();
  }

  handleLoadImage() {
    this.originImage.addEventListener("load", () => {
      this.appState.image.isLoaded = true;
      this.collectParams();
      this.diplayDimentionInUI();
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
    this.setScales();
    this.tranformImageSizeForCanvas();
    this.params.width = this.originImage.width;
    this.params.height = this.originImage.height;
    this.params.xCenter = Math.round(this.originImage.width / 2);
    this.params.yCenter = Math.round(this.originImage.height / 2);
    // console.log("orig params: ", this.params);
  }

  setScales() {
    const wScale = this.originImage.width / this.mainCanvas.canvas.width;
    const hScale = this.originImage.height / this.mainCanvas.canvas.height;
    const scale = Math.max(wScale, hScale);
    this.params.scale = scale / this.appState.public.imageDisplayScale;
  }

  tranformImageSizeForCanvas() {
    this.params.dWidth = Math.floor(this.originImage.width / this.params.scale);
    this.params.dHeight = Math.floor(this.originImage.height / this.params.scale);
  }

  resetParams() {
    for (let key in this.params) {
      if (typeof this.params[key] === "number") {
        this.params[key] = 0;
      }
    }
  }

  diplayDimentionInUI() {
    this.appState.elements.topbarWidthElement.innerText = this.params.width;
    this.appState.elements.topbarHeightElement.innerText = this.params.height;
  }
}
