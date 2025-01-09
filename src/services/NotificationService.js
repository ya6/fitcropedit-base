export default class NotificationService {
  rootElement;
  notifyElement;
  timer;

  __notifications = {
    "not-implemented": "Not implemented yet"
  }


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

  notify(message) {
    if (this.timer) {
      this.removeNotification();
    }
    this.addNotification(message);
  }

  addNotification(message, time = 2000) {
    this.notifyElement.innerText = message;
    this.domHandler.injectElement(this.rootElement, this.notifyElement);
    this.timer = setTimeout(() => {
      this.removeNotification();
    }, time);
  }

  removeNotification() {
    this.notifyElement.innerText = '';
    if (this.rootElement.contains(this.notifyElement)) {
      this.domHandler.removeElement(this.rootElement, this.notifyElement);
    }
    clearTimeout(this.timer);
    this.timer = null;
  }

}
