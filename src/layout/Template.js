export default class Template {
  rootElement;

  constructor(stateService, deviceService, mainCanvas, domHandler) {
    this.appState = stateService.state;
    this.deviceService = deviceService;
    this.mainCanvas = mainCanvas;
    this.domHandler = domHandler;

    this.init();
  }

  init() {
    this.initRootElement();
    this.createTemplate();

    this.getElements();
  }

  initRootElement() {
    this.getRoot();
    this.storeRoot();
  }

  getRoot() {
    this.rootElement = document.getElementById(this.appState.rootSelector);
  }

  //
  storeRoot() {
    this.appState.rootElement = this.rootElement;
  }

  createTemplate() {
    //create wraper
    const wraper = document.createElement("div");
    wraper.setAttribute("id", this.appState.wraperSelector);

    //add to DOM
    this.domHandler.injectElement(wraper, this.appState.leftSidebarElement);
    this.domHandler.injectElement(wraper, this.appState.mainCanvasWraperElement);
    this.domHandler.injectElement(wraper, this.appState.rightSidebarElement);

    this.domHandler.injectElement(this.rootElement, this.appState.appbarElement);
    this.domHandler.injectElement(this.rootElement, this.appState.topbarElement);
    this.domHandler.injectElement(this.rootElement, wraper);
  }

  getElements() {
    const entries = Object.entries(this.appState.selectors);

    for (const [key, value] of entries) {
      const elementName = key.replace("Selector", "Element");
      this.appState.elements[elementName] = this.rootElement.querySelector(`#${value}`);
    }
  }
}
