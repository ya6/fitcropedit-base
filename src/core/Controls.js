export default class Controls {
  rootElement;

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

    // tools
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

      const id = targetElement.id;
      let action;
      let role;

      if (targetElement.dataset?.action) {
        action = targetElement.dataset?.action;
      }
      if (targetElement.dataset?.role) {
        role = targetElement.dataset?.role;
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

        // close
        case "reset-image":
          this.progressbarService.run(this.restoreOriginImage.bind(this));

          // this.history.resetToLoadImage();
          // this.originImage.restoreOriginImage();
          break;
      }

      // diplay Tool
      // if (this.appState.data.baseImage.width > 0) {
      if (true) {
        switch (action) {
          case "leftsidebar-resize-button":
            this.toolsManager.manage(targetElement, role, "resize");
            break;

          case "leftsidebar-background-button":
            this.toolsManager.manage(targetElement, role, "background");
            break;
        }
      }

      // icons
      switch (action) {
        case "close-tool-button":
          this.closeTool();
          break;

        case "leftsidebar-submenu-toggle":
          this.appState.elements.leftsidebarSubmenuElement.classList.toggle("open");
          break;
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
