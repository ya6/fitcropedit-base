export default class ResizeService {
  wraper;

  constructor(stateService) {
    this.appState = stateService.state;
    this.wraper = this.appState.mainCanvasWraperElement;
  }

  handleResize(callback) {
    const resizeObserver = new ResizeObserver(() => {
      callback();
    });

    // resizeObserver.observe(document.body);
    resizeObserver.observe(this.wraper);
  }
}
