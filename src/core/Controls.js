export default class Controls {
  rootElement;

  constructor(stateService, imageLoader, mainCanvas, originImage, uiControls) {
    this.stateService = stateService;
    this.appState = stateService.state;
    this.imageLoader = imageLoader;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;
    this.uiControls = uiControls;
    this.rootElement = this.appState.rootElement;

    this.init();
  }

  init() {
    this.addListener();
  }

  addListener() {
    this.rootElement.addEventListener("click", (e) => {
      const targetElement = e.target;
      // console.log(targetElement);

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

      // rigthSidebar
      switch (action) {
        // change ouput format
        case "button-format-png":
          this.changeOuputFormat("png");
          break;

        case "button-format-jpeg":
          this.changeOuputFormat("jpeg");
          break;

        case "button-format-webp":
          this.changeOuputFormat("webp");
          break;

        // save
        case "appbar-save-button":
          this.saveImage();
          break;
        // close
        case "appbar-close-button":
          this.closeImage();
          break;
      }

      // leftSidebar
      switch (action) {
        case "leftsidebar-resolution-button":
          // console.log("leftsidebar-resolution-button");
          break;
      }
    });
  }

  changeOuputFormat(format) {
    if (!this.appState.data.baseImage.isLoaded) {
      return;
    }

    if (this.appState.data.baseImage.outputFormat === format) {
      this.appState.data.baseImage.outputFormat = this.appState.data.baseImage.format;
    } else {
      this.appState.data.baseImage.outputFormat = format;
    }

    this.uiControls.displayOutputFormatUI();
    this.uiControls.displayExtentionUI();
  }

  closeImage() {
    this.originImage.closeOriginImage();

    this.stateService.clearBaseImageData();

    this.uiControls.diplayDimentionInUI();
    this.uiControls.displayOutputFormatUI();
    this.uiControls.displayExtentionUI();

    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();
  }

  saveImage() {
    this.imageLoader.saveImage();
  }
}
