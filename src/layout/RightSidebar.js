export default class Rightsudebar {
  rightSidebar;

  constructor(container, stateManager) {
    this.container = container;
    this.appState = stateManager.state;
    this.init();
  }
}
