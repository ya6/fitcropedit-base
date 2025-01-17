export default class RightSidebar {
  rightSidebarElement;
  histotyTemplate;

  constructor(stateService, domHandler) {
    this.appState = stateService.state;
    this.domHandler = domHandler;

    this.init();
  }

  init() {
    this.createTemplate();
    this.storeRightSidebar();
  }

  createTemplate() {
    this.rightSidebarElement = document.createElement("div");
    this.rightSidebarElement.setAttribute("id", this.appState.rightSidebarSelector);
    this.rightSidebarElement.style.minWidth = this.appState.template.rightSidebarWidth + "px";
    this.domHandler.injectString(this.rightSidebarElement, this.innerTemplate());
    this.injectHistorybar();
  }

  injectHistorybar() {
    const historyContainer = this.rightSidebarElement.querySelector(
      `#${this.appState.selectors.rightSidebarHistoryContainerSelector}`
    );
    this.domHandler.injectElement(historyContainer, this.appState.historybarElement);
  }

  formatSection() {
    const controls = `
<div>
  <div class="sub-title text-center">Output Format: 
    <span id = "${this.appState.selectors.rightSidebarOutpitFormatSelector}" class="fc-ms-1 bold"></span>
  </div>
    <div id=${this.appState.selectors.rightSidebarFormatContainerSelector} class="fc-flex">
      <button class="button-with-icon" type="button"  data-action="set-output-format-png" data-format="png">  
        <div class="button-text">  
          png
        </div>  
      </button>
      <button class="button-with-icon" type="button"  data-action="set-output-format-jpeg" data-format="jpeg">
        <div class="button-text">  
          jpeg
        </div>  
      </button>
      <button class="button-with-icon" type="button"  data-action="set-output-format-webp" data-format="webp"> 
        <div class="button-text">  
          webp
        </div> 
      </button>
    </div> 
</div>
`;

    const formatTemplate = `
<div>
 ${controls}
</div>  
`;
    return formatTemplate;
  }

  innerTemplate() {
    return `
  <div class="mb-2">
   
      <button data-action="save-image"
       class="control-button button-block" type="button" data-active="requires-image">
        <div class="fc-custom-icon fc-me-05">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 9.93 13">
            <path fill-rule="evenodd" d="m3.79 2.13 0.81-0.81v7.64c0 0.22 0.18 0.4 0.4 0.4s0.4-0.18 0.4-0.4v-7.59l0.76 0.76c0.15 0.15 0.41 0.15 0.56 0s0.15-0.41 0-0.56l-1.46-1.46c-0.08-0.08-0.18-0.12-0.28-0.12s-0.2 0.04-0.28 0.12l-1.46 1.46c-0.15 0.15-0.15 0.41 0 0.56s0.41 0.15 0.56 0zm-2.39 0.93h2.54v0.79h-2.54c-0.33 0-0.6 0.27-0.6 0.6v7.14c0 0.33 0.27 0.6 0.6 0.6h7.14c0.33 0 0.6-0.27 0.6-0.6v-7.14c0-0.33-0.27-0.6-0.6-0.6h-2.54v-0.79h2.54c0.77 0 1.4 0.63 1.4 1.4v7.14c0 0.77-0.63 1.4-1.4 1.4h-7.14c-0.77 0-1.4-0.63-1.4-1.4v-7.14c0-0.77 0.63-1.4 1.4-1.4z"/>
          </svg>
        </div>
        <span class="ms-05 fc-avoid-clicks">Save</span>
      </button>
     
      ${this.formatSection()}

	<button data-action="close-image"
  class="control-button button-block mt-2"   type="button">
		<div class="fc-custom-icon fc-me-05">
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 21.33 21.33">
				<path class="fil0" d="m3 0h15.34c1.65 0 3 1.35 3 3v15.34c0 1.65-1.35 3-3 3h-15.34c-1.65 0-3-1.35-3-3v-15.34c0-1.65 1.35-3 3-3zm0 1.7c-0.71 0-1.3 0.59-1.3 1.3v15.34c0 0.71 0.59 1.3 1.3 1.3h15.34c0.71 0 1.3-0.59 1.3-1.3v-15.34c0-0.71-0.59-1.3-1.3-1.3h-15.34zm11.63 11.73-2.76-2.76 2.76-2.76c0.33-0.33 0.33-0.87 0-1.2s-0.87-0.33-1.2 0l-2.76 2.76-2.76-2.76c-0.33-0.33-0.87-0.33-1.2 0s-0.33 0.87 0 1.2l2.76 2.76-2.76 2.76c-0.33 0.33-0.33 0.87 0 1.2s0.87 0.33 1.2 0l2.76-2.76 2.76 2.76c0.33 0.33 0.87 0.33 1.2 0s0.33-0.87 0-1.2z"/>
			</svg>
		</div>
    <span class="ms-05 fc-avoid-clicks">Close</span>
  </button>

</div>

<div class="delimeter"></div>

<div id="${this.appState.selectors.rightSidebarHistoryContainerSelector}">
  <!-- Historybar -->
</div>
<div class="delimeter"></div>
<div id="${this.appState.selectors.rightSidebarToolsContainerSelector}"></div>
	`;
  }

  //
  storeRightSidebar() {
    this.appState.rightSidebarElement = this.rightSidebarElement;
  }

}
