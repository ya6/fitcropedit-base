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
      "leftsidebar-submenu-toggle": () => { this.toggleSubMenu() },
      "vertical-flip": () => { this.verticalFlip() },
      "horizontal-flip": () => { this.horizontalFlip() },
      "rotate-left": () => { this.rotateLeft() },
      "rotate-right": () => { this.rotateRight() },
      "zoom-in": () => { this.zoomIn() },
      "zoom-out": () => { this.zoomOut() },
      "show-image-info": () => { this.showImageInfo() },
    },
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
    toolsManager,
    infoService,
    notificationService
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
    this.infoService = infoService;
    this.notificationService = notificationService;

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
      let active;

      if (targetElement.dataset?.action) {
        action = targetElement.dataset?.action;
      }
      if (targetElement.dataset?.role) {
        role = targetElement.dataset?.role;
      }
      if (targetElement.dataset?.options) {
        options = targetElement.dataset?.options;
      }
      if (targetElement.dataset?.active) {
        active = targetElement.dataset?.active;
      }
      // console.log('role--> ', role);
      // console.log('action--> ', action);
      // console.log('options--> ', options);
      // console.log('active--> ', active);

      if (action && this.appState.data.baseImage.width > 0) {
        // if (action) {
        this.perform.image[action] && this.perform.image[action]();

        if (role === "leftsidebar-button") {
          this.toolsManager.manage(targetElement, options, action);
        }
      } else {
        // notify
        active === "requires-image" && this.notificationService.notify("No image loaded. Please open an image to edit.");
      }
    });
  }

  restoreOriginImage() {
    this.history.resetToLoadImage();
    this.originImage.restoreOriginImage();
    this.closeTool();

    // reset transformations
    this.toolsManager.reset(['zoom'])
    this.domHandler.setAngle(0);
  }


  closeTool() {
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();
    this.toolsManager.stop(['hand']);
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

    //
    this.domHandler.diplayDimentionInUI();
    this.domHandler.displayOutputFormatUI();
    this.domHandler.displayZoomUI(1);
    this.domHandler.displayExtentionUI();
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();
    this.domHandler.setAngle(0);

    this.history.resetHistory();

    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();

  }

  saveImage() {
    this.imageLoader.saveImage();
  }

  showImageInfo() {
    this.infoService.showImageInfo();
  }

  verticalFlip() {
    this.toolsManager.verticalFlip();
    this.closeTool();
  }

  horizontalFlip() {
    this.toolsManager.horizontalFlip();
    this.closeTool();
  }

  rotateLeft() {
    this.toolsManager.rotateLeft();
    this.closeTool();
  }

  rotateRight() {
    this.toolsManager.rotateRight();
    this.closeTool();
  }

  toggleSubMenu() {
    let controlClassName = this.appState.device.isSmall ? "open-down" : 'open-left';
    this.appState.elements.leftsidebarSubmenuElement.classList.toggle(controlClassName);
  }

  zoomIn() {
    this.toolsManager.zoomIn();
  }

  zoomOut() {
    this.toolsManager.zoomOut();
  }
}
