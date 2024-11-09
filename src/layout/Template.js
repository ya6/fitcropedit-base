export default class Template {
  rootElement;

  constructor(stateService) {
    this.appState = stateService.state;
    this.init();
  }

  init() {
    this.initRootElement();
    this.createTemplate();
  }

  initRootElement() {
    this.getRoot();
    this.storeRoot();
    this.configureRoot();
  }

  getRoot() {
    this.rootElement = document.getElementById(this.appState.rootSelector);
  }

  //
  storeRoot() {
    this.appState.rootElement = this.rootElement;
  }

  configureRoot() {
    this.rootElement.style.width = this.appState.template.containerWidth;
    this.rootElement.style.height = this.appState.template.containerHeight;
  }

  createTemplate() {
    //create wraper
    const wraper = document.createElement("div");
    wraper.setAttribute("id", this.appState.wraperSelector);

    //add to DOM
    this.injectElement(wraper, this.appState.leftSidebarElement);
    this.injectElement(wraper, this.appState.mainCanvasWraperElement);

    this.injectElement(this.rootElement, this.appState.appbarElement);
    this.injectElement(this.rootElement, wraper);
  }

  injectElement(host, element) {
    host.appendChild(element);
  }
}
