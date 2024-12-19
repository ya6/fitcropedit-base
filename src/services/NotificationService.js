export default class NotificationService {
  rootElement;
  notifyElement;

  constructor(stateService, domHandler) {
    this.appState = stateService.state;
    this.domHandler = domHandler;
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
    this.domHandler.injectElement(this.rootElement, this.notifyElement);

    setTimeout(() => {
      this.domHandler.removeElement(this.rootElement, this.notifyElement);
    }, time);
  }
}
