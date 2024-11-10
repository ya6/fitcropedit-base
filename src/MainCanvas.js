export default class MainCanvas {
  canvas;
  ctx;
  wraper;
  promoImage;

  constructor(stateService) {
    this.appState = stateService.state;

    this.init();
  }

  init() {
    this.createTemplate();
    this.store();

    //promo
    this.initAndDrawPromo();
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

  draw() {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(10, 10, 150, 100);
  }

  loadPromo() {
    this.promo = new Image();
    this.promo.src = "public/img/dnd-1.png";
  }

  initAndDrawPromo() {
    this.loadPromo();
    this.promo.addEventListener("load", () => {
      this.drawPromo();
    });
  }

  drawPromo() {
    this.ctx.filter = "opacity(0.05)";
    this.ctx.drawImage(this.promo, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = "opacity(1)";
  }

  injectElement(host, element) {
    host.appendChild(element);
  }
}
