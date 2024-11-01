export default class LeftSidebar {
  leftSidebar;
  leftSidebarItems;

  constructor(container, stateManager) {
    this.container = container;
    this.appState = stateManager.state;
    this.init();
  }

  init() {
    this.createTemplate();
    this.setLocation();
    this.injectElement(this.container, this.leftSidebar);
    this.getAllControls();
    this.dispatch();
  }

  setLocation() {
    this.leftSidebar.style.top = `${this.appState.template.navbarHeight}px`;
    this.leftSidebar.style.width = `${this.appState.template.leftSidebarWidth}px`
    this.leftSidebar.style.height = `${this.container.clientHeight-this.appState.template.navbarHeight }px`
  }

  getAllControls() {
    this.leftSidebarItems = this.leftSidebar.querySelectorAll('[data-role="leftsidebar-item"]');
  }

  dispatch() {
    this.leftSidebar.addEventListener("click", (e) => {});
  }

  createTemplate() {
    this.leftSidebar = document.createElement("div");
    this.leftSidebar.setAttribute("id", "fc-left-sidebar");
    this.injectString(this.leftSidebar, this.innerTemplate());
    return this.leftSidebar;
  }

  innerTemplate() {
    return `
	<div data-role="leftsidebar-item">Left sidebar</div>
	`;
  }

  injectString(host, template) {
    host.insertAdjacentHTML("afterbegin", template);
  }

  injectElement(host, element) {
    host.append(element);
  }
}
