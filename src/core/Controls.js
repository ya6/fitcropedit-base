export default class Controls {
  rootElement;

  constructor(stateService, imageLoadSaveService, mainCanvas, originImage) {
    this.appState = stateService.state;
    this.imageLoadSaveService = imageLoadSaveService;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;
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
          this.originImage.setOutputFormat("jpg");
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
    if (this.originImage.baseImage.width > 0) {
      this.imageLoadSaveService.saveImage(this.originImage.baseImage, this.appState.data.baseImage.postfix);
    }
  }
}
