export default class MainCanvas {
  constructor(stateService) {
    this.appState = stateService.state;
    this.container = this.appState.rootElement;

    //
    this.wraper = document.createElement("div");
    this.wraper.classList.add("fc-canvas-container");

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.setAttribute("id", this.appState.mainCanvasSelector);

    this.injectElement(this.container, this.wraper);
    this.injectElement(this.wraper, this.canvas);
    //
    this.init();
  }

  //
  injectElement(host, element) {
    host.appendChild(element);
  }

  init() {
    this.configure();
    this.draw();
  }

  configure() {
    const width =
      this.appState.template.containerWidth -
      (this.appState.template.leftSidebarWidth + this.appState.template.rightSidebarWidth);
    const height = this.appState.template.containerHeight - this.appState.template.appbarHeight;

    this.wraper.style.width = `${width}px`;
    this.wraper.style.height = `${height}px`;
    this.wraper.style.top = `${this.appState.template.appbarHeight}px`;
    this.wraper.style.left = `${this.appState.template.leftSidebarWidth}px`;

    this.canvas.width = width * this.appState.canvasMultiplier;
    this.canvas.height = height * this.appState.canvasMultiplier;
  }

  draw() {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(10, 10, 150, 100);
  }
}
