export default class ResizeTool {
  inputWidthElement;
  inputHeightElement;
  ratioWH;
  min;
  max;

  constructor(stateService, uiControls) {
    this.appState = stateService.state;
    this.min = this.appState.data.resize.min;
    this.max = this.appState.data.resize.max;

    console.log(this.max);

    this.uiControls = uiControls;
  }

  template() {
    const size = `
    <div data-action="resize-panel">
      <div class="sub-title">Size
        <span class="ms-05"
        </span>
      </div>
      <div class="flex my-3">
        <label>W:</label>
        <input class="rounded-sub-input" data-action="resize-width-input" type="text" placeholder="width">
        <label class="ms-1">H:</label>
        <input class="rounded-sub-input" data-action="resize-height-input" type="text" placeholder="height">
        <span> px</span>
      </div>
    </div>
    `;

    const applyButtons = `
    <div class="flex mt-1 mb-3">
      <button type="button" class="control-button" data-action="tools-resize-apply-button">
        <div class="custom-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
          </svg>
        </div>     
      Apply
      </button>
  
      <button type="button" class="control-button ms-1" data-action="tools-resize-cancel-button">
        <div class="custom-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </div>
       Cancel
       </button>  
    </div>
    `;

    return `
	 <h3 class="no-mp">Resize</h3>
    ${size}
    ${applyButtons}
	</div>
	`;
  }

  manage(buttonElement) {
    const isActive = this.uiControls.toggleActiveClass(buttonElement);

    if (isActive) {
      this.uiControls.displayTool(this.template());
      this.activateTemplate();
    } else {
      this.uiControls.hideTool();
    }
  }

  activateTemplate() {
    const { width, height } = this.appState.data.baseImage;
    this.ratioWH = this.appState.data.baseImage.ratioWH;
    const toolsContainer = this.appState.elements.rightSidebarToolsContainerElement;
    // get elements
    // const resizePanelElement = toolsContainer.querySelector('[data-action="resize-panel"]');
    this.inputWidthElement = toolsContainer.querySelector('[data-action="resize-width-input"]');
    this.inputHeightElement = toolsContainer.querySelector('[data-action="resize-height-input"]');

    // display curren dimentions
    this.uiControls.setInputValue(this.inputWidthElement, width);
    this.uiControls.setInputValue(this.inputHeightElement, height);

    // add event dispatcher
    this.inputWidthElement.addEventListener("input", this.changeWidthHandler);
    this.inputHeightElement.addEventListener("input", this.changeHeightHandler);
  }

  changeWidthHandler = () => {
    let newWidth = Math.abs(Number(this.inputWidthElement.value));
    if (!newWidth) {
      return;
    }
    if (newWidth > this.max) {
      newWidth = this.max;
    }
    let newHeight = newWidth / this.ratioWH;
    if (newHeight > this.max) {
      newHeight = this.max;
      newWidth = newHeight * this.ratioWH;
    }

    this.uiControls.setInputValue(this.inputWidthElement, Math.round(newWidth));
    this.uiControls.setInputValue(this.inputHeightElement, Math.round(newHeight));
  };

  changeHeightHandler = () => {
    let newHeight = Math.abs(Number(this.inputHeightElement.value));
    if (!newHeight) {
      return;
    }
    if (newHeight > this.max) {
      newHeight = this.max;
    }
    let newWidth = newHeight * this.ratioWH;
    if (newWidth > this.max) {
      newWidth = this.max;
      newHeight = newWidth / this.ratioWH;
    }

    this.uiControls.setInputValue(this.inputWidthElement, Math.round(newWidth));
    this.uiControls.setInputValue(this.inputHeightElement, Math.round(newHeight));
  };
}
