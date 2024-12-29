export default class ImageAnalyzer {
  imageData;
  matrix;
  params = {
    alpha0: 0,
    gray: 0,
    black: 0,
    white: 0,
    color: 0
  };

  constructor(stateService, originImage, transformCanvas) {
    this.stateService = stateService;
    this.appState = stateService.state;
    this.originImage = originImage;
    this.transformCanvas = transformCanvas;
  }

  resetData() {

    this.matrix = [];
    this.params.alpha0 = 0;
    this.params.color = 0;
    this.params.black = 0;
    this.params.white = 0;
    this.params.gray = 0;
  }


  makeMatrix() {
    this.resetData();
    const { height, width } = this.imageData;
    for (let y = 0; y < height; y++) {
      this.matrix[y] = [];
      for (let x = 0; x < width; x++) {
        const i = y * width * 4 + x * 4;

        const r = this.imageData.data[i],
          g = this.imageData.data[i + 1],
          b = this.imageData.data[i + 2],
          a = this.imageData.data[i + 3]

        this.matrix[y][x] = { r, g, b, a };

        //for png check for transparent white
        if (a === 0) {
          this.params.alpha0 += 1;
        }

        if (r !== g || g !== b) {
          this.params.color += 1;
        }

        if (r === g && g === b) {
          if (r === 0) {
            this.params.black += 1;
          }
          else if (r === 255) {
            this.params.white += 1;
          } else {
            this.params.gray += 1;
          }
        }
      }
    }

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
      this.transformCanvas.matrixCanvas.height);

    this.makeMatrix();
    this.updateImageInfo();
  }

  updateImageInfo() {
    this.stateService.saveBaseImageParams(this.params);
  }

}
