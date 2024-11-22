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

      // save feature
      switch (action) {
        case "button-format-png":
          if (this.appState.data.baseImage.outputFormat === "png") {
            this.appState.data.baseImage.outputFormat = this.appState.data.baseImage.format;
          } else {
            this.appState.data.baseImage.outputFormat = "png";
          }

          this.uiControls.displayOutputFormatUI();
          this.uiControls.displayExtentionUI();

          break;

        case "button-format-jpeg":
          if (this.appState.data.baseImage.outputFormat === "jpeg") {
            this.appState.data.baseImage.outputFormat = this.appState.data.baseImage.format;
          } else {
            this.appState.data.baseImage.outputFormat = "jpeg";
          }

          this.uiControls.displayOutputFormatUI();
          this.uiControls.displayExtentionUI();
          break;

        case "button-format-webp":
          if (this.appState.data.baseImage.outputFormat === "webp") {
            this.appState.data.baseImage.outputFormat = this.appState.data.baseImage.format;
          } else {
            this.appState.data.baseImage.outputFormat = "webp";
          }

          this.uiControls.displayOutputFormatUI();
          this.uiControls.displayExtentionUI();
          break;

        case "appbar-save-button":
          this.saveImage();
          break;

        case "appbar-close-button":
          this.closeImage();
          break;
      }

      //left menu
      switch (action) {
        case "leftsidebar-resolution-button":
          // console.log("leftsidebar-resolution-button");
          break;
      }
    });
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
