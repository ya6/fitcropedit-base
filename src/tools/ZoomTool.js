export default class ZoomTool {

	constructor(originImage, domHandler) {
		this.originImage = originImage;
		this.domHandler = domHandler;
	}
	zoomIn() {
		this.originImage.params.zoom = this.originImage.params.zoom + 0.25;
		if (this.originImage.params.zoom + 0.25 === 10) {
			return;
		}
		this.originImage.calcInitCoords();
		this.originImage.drawImage();
		this.domHandler.displayZoomUI(this.originImage.params.zoom);
	}
	zoomOut() {
		if (this.originImage.params.zoom - 0.25 === 0) {
			return;
		}
		this.originImage.params.zoom = this.originImage.params.zoom - 0.25;
		this.originImage.calcInitCoords();
		this.originImage.drawImage();
		this.domHandler.displayZoomUI(this.originImage.params.zoom);
	}
}