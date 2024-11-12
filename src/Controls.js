export default class Controls {
  rootElement;

  constructor(stateService, mainCanvas, originImage) {
    this.appState = stateService.state;
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
        case this.appState.selectors.rightSidebarCloseButtonSelector:
          this.closeImageRS();
          break;

        case this.appState.selectors.appbarCloseButtonSelector:
          this.closeImageRS();
          break;
      }
    });
  }

  __addListener() {
    this.rootElement.addEventListener("click", (e) => {
      const targetElement = e.target;

      if (targetElement.dataset.role) {
        const role = targetElement.dataset.role;

        switch (role) {
          case "rightsidebar-close-button":
            this.closeImageRS();
            break;
          case "rightsidebar-close-button":
            this.closeImageRS();
            break;
        }
      }
    });
  }

  closeImageRS() {
    this.originImage.closeOriginImage();
    this.mainCanvas.clear();
    this.mainCanvas.drawPromo();
  }
}
