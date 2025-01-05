export default class ResizeTool {
  inputWidthElement;
  inputHeightElement;
  ratioWH;
  min;
  max;
  newHeight;
  newWidth;

  constructor(stateService, history, domHandler, originImage, transformCanvas, progressbarService) {
    this.stateService = stateService;
    this.history = history;
    this.appState = stateService.state;
    this.min = this.appState.data.resize.min;
    this.max = this.appState.data.resize.max;
    this.domHandler = domHandler;
    this.originImage = originImage;
    this.transformCanvas = transformCanvas;
    this.progressbarService = progressbarService;
  }

  template() {
    const size = `
    <div data-action="resize-panel">
      <div class="sub-title">Size
      </div>
      <div class="fc-flex my-3">
        <label>W:</label>
        <input class="fc-rounded-sub-input" data-action="resize-width-input" type="text" placeholder="width">
        <label class="fc-ms-1">H:</label>
        <input class="fc-rounded-sub-input" data-action="resize-height-input" type="text" placeholder="height">
        <span> px</span>
      </div>
    </div>
    `;

    const applyButtons = `
    <div class="fc-flex mt-1 mb-3">
      <button type="button" class="control-button" data-action="tools-resize-apply-button">
        <div class="fc-custom-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
          </svg>
        </div>     
      Apply
      </button>
  
      <button type="button" class="control-button fc-ms-1" data-action="tools-resize-cancel-button">
        <div class="fc-custom-icon">
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
    this.domHandler.setInputValue(this.inputWidthElement, width);
    this.domHandler.setInputValue(this.inputHeightElement, height);

    // add event dispatcher
    this.inputWidthElement.addEventListener("input", this.changeWidthHandler);
    this.inputHeightElement.addEventListener("input", this.changeHeightHandler);

    saveButtonElement.addEventListener("click", async () => {
      const result = await this.progressbarService.run(this.applyResize.bind(this));

      if (result) {
        this.history.add({
          title: `Resize:${result.width}x${result.height}px`,
          imageSrc: null,
          imageData: { width: result.width, height: result.height },
          action: "resize",
        });
      }
    });

    cancelButtonElement.addEventListener("click", async () => {

      if (this.history.last().action !== 'resize') {
        return
      }

      const result = await this.progressbarService.run(this.resetToPrevious.bind(this));
      if (result) {
        this.history.add({
          title: "Resize: Restored",
          imageSrc: null,
          imageData: null, // ? stored in originImage
          action: "resize restored",
        });
      }
    });
  }

  applyResize = () => {
    const { width, height } = this.appState.data.baseImage;
    this.newWidth = Number(this.inputWidthElement.value);
    this.newHeight = Number(this.inputHeightElement.value);
    if (!this.newWidth || !this.newHeight) {
      this.resetSize();
      return null;
    }
    if (this.newWidth === width && this.newHeight === height) {
      return null;
    }
    // need resert  secondImage!!!
    this.originImage.secondImage.src = this.originImage.baseImage.src

    this.transformCanvas.canvas.width = this.newWidth;
    this.transformCanvas.canvas.height = this.newHeight;

    this.transformCanvas.ctx.drawImage(this.originImage.baseImage, 0, 0, this.newWidth, this.newHeight);

    this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
    this.transformCanvas.clear();

    // collect params
    this.originImage.collectParams();
    //save to state
    this.stateService.saveBaseImageParams({ width: this.newWidth, height: this.newHeight });
    return { width: this.newWidth, height: this.newHeight };
  };

  __applyResize = () => {
    const { width, height } = this.appState.data.baseImage;
    this.newWidth = Number(this.inputWidthElement.value);
    this.newHeight = Number(this.inputHeightElement.value);
    if (!this.newWidth || !this.newHeight) {
      this.resetSize();
      return null;
    }
    if (this.newWidth === width && this.newHeight === height) {
      return null;
    }
    // need resert  secondImage!!!
    this.originImage.secondImage.src = this.originImage.baseImage.src

    this.transformCanvas.canvas.width = this.newWidth;
    this.transformCanvas.canvas.height = this.newHeight;

    this.transformCanvas.ctx.drawImage(this.originImage.initialImage, 0, 0, this.newWidth, this.newHeight);

    this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
    this.transformCanvas.clear();

    // collect params
    this.originImage.collectParams();
    //save to state
    this.stateService.saveBaseImageParams({ width: this.newWidth, height: this.newHeight });
    return { width: this.newWidth, height: this.newHeight };
  };

  resetToPrevious = () => {

    const { width, height } = this.originImage.secondImage;
    this.newWidth = Number(this.inputWidthElement.value);
    this.newHeight = Number(this.inputHeightElement.value);

    if (this.newWidth === width && this.newHeight === height) {
      return null;
    }

    this.originImage.restorePreviosImage();

    this.domHandler.setInputValue(this.inputWidthElement, width);
    this.domHandler.setInputValue(this.inputHeightElement, height);
    return { width, height };
  };

  __resetToOrigin = () => {
    const { width, height } = this.originImage.initialImage;
    this.newWidth = Number(this.inputWidthElement.value);
    this.newHeight = Number(this.inputHeightElement.value);

    if (this.newWidth === width && this.newHeight === height) {
      return null;
    }

    this.originImage.restoreOriginImage();

    this.domHandler.setInputValue(this.inputWidthElement, width);
    this.domHandler.setInputValue(this.inputHeightElement, height);
    return { width, height };
  };

  resetSize = () => {
    const { width, height } = this.originImage.baseImage;
    this.newWidth = width;
    this.newHeight = height;
    this.domHandler.setInputValue(this.inputWidthElement, width);
    this.domHandler.setInputValue(this.inputHeightElement, height);
  };

  __resetToOriginSize = () => {
    const { width, height } = this.appState.data.originImage;
    this.newWidth = width;
    this.newHeight = height;
    this.domHandler.setInputValue(this.inputWidthElement, width);
    this.domHandler.setInputValue(this.inputHeightElement, height);
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

    this.domHandler.setInputValue(this.inputWidthElement, Math.round(this.newWidth));
    this.domHandler.setInputValue(this.inputHeightElement, Math.round(this.newHeight));
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

    this.domHandler.setInputValue(this.inputWidthElement, Math.round(this.newWidth));
    this.domHandler.setInputValue(this.inputHeightElement, Math.round(this.newHeight));
  };
}
