export default class Topbar {
  topbarElement;

  constructor(stateService, domHandler) {
    this.appState = stateService.state;
    this.domHandler = domHandler;

    this.init();
  }

  init() {
    this.createTemplate();
    this.storeTopbar();
  }

  createTemplate() {
    this.topbarElement = document.createElement("div");
    this.topbarElement.setAttribute("id", this.appState.topbarSelector);
    this.domHandler.injectString(this.topbarElement, this.innerTemplate());
  }

  innerTemplate() {
    const sizeSection = `
  <div  id="${this.appState.selectors.progressbarSelector}">
  </div>
  <div class="fc-topbar-box">
		<div class="mx-1">Image</div>
		<div>W:</div>
		<div id="${this.appState.selectors.topbarWidthSelector}">0</div>
		<div class="ms-1">H:</div>
		<div id="${this.appState.selectors.topbarHeightSelector}">0</div>	
		<div class="ms-1">F:</div>
		<div id="${this.appState.selectors.topbarFormatSelector}"></div>	
	</div>
	`;

    const topbarTemplate = `
    ${sizeSection}
  `;

    return topbarTemplate;
  }

  //
  storeTopbar() {
    this.appState.topbarElement = this.topbarElement;
  }

  // injectString(host, template) {
  //   host.insertAdjacentHTML("afterbegin", template);
  // }
}
