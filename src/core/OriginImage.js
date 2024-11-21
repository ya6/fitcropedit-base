export default class OriginImage {
  baseImage;

  params = { width: 0, height: 0, scale: 1, xCenter: 0, yCenter: 0, dWidth: 0, dHeight: 0, format: "?" };

  constructor(stateService, mainCanvas) {
    this.appState = stateService.state;
    this.mainCanvas = mainCanvas;
    this.baseImage = new Image();
  }

  init() {}

  closeOriginImage() {
    this.baseImage.src = "";
    this.appState.image.isLoaded = false;
    this.resetParams();
    this.diplayDimentionInUI();
    this.appState.data.baseImage.outputFormat = "";
    this.setOutputFormat();
  }

  drawImage() {
    const { dx, dy, dWidth, dHeight } = this.params;
    this.mainCanvas.clear();
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

  resetParams() {
    for (let key in this.params) {
      if (typeof this.params[key] === "number") {
        this.params[key] = 0;
      } else {
        this.params[key] = "";
      }
    }
  }

  diplayDimentionInUI() {
    this.appState.elements.topbarWidthElement.innerText = this.params.width;
    this.appState.elements.topbarHeightElement.innerText = this.params.height;
    this.appState.elements.topbarFormatElement.innerText = this.params.format;
  }

  setOutputFormat(targetElement, format) {
    if (targetElement?.classList.contains("active")) {
      targetElement.classList.remove("active");
      this.appState.data.baseImage.outputFormat = this.params.format;
    } else if (format && this.baseImage.width) {
      this.appState.data.baseImage.outputFormat = format;
    }
    this.displayExtentionUI();
    this.displayOutputFormatUI();
  }

  displayOutputFormatUI() {
    this.appState.elements.rightSidebarOutpitFormatElement.innerText =
      this.appState.data.baseImage.outputFormat;
  }

  displayExtentionUI() {
    const formatButtons = this.appState.elements.rightSidebarFormatBoxElement.children;
    for (const button of formatButtons) {
      button.classList.remove("active");

      if (this.appState.data.baseImage.outputFormat === button.dataset.format) {
        button.classList.add("active");
      }
    }
  }
}
