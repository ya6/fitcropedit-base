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
		<div class="fc-ms-1">H:</div>
		<div id="${this.appState.selectors.topbarHeightSelector}">0</div>	
		<div class="fc-ms-1">F:</div>
		<div id="${this.appState.selectors.topbarFormatSelector}"></div>

    <div class="fc-ms-3 button-with-icon" data-action="horizontal-flip">
			<div class="custom-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-symmetry-vertical" viewBox="0 0 16 16">
				<path d="M7 2.5a.5.5 0 0 0-.939-.24l-6 11A.5.5 0 0 0 .5 14h6a.5.5 0 0 0 .5-.5zm2.376-.484a.5.5 0 0 1 .563.245l6 11A.5.5 0 0 1 15.5 14h-6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .376-.484M10 4.46V13h4.658z"/>
				</svg>
			</div>   
		</div>

		<div class="button-with-icon" data-action="vertical-flip">
			<div class="custom-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-symmetry-horizontal" viewBox="0 0 16 16">
					<path d="M13.5 7a.5.5 0 0 0 .24-.939l-11-6A.5.5 0 0 0 2 .5v6a.5.5 0 0 0 .5.5zm.485 2.376a.5.5 0 0 1-.246.563l-11 6A.5.5 0 0 1 2 15.5v-6a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .485.376M11.539 10H3v4.658z"/>
				</svg>
			</div>
		</div>


     <button class="button-with-icon fc-ms-3" type="button"  data-action="show-image-info" style="ma rgin-left: 1rem">  
        <div class="button-text">Info</div>  
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