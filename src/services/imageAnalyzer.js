export default class ImageAnalyzer {
  imageData;
  matrix;

  constructor(stateService, originImage, transformCanvas) {
    this.appState = stateService.state;
    this.originImage = originImage;
    this.transformCanvas = transformCanvas;
  }


  makeMatrix() {
    this.matrix = []
    const { height, width } = this.imageData;
    for (let y = 0; y < height; y++) {
      this.matrix[y] = [];
      for (let x = 0; x < width; x++) {
        const i = y * width * 4 + x * 4;

        this.matrix[y][x] = {
          r: this.imageData.data[i],
          g: this.imageData.data[i + 1],
          b: this.imageData.data[i + 2],
          a: this.imageData.data[i + 3]
        }
      }
    }
    // console.log(this.matrix);

  }

  getColorMode() {
    this.transformCanvas.matrixCanvas.width = this.originImage.initialImage.width;
    this.transformCanvas.matrixCanvas.height = this.originImage.initialImage.height;

    this.transformCanvas.matrixCtx.drawImage(
      this.originImage.initialImage,
      0,
      0,
      this.transformCanvas.matrixCanvas.width,
      this.transformCanvas.matrixCanvas.height
    );

    this.imageData = this.transformCanvas.matrixCtx.getImageData(
      0,
      0,
      this.transformCanvas.matrixCanvas.width,
      this.transformCanvas.matrixCanvas.height)

    this.makeMatrix()
  }

}
