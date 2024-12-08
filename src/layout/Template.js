export default class Template {
  rootElement;

  constructor(stateService, deviceService, mainCanvas, originImage) {
    this.appState = stateService.state;
    this.deviceService = deviceService;
    this.mainCanvas = mainCanvas;
    this.originImage = originImage;

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
    this.injectElement(wraper, this.appState.leftSidebarElement);
    this.injectElement(wraper, this.appState.mainCanvasWraperElement);
    this.injectElement(wraper, this.appState.rightSidebarElement);

    this.injectElement(this.rootElement, this.appState.appbarElement);
    this.injectElement(this.rootElement, this.appState.topbarElement);
    this.injectElement(this.rootElement, wraper);
  }

  // injectHistorybarToRightsidebar() {
  //   this.injectElement(
  //     this.appState.elements.rightSidebarHistoryContainerElement,
  //     this.appState.historybarElement
  //   );
  // }

  injectElement(host, element) {
    host.appendChild(element);
  }

  getElements() {
    const entries = Object.entries(this.appState.selectors);

    for (const [key, value] of entries) {
      const elementName = key.replace("Selector", "Element");
      this.appState.elements[elementName] = this.rootElement.querySelector(`#${value}`);
    }
  }
}
