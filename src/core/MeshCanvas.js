export default class MeshCanvas {

  constructor(stateService, mainCanvas) {
	this.appState = stateService.state
	this.mainCanvas = mainCanvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.init();
  }

  init() {
    this.setSize();
    this.generateMesh();
  }

  setSize() {
    this.canvas.width = this.mainCanvas.canvas.width;
    this.canvas.height = this.mainCanvas.canvas.height;
  }

  generateMesh() {
    const square_size = 10; //?
    const num_rows = this.canvas.height / square_size;
    const num_cols = this.canvas.width / square_size;
    const light_gray = "#736F6E"; //?
    const dark_gray = "#595454"; //?
    for (let row = 0; row < num_rows; row++) {
      for (let col = 0; col < num_cols; col++) {
        const fillColor = (row + col) % 2 === 0 ? light_gray : dark_gray;
        this.ctx.fillStyle = fillColor;
        this.ctx.fillRect(col * square_size, row * square_size, square_size, square_size);
      }
    }
  }


  drawMesh() {
	this.mainCanvas.ctx.drawImage(this.canvas, 0, 0);
  }
}
