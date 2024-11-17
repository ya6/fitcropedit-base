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
    });
  }

  closeImageRS() {
    this.originImage.closeOriginImage();
    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();
  }

  saveImage() {
    if (this.originImage.baseImage.width > 0) {
      this.imageLoadSaveService.saveImage(this.originImage.baseImage);
    }
  }
}
