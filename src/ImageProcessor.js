export default class ImageProcessor {
  constructor(stateService, deviceService, resizeService, mainCanvas, originImage) {
    this.appState = stateService.state;
    this.rootElement = this.appState.rootElement;
    this.resizeService = resizeService;
    this.deviceService = deviceService;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;

    this.init();
  }
  init() {
    this.resizeService.handleResize(this.manageResize.bind(this));
  }

  manageResize() {
    this.deviceService.init();
    this.configureBase();
    this.drawCurrentImage()
    this.mainCanvas.collectParams()
  }

  configureBase() {
    if (this.appState.device.width <= this.appState.device.mobileBP) {
      this.rootElement.style.width = this.appState.template.mobileContainerWidth;
      this.rootElement.style.height = this.appState.template.mobileContainerHeight;
    } else {
      this.rootElement.style.width = this.appState.public.containerWidth;
      this.rootElement.style.height = this.appState.public.containerHeight;
    }

    this.mainCanvas.canvas.width = this.mainCanvas.wraper.clientWidth * this.appState.public.canvasMultiplier;
    this.mainCanvas.canvas.height = this.mainCanvas.wraper.clientHeight * this.appState.public.canvasMultiplier;
  }

  drawCurrentImage() {
    if (this.appState.image.isLoaded) {
      this.originImage.drawImage();
    } else {
      this.mainCanvas.drawPromo();
    }
  }
}
