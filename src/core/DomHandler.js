export default class DomHandler {
  leftSidebarbuttons;

  constructor(stateService) {
    this.appState = stateService.state;
  }

  // leftsidebar ->
  resetLeftSidebarMenu() {
    const leftSideBarElement = this.appState.leftSidebarElement;
    const leftSidebarbuttons = leftSideBarElement.querySelectorAll('[data-anchor="left-sidebar-item"]');
    this.removeActiveClass(leftSidebarbuttons);
  }
  // leftsidebar <-

  // tools ->
  displayInRightsidebar(template) {
    this.injectString(this.appState.elements.rightSidebarToolsContainerElement, template);
  }

  clearToolsContainer() {
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
    const formatButtons = this.appState.elements.rightSidebarFormatContainerElement.children;
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
    host.insertAdjacentHTML("beforeend", template);
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
