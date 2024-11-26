export default class UIControls {
  constructor(stateService, toolsItems) {
    this.appState = stateService.state;
    this.toolsItems = toolsItems;
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

  injectElement(host, element) {
    console.log(element);

    host.appendChild(element);
  }

  clearElement(element) {
    element.innerHTML = "";
  }

  injectString(host, template) {
    host.insertAdjacentHTML("afterbegin", template);
  }

  // ? activeClass
  manageResolutuonToolUI(buttonElement, activeClass = "fc-active") {
    this.toggleActiveClass(buttonElement, activeClass);

    if (buttonElement.classList.contains(activeClass)) {
      this.displayResolutionTool();
    } else {
      this.hideResolutionTool();
    }
  }

  displayResolutionTool() {
    this.clearElement(this.appState.elements.rightSidebarToolsContainerElement);
    this.injectString(
      this.appState.elements.rightSidebarToolsContainerElement,
      this.toolsItems.ResolutionTemplate()
    );
  }

  hideResolutionTool() {
    this.clearElement(this.appState.elements.rightSidebarToolsContainerElement);
  }

  toggleActiveClass(element, className) {
    element.classList.toggle(className);
  }
}
