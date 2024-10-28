export class MainCanvas {
  constructor(container, canvasMultiplier) {
    this.container = container;
    this.canvasMultiplier = canvasMultiplier;

    //
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.setAttribute("id", "fc-main-canvas");
    this.container.appendChild(this.canvas);

    //
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.container);
  }

  handleResize(entries) {
    const containerWidth = entries[0].target.clientWidth;
    const containerHeight = entries[0].target.clientHeight;

    this.canvas.width = containerWidth * this.canvasMultiplier;
    this.canvas.height = containerHeight * this.canvasMultiplier;

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(10, 10, 150, 100);
  }

  disconnect() {
    this.resizeObserver.disconnect();
  }
}
