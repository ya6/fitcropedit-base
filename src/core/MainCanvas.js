export default class MainCanvas {
  canvas;
  ctx;
  wraper;
  promoImage;

  params = { xCenter: 0, yCenter: 0, width: 0, height: 0 };

  constructor(stateService, domHandler) {
    this.appState = stateService.state;
    this.domHandler = domHandler;

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

    this.domHandler.injectElement(this.wraper, this.canvas);
  }

  store() {
    this.appState.mainCanvasWraperElement = this.wraper;
    this.appState.mainCanvasElement = this.canvas;
  }

  loadPromo() {
    this.promo = new Image();

    // refactor
    this.promo.src = "public/img/dnd-1.png";
  }

  initAndDrawPromo() {
    this.loadPromo();
    this.promo.addEventListener("load", () => {
      this.drawPromo();
    });
  }

  drawPromo() {
    this.clear();
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = "opacity(0.05)";
    this.ctx.drawImage(this.promo, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = "opacity(1)";
  }

  clear() {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this.canvas.width;
  }

  collectParams() {
    this.params.width = this.canvas.width;
    this.params.height = this.canvas.height;
    this.params.xCenter = Math.round(this.canvas.width / 2);
    this.params.yCenter = Math.round(this.canvas.height / 2);
  }
}
