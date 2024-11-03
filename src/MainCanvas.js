export default class MainCanvas {
  constructor(container, stateService) {
    this.container = container;
    this.appState = stateService.state;

    //
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.setAttribute("id", this.appState.mainCanvasSelector);
    this.injectElement(this.container, this.canvas)
    //
    this.init();
  }

   //
   injectElement(host, element) {
    host.appendChild(element);
  }

  init() {
    this.configure() 
    this.draw();
  }

  configure() {
    this.canvas.width =
    this.appState.template.containerWidth * this.appState.canvasMultiplier - (this.appState.template.leftSidebarWidth + this.appState.template.rightSidebarWidth);
    this.canvas.height =
    this.appState.template.containerHeight * this.appState.canvasMultiplier - this.appState.template.appbarHeight;
    this.canvas.style.top = `${this.appState.template.appbarHeight}px`;
    this.canvas.style.left = `${this.appState.template.leftSidebarWidth}px`;

  }

  draw() {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(10, 10, 150, 100);
  }
}
