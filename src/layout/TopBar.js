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
  <div class="fc-topbar-container">
  	<div class="fc-topbar-box">
	  <div class="mx-1">Image</div>
	  <div>W:</div>
	  <div id="${this.appState.selectors.topbarWidthSelector}">0</div>
	  <div class="fc-ms-1">H:</div>
	  <div id="${this.appState.selectors.topbarHeightSelector}">0</div>	
	  <div class="fc-ms-1">F:</div>
	  <div id="${this.appState.selectors.topbarFormatSelector}"></div>
	</div>
	  
    <!--Flip -->
	<div class="fc-topbar-box">
		<div class="fc-sq-button" data-action="horizontal-flip">
			<div class="fc-custom-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-symmetry-vertical" viewBox="0 0 16 16">
					<path d="M7 2.5a.5.5 0 0 0-.939-.24l-6 11A.5.5 0 0 0 .5 14h6a.5.5 0 0 0 .5-.5zm2.376-.484a.5.5 0 0 1 .563.245l6 11A.5.5 0 0 1 15.5 14h-6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .376-.484M10 4.46V13h4.658z"/>
				</svg>
			</div>   
		</div>

		<div class="fc-sq-button" data-action="vertical-flip">
			<div class="fc-custom-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-symmetry-horizontal" viewBox="0 0 16 16">
					<path d="M13.5 7a.5.5 0 0 0 .24-.939l-11-6A.5.5 0 0 0 2 .5v6a.5.5 0 0 0 .5.5zm.485 2.376a.5.5 0 0 1-.246.563l-11 6A.5.5 0 0 1 2 15.5v-6a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .485.376M11.539 10H3v4.658z"/>
				</svg>
			</div>
		</div>
	</div>
    
    <!--Rotate -->
 	<div class="fc-topbar-box">
    	<div class="fc-sq-button" data-action="rotate-left">
			<div class="fc-custom-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
				<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
			</svg>
			</div>
		</div>

		<div class="">
			<input type="text" id="${this.appState.selectors.topbarAngleSelector}" class="fc-rounded-input-type-2" value="0">
		</div>

		<div class="fc-sq-button" data-action="rotate-right">
			<div class="fc-custom-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
					<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
				</svg>
			</div>
		</div>
		
    </div>
	
	<!--Zoom-->
	<div class="fc-topbar-box">

		<div>Z: </div>
			<div data-action="zoom-in" class="fc-sq-button">
				<div class="fc-custom-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
					</svg>
				</div>
			</div>

			<div  id="${this.appState.selectors.topbarZoomSelector}" class="fc-rounded-box">1</div>

			<div data-action="zoom-out" class="fc-sq-button">
				<div class="fc-custom-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
					</svg>
				</div>
			</div>
		</div>


     <button class="button-with-icon" type="button"  data-action="show-image-info">  
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