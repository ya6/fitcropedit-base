export default class MainCanvas {
  canvas;
  ctx;
  wraper;
  promoImage;

  params = { xCenter: 0, yCenter: 0, width: 0, height: 0 };

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

  clear() {
    this.canvas.width = this.canvas.width;
    //imgs still in  the memory
  }

  injectElement(host, element) {
    host.appendChild(element);
  }

  collectParams() {
    this.params.width = this.canvas.width;
    this.params.height = this.canvas.height;
    this.params.xCenter = Math.round(this.canvas.width / 2);
    this.params.yCenter = Math.round(this.canvas.height / 2);

  }
}
