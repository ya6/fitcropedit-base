export default class NotificationService {
  rootElement;
  notifyElement;

  constructor(stateService, uiControls) {
    this.appState = stateService.state;
    this.uiControls = uiControls;
    this.rootElement = this.appState.rootElement;

    this.init();
  }

  init() {
    this.createTemplate();
  }

  createTemplate() {
    this.notifyElement = document.createElement("div");
    this.notifyElement.classList.add("fc-notification");
  }

  notify(message, time = 5000) {
    this.notifyElement.innerText = message;
    this.uiControls.injectElement(this.rootElement, this.notifyElement);

    setTimeout(() => {
      this.uiControls.removeElement(this.rootElement, this.notifyElement);
    }, time);
  }
}
