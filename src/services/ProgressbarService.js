export default class ProgressbarService {
  progressbarElement;

  constructor(stateService) {
    this.appState = stateService.state;
    this.progressbarElement = this.appState.elements.progressbarElement;
  }

  init() {
    this.progressbarElement.style.transition = "none";
    this.progressbarElement.style.width = "20%";
  }

  start() {
    this.progressbarElement.style.transition = "width 0.3s";
    this.progressbarElement.style.width = "60%";
  }

  stop() {
    this.progressbarElement.style.width = "100%";
  }

  reset() {
    this.progressbarElement.style.transition = "none";
    this.progressbarElement.style.width = "0%";
  }

  async run(operation) {
    this.init();
    await new Promise((resolve) =>
      setTimeout(() => {
        this.start.call(this);
        resolve();
      }, 0)
    );
    // const result = await new Promise((resolve) =>
    //   setTimeout(() => {
    //     const result = operation();
    //     resolve(result);
    //   }, 0)
    // );
    const result = operation();
    
    await new Promise((resolve) =>
      setTimeout(() => {
        this.stop.call(this);
        resolve();
      }, 0)
    );

    await new Promise((resolve) =>
      setTimeout(() => {
        this.reset.call(this);
        resolve();
      }, 1000)
    );

    return result;
  }
}
