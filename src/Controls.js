export default class Controls {
  rootElement;

  constructor(stateService, mainCanvas, originImage) {
    this.appService = stateService.state;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;
    this.rootElement = this.appService.rootElement;

    this.init();
  }

  init() {
    this.addListener();
  }

  addListener() {
    this.rootElement.addEventListener("click", (e) => {
      const targetElement = e.target;

      if (targetElement.dataset.role) {
        const role = targetElement.dataset.role;

        switch (role) {
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
