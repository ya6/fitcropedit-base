export default class MainCanvas {
  constructor(container, stateManager) {
    this.container = container;
    this.appState = stateManager.state;

    //
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.setAttribute("id", this.appState.selectors.mainCanvasSelector);
    this.injectElement(this.container, this.canvas)
    //
    this.init();
  }

   //
   injectElement(host, element) {
    host.appendChild(element);
  }

  init() {
    this.canvas.width =
      this.container.clientWidth * this.appState.canvasMultiplier - this.appState.template.leftSidebarWidth;
    this.canvas.height =
      this.container.clientHeight * this.appState.canvasMultiplier - this.appState.template.appbarHeight;
    this.canvas.style.top = `${this.appState.template.appbarHeight}px`;
    this.canvas.style.left = `${this.appState.template.leftSidebarWidth}px`;

    this.canvas.setAttribute("id", this.appState.selectors.mainCanvasSelector);
    this.container.appendChild(this.canvas);

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(10, 10, 150, 100);
  }
}
