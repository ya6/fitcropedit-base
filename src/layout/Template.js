export default class Template {
  rootElement;

  constructor(stateService, deviceService, mainCanvas) {
    this.appState = stateService.state;
    this.deviceService = deviceService;
    this.mainCanvas = mainCanvas;
    this.init();
  }

  init() {
    this.initRootElement();
    this.createTemplate();
  }

  initRootElement() {
    this.getRoot();
    this.storeRoot();
    this.handlResize();
  }

  getRoot() {
    this.rootElement = document.getElementById(this.appState.rootSelector);
  }

  //
  storeRoot() {
    this.appState.rootElement = this.rootElement;
  }

  handlResize() {
    const resizeObserver = new ResizeObserver(() => {
      this.deviceService.init();

      this.configureRoot();

      this.mainCanvas.draw();
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

  createTemplate() {
    //create wraper
    const wraper = document.createElement("div");
    wraper.setAttribute("id", this.appState.wraperSelector);

    //add to DOM
    this.injectElement(wraper, this.appState.leftSidebarElement);
    this.injectElement(wraper, this.appState.mainCanvasWraperElement);
    this.injectElement(wraper, this.appState.rightSidebarElement);

    this.injectElement(this.rootElement, this.appState.appbarElement);
    this.injectElement(this.rootElement, wraper);
  }

  injectElement(host, element) {
    host.appendChild(element);
  }
}
