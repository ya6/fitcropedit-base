export default class ResizeService {
  rootElement;

  constructor(stateService, deviceService, mainCanvas) {
    this.appState = stateService.state;
    this.rootElement = this.appState.rootElement;
    this.deviceService = deviceService;
    this.mainCanvas = mainCanvas;
  }

  handleResize(callback) {
    const resizeObserver = new ResizeObserver(() => {
      this.deviceService.init();

      this.configureRoot();

      callback();
    });

    resizeObserver.observe(this.rootElement);
  }

  configureRoot() {
    if (this.appState.device.width <= this.appState.device.mobileBP) {
      this.rootElement.style.width = this.appState.template.mobileContainerWidth;
      this.rootElement.style.height = this.appState.template.mobileContainerHeight;
    } else {
      this.rootElement.style.width = this.appState.template.containerWidth;
      this.rootElement.style.height = this.appState.template.containerHeight;
    }

    this.mainCanvas.canvas.width = this.mainCanvas.wraper.clientWidth * this.appState.canvasMultiplier;
    this.mainCanvas.canvas.height = this.mainCanvas.wraper.clientHeight * this.appState.canvasMultiplier;
  }
}
