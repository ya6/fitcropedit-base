export default class Controls {
  rootElement;

  constructor(stateService, imageLoadSaveService, mainCanvas, originImage, transformCavas) {
    this.appState = stateService.state;
    this.imageLoadSaveService = imageLoadSaveService;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;
    this.transformCavas = transformCavas;
    this.rootElement = this.appState.rootElement;

    this.init();
  }

  init() {
    this.addListener();
  }

  addListener() {
    this.rootElement.addEventListener("click", (e) => {
      const targetElement = e.target;
      const id = targetElement.id;
      let action;

      if (targetElement.dataset?.action) {
        action = targetElement.dataset?.action;
      }

      switch (id) {
        //close
        case this.appState.selectors.rightSidebarCloseButtonSelector:
          this.closeImageRS();
          break;

        case this.appState.selectors.appbarCloseButtonSelector:
          this.closeImageRS();
          break;

        //save
        case this.appState.selectors.rightSidebarSaveButtonSelector:
          this.saveImage();
          break;
      }
      switch (action) {
        //output format
        case "button-format-png":
          this.originImage.setOutputFormat("png");
          break;

        case "button-format-jpeg":
          this.originImage.setOutputFormat("jpeg");
          break;

        case "button-format-webp":
          this.originImage.setOutputFormat("webp");
          break;
      }
    });
  }

  closeImageRS() {
    this.originImage.closeOriginImage();
    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();
  }

  saveImage() {
    const { postfix, outputFormat, format, formatList } = this.appState.data.baseImage;

    if (this.originImage.baseImage.width > 0) {
      if (format === outputFormat) {
        this.imageLoadSaveService.saveImage(this.originImage.baseImage, postfix);
      } else {
        const dataUrl = this.imageLoadSaveService.trasformImageFormat(
          this.transformCavas,
          this.originImage.baseImage,
          outputFormat
        );

        this.imageLoadSaveService.saveDataUrl(dataUrl, formatList[outputFormat], postfix);
      }
    }
  }
}
