export default class Controls {
  rootElement;

  constructor(stateService, imageLoader, mainCanvas, originImage) {
    this.appState = stateService.state;
    this.imageLoader = imageLoader;
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
          this.closeImage();
          break;

        //save
        case this.appState.selectors.rightSidebarSaveButtonSelector:
          this.saveImage();
          break;
      }

      switch (action) {
        //output format
        case "button-format-png":
          this.originImage.setOutputFormat(targetElement, "png");
          break;

        case "button-format-jpeg":
          this.originImage.setOutputFormat(targetElement, "jpeg");
          break;

        case "button-format-webp":
          this.originImage.setOutputFormat(targetElement, "webp");
          break;

        case "appbar-save-button":
          this.saveImage();
          break;

        case "appbar-close-button":
          this.closeImage();
          break;
      }
    });
  }

  closeImage() {
    this.originImage.closeOriginImage();
    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();
  }

  saveImage() {
    this.imageLoader.saveImage();
  }
}
