export default class ResizeService {
  constructor(stateService) {
    this.appState = stateService.state;
  }

  handleResize(callback) {
    const resizeObserver = new ResizeObserver(() => {
      callback();
    });

    resizeObserver.observe(document.body);
  }
}
