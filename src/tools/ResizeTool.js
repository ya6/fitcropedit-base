export default class ResizeTool {
  inputWidthElement;
  inputHeightElement;
  ratioWH;
  min;
  max;
  newHeight;
  newWidth;

  constructor(stateService, uiControls, originImage, transformCanvas) {
    this.stateService = stateService;
    this.appState = stateService.state;
    this.min = this.appState.data.resize.min;
    this.max = this.appState.data.resize.max;
    this.uiControls = uiControls;
    this.originImage = originImage;
    this.transformCanvas = transformCanvas;
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
       Restore
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

  activateTemplate() {
    const { width, height } = this.appState.data.baseImage;
    this.ratioWH = this.appState.data.baseImage.ratioWH;
    const toolsContainer = this.appState.elements.rightSidebarToolsContainerElement;
    // get elements
    this.inputWidthElement = toolsContainer.querySelector('[data-action="resize-width-input"]');
    this.inputHeightElement = toolsContainer.querySelector('[data-action="resize-height-input"]');
    const saveButtonElement = toolsContainer.querySelector('[data-action="tools-resize-apply-button"]');
    const cancelButtonElement = toolsContainer.querySelector('[data-action="tools-resize-cancel-button"]');

    // display curren dimentions
    this.uiControls.setInputValue(this.inputWidthElement, width);
    this.uiControls.setInputValue(this.inputHeightElement, height);

    // add event dispatcher
    this.inputWidthElement.addEventListener("input", this.changeWidthHandler);
    this.inputHeightElement.addEventListener("input", this.changeHeightHandler);

    saveButtonElement.addEventListener("click", this.applyResize);
    cancelButtonElement.addEventListener("click", this.resetToOrigin);
  }

  applyResize = () => {
    const { width, height } = this.appState.data.baseImage;
    this.newWidth = Number(this.inputWidthElement.value);
    this.newHeight = Number(this.inputHeightElement.value);
    if (!this.newWidth || !this.newHeight) {
      this.resetSize();
      return;
    }
    if (this.newWidth === width && this.newHeight === height) {
      return;
    }

    this.transformCanvas.canvas.width = this.newWidth;
    this.transformCanvas.canvas.height = this.newHeight;

    this.transformCanvas.ctx.drawImage(this.originImage.initialImage, 0, 0, this.newWidth, this.newHeight);

    this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
    this.transformCanvas.clear();

    // collect params
    this.originImage.collectParams();
    //save to state
    this.stateService.saveBaseImageParams({ width: this.newWidth, height: this.newHeight });
  };

  resetToOrigin = () => {
    this.originImage.resetToOrigin();

    this.originImage.collectParams();

    this.stateService.saveBaseImageParams({
      width: this.originImage.initialImage.width,
      height: this.originImage.initialImage.height,
    });

    this.resetSize();
  };

  resetSize = () => {
    const { width, height } = this.appState.data.baseImage;
    this.newWidth = width;
    this.newHeight = height;
    this.uiControls.setInputValue(this.inputWidthElement, width);
    this.uiControls.setInputValue(this.inputHeightElement, height);
  };

  changeWidthHandler = () => {
    this.newWidth = Math.abs(Number(this.inputWidthElement.value));
    if (!this.newWidth) {
      return;
    }
    if (this.newWidth > this.max) {
      this.newWidth = this.max;
    }
    this.newHeight = this.newWidth / this.ratioWH;
    if (this.newHeight > this.max) {
      this.newHeight = this.max;
      this.newWidth = this.newHeight * this.ratioWH;
    }

    this.uiControls.setInputValue(this.inputWidthElement, Math.round(this.newWidth));
    this.uiControls.setInputValue(this.inputHeightElement, Math.round(this.newHeight));
  };

  changeHeightHandler = () => {
    this.newHeight = Math.abs(Number(this.inputHeightElement.value));
    if (!this.newHeight) {
      return;
    }
    if (this.newHeight > this.max) {
      this.newHeight = this.max;
    }
    this.newWidth = this.newHeight * this.ratioWH;
    if (this.newWidth > this.max) {
      this.newWidth = this.max;
      this.newHeight = this.newWidth / this.ratioWH;
    }

    this.uiControls.setInputValue(this.inputWidthElement, Math.round(this.newWidth));
    this.uiControls.setInputValue(this.inputHeightElement, Math.round(this.newHeight));
  };
}
