export default class MirrorTool {
	constructor(originImage, transformCanvas, history, progressbarService) {
		this.originImage = originImage;
		this.transformCanvas = transformCanvas;
		this.history = history;
		this.progressbarService = progressbarService;
	}
	applayHorizontalFlip() {
		this.prepareSize();
		this.transformCanvas.ctx.translate(this.transformCanvas.canvas.width, 0);
		this.transformCanvas.ctx.scale(-1, 1);
		this.transformCanvas.ctx.drawImage(this.originImage.baseImage, 0, 0);
		this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
		return true;
	}
	applyVerticalFlip() {
		this.prepareSize();
		this.transformCanvas.ctx.translate(0, this.transformCanvas.canvas.height);
		this.transformCanvas.ctx.scale(1, -1);
		this.transformCanvas.ctx.drawImage(this.originImage.baseImage, 0, 0);
		this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
		return true;
	}

	prepareSize() {
		this.transformCanvas.canvas.width = this.originImage.baseImage.width;
		this.transformCanvas.canvas.height = this.originImage.baseImage.height;
	}

	async verticalFlip() {
		const result = await this.progressbarService.run(this.applyVerticalFlip.bind(this));
		if (result) {
			this.history.add({
				title: `Flip Vertically`,
				imageSrc: null,
				imageData: null,
				action: "vertical flip",
			});
		}
	}

	async horizontalFlip() {
		const result = await this.progressbarService.run(this.applayHorizontalFlip.bind(this));
		if (result) {
			this.history.add({
				title: `Flip Horizontally`,
				imageSrc: null,
				imageData: null,
				action: "horizontal flip",
			});
		}
	}
}