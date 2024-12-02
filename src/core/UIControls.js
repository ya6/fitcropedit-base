export default class UIControls {
  leftSidebarbuttons;

  constructor(stateService) {
    this.appState = stateService.state;

    this.init();
  }

  init() {
    this.getLeftSidebarButtons();
  }

  // leftsidebar ->
  getLeftSidebarButtons() {
    const leftSideBarElement = this.appState.leftSidebarElement;
    this.leftSidebarbuttons = leftSideBarElement.querySelectorAll('[data-anchor="left-sidebar-item"]');
  }

  resetLeftSidebarMenu() {
    this.removeActiveClass(this.leftSidebarbuttons);
  }
  // leftsidebar <-

  // tools ->
  displayTool(template) {
    this.clearElement(this.appState.elements.rightSidebarToolsContainerElement);
    this.injectString(this.appState.elements.rightSidebarToolsContainerElement, template);
  }

  hideTool() {
    this.clearElement(this.appState.elements.rightSidebarToolsContainerElement);
  }
  // tools <-

  displayOutputFormatUI() {
    this.appState.elements.rightSidebarOutpitFormatElement.innerText =
      this.appState.data.baseImage.outputFormat;
  }

  // appbar ->
  diplayDimentionInUI() {
    const { width, height, format } = this.appState.data.baseImage; // ? origins
    this.appState.elements.topbarWidthElement.innerText = width;
    this.appState.elements.topbarHeightElement.innerText = height;
    this.appState.elements.topbarFormatElement.innerText = format;
  }
  // appbar <-

  // rightSidebar ->
  displayExtentionUI() {
    const formatButtons = this.appState.elements.rightSidebarFormatBoxElement.children;
    for (const button of formatButtons) {
      button.classList.remove("fc-active");

      if (this.appState.data.baseImage.outputFormat === button.dataset.format) {
        button.classList.add("fc-active");
      }
    }
  }
  // rightSidebar <-

  injectElement(host, element) {
    host.appendChild(element);
  }

  removeElement(host, element) {
    host.removeChild(element);
  }

  clearElement(element) {
    element.innerHTML = "";
  }

  injectString(host, template) {
    host.insertAdjacentHTML("afterbegin", template);
  }

  removeClass(elements, className) {
    if (this.isIterable(elements)) {
      elements.forEach((el) => el.classList.remove(className));
    } else {
      elements.classList.remove(className);
    }
  }

  removeActiveClass(elements, className = "fc-active") {
    this.removeClass(elements, className);
  }

  setInputValue(element, value) {
    element.value = value;
  }

  toggleActiveClass(element, className = "fc-active") {
    element.classList.toggle(className);
    return element.classList.contains(className);
  }

  isIterable(pretender) {
    return typeof pretender[Symbol.iterator] === "function";
  }
}
