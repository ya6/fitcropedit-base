export default class InfoService {
	constructor(stateService, domHandler, closeIconButton) {
		this.appState = stateService.state;
		this.domHandler = domHandler;
		this.closeIconButton = closeIconButton; // ? here
	}

	imageInfoTemplate() {
		const { baseImage } = this.appState.data;
		return `<div id="${this.appState.selectors.rightSidebarImageInfoSelector}">
		 <h3 class="no-mp">Parameters</h3> 
     	 <div>File: <span data-target="ingo-file">${baseImage.fullName}</span></div>
     	 <div>Size: <span data-target="info-size">${baseImage.size} b</span></div>
     	 <div>Dimentions: <span data-target="info-dimentions">${baseImage.width}x${baseImage.height}</span></div>
     	 <div>Points: <span data-target="info-points">${baseImage.width * baseImage.width}</span></div>
     	 <div>Alpha 0: <span data-target="info-alpha0">${baseImage.alpha0}</span></div>
     	 <div>Color: <span data-target="info-color">${baseImage.color}</span></div>
     	 <div>Black: <span data-target="info-black">${baseImage.black}</span></div>
     	 <div>White: <span data-target="info-white">${baseImage.white}</span></div>
     	 <div>Gray: <span data-target="info-gray">${baseImage.gray}</span></div>
	  </div>
	`
	}

	displayInRightsidbar(template) {
		this.domHandler.clearToolsContainer();
		//diplay close button
		this.domHandler.displayInRightsidebar(this.closeIconButton.template());
		this.domHandler.displayInRightsidebar(template)
	}

	showImageInfo() {
		this.displayInRightsidbar(this.imageInfoTemplate());
	}

}