export default class UIControls {
  constructor(stateService) {
    this.appState = stateService.state;
  }
  displayOutputFormatUI() {
    this.appState.elements.rightSidebarOutpitFormatElement.innerText =
      this.appState.data.baseImage.outputFormat;
  }

  diplayDimentionInUI() {
    const { width, height, format } = this.appState.data.baseImage;
    this.appState.elements.topbarWidthElement.innerText = width;
    this.appState.elements.topbarHeightElement.innerText = height;
    this.appState.elements.topbarFormatElement.innerText = format;
  }

  displayExtentionUI() {
    const formatButtons = this.appState.elements.rightSidebarFormatBoxElement.children;
    for (const button of formatButtons) {
      button.classList.remove("fc-active");

      if (this.appState.data.baseImage.outputFormat === button.dataset.format) {
        button.classList.add("fc-active");
      }
    }
  }
}
