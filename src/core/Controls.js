export default class Controls {
  rootElement;

  perform = {
    image: { // ? name
      "set-output-format-png": () => { this.changeOuputFormat("png"); },
      "set-output-format-jpeg": () => { this.changeOuputFormat("jpeg"); },
      "set-output-format-webp": () => { this.changeOuputFormat("webp"); },
      "save-image": () => { this.saveImage(); },
      "close-image": () => { this.closeImage(); },
      "reset-image": () => { this.progressbarService.run(this.restoreOriginImage.bind(this)); },
      "close-tool": () => { this.closeTool(); },
      "leftsidebar-submenu-toggle": () => { this.appState.elements.leftsidebarSubmenuElement.classList.toggle("open"); }, // ) breaks solid: hi + low
    },
    leftsidebar: (targetElement, options, action) => { this.toolsManager.manage(targetElement, options, action); },
  };

  constructor(
    stateService,
    imageLoader,
    mainCanvas,
    originImage,
    domHandler,
    history,
    historybar,
    progressbarService,
    toolsManager
  ) {
    this.stateService = stateService;
    this.appState = stateService.state;
    this.imageLoader = imageLoader;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;
    this.domHandler = domHandler;
    this.rootElement = this.appState.rootElement;
    this.history = history;
    this.historybar = historybar;
    this.progressbarService = progressbarService;
    this.toolsManager = toolsManager;

    this.init();
  }

  init() {
    this.addListener();
  }

  addListener() {
    this.rootElement.addEventListener("click", (e) => {
      const targetElement = e.target;
      
      // console.log(targetElement);

      let action;
      let role;
      let options;

      if (targetElement.dataset?.action) {
        action = targetElement.dataset?.action;
      }
      if (targetElement.dataset?.role) {
        role = targetElement.dataset?.role;
      }
      if (targetElement.dataset?.options) {
        options = targetElement.dataset?.options;
      }

      if (action && this.appState.data.baseImage.width > 0) {
        this.perform.image[action] && this.perform.image[action]();

        if (role === "leftsidebar-button") {
          this.perform.leftsidebar && this.perform.leftsidebar(targetElement, options, action);
        }
      }
    });
  }

  restoreOriginImage() {
    this.history.resetToLoadImage();
    this.originImage.restoreOriginImage();
    this.closeTool();
  }

  closeTool() {
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();
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

    this.domHandler.displayOutputFormatUI();
    this.domHandler.displayExtentionUI();
  }

  closeImage() {
    this.originImage.closeOriginImage();

    this.stateService.clearBaseImageData();

    this.domHandler.diplayDimentionInUI();
    this.domHandler.displayOutputFormatUI();
    this.domHandler.displayExtentionUI();
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();

    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();

    this.history.resetHistory();
  }

  saveImage() {
    this.imageLoader.saveImage();
  }
}
