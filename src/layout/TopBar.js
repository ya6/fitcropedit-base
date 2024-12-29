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
     <button class="button-with-icon ms-3 " type="button"  data-action="show-image-info" style="ma rgin-left: 1rem">  
        <div class="button-text">Image Info</div>  
      </button>
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
}
