export default class TemplateService {
  constructor(container, stateService) {
    this.container = container;
    this.stateService = stateService;
	this.init();
  }

init() {
	this.getElements()
}

  getElements() {
    const entries = Object.entries(this.stateService.state.selectors);

    for (const [key, value] of entries) {
      const elementName = key.replace("Selector", "Element");
      this.stateService.state.elements[elementName] = this.container.querySelector(`#${value}`);
    }
  }
}
