export default class TemplateService {
  constructor(stateService) {
    this.appState = stateService.state;
	this.init();
  }
  rootElement

init() {
  this.getRoot() 
  this.configure()
}

configure() {
  this.rootElement.style.width = this.appState.template.containerWidth;
  this.rootElement.style.height = this.appState.template.containerHeight;
}

getRoot() {
  this.rootElement = document.getElementById(this.appState.rootSelector);
  this.appState.rootElement =  this.rootElement;
}


  
  getElements() {
    const entries = Object.entries(this.appState.selectors);
   console.log();
   

    for (const [key, value] of entries) {
      const elementName = key.replace("Selector", "Element");
      this.appState.elements[elementName] = this.rootElement.querySelector(`#${value}`);
    }
  }
}
