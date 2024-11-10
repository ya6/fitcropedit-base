export default class MainCanvas {
  canvas;
  ctx;
  wraper;

  constructor(stateService) {
    this.appState = stateService.state;

    this.init();
    // this.handleResize();
  }

  injectElement(host, element) {
    host.appendChild(element);
  }

  createTemplate() {
    this.wraper = document.createElement("div");
    this.wraper.setAttribute("id", this.appState.mainCanvasWraperSelector);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.setAttribute("id", this.appState.mainCanvasSelector);

    this.injectElement(this.wraper, this.canvas);
  }

  store() {
    this.appState.mainCanvasWraperElement = this.wraper;
    this.appState.mainCanvasElement = this.canvas;
  }

  init() {
    this.createTemplate();
    this.store();
  }

  handleResize() {
    // const resizeObserver = new ResizeObserver(() => {
    //   this.configure();
    //   this.draw();
    // });

    // resizeObserver.observe(this.wraper);
  }
  

  configure() {

    // // console.log(this.appState);

    // if (this.appState.device.width <= 768) {
    //   this.appState.template.containerWidth = "100vw";
    //   this.appState.template.containerHeight = "100vh";
    // }

    // this.rootElement.style.width = this.appState.template.containerWidth;
    // this.rootElement.style.height = this.appState.template.containerHeight;
    // // console.log(this.rootElement.style.width, this.rootElement.style.height);

    // this.canvas.width = this.wraper.clientWidth * this.appState.canvasMultiplier;
    // this.canvas.height = this.wraper.clientHeight * this.appState.canvasMultiplier;
  }

  draw() {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(10, 10, 150, 100);
  }
}
