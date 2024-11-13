export default class ResizeService {
  rootElement;

  constructor(stateService) {
    this.appState = stateService.state;
    this.rootElement = this.appState.rootElement;
  }

  handleResize(callback) {
    const resizeObserver = new ResizeObserver(() => {
      callback();
    });

    resizeObserver.observe(document.body);
  }
}
