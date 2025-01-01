export default class RotateTool {

	angle;
	constructor(stateService, originImage, transformCanvas, domHandler, history, progressbarService) {
		this.appState = stateService.state;
		this.originImage = originImage;
		this.transformCanvas = transformCanvas;
		this.domHandler = domHandler;
		this.history = history;
		this.progressbarService = progressbarService;
	}

	getAngle() {
		const angle = this.appState.elements.topbarAngleElement.value
		const angleNum = Math.abs(Number(angle));
		if (isNaN(angleNum) || angleNum < -360 || angleNum > 360) {
			return;
		}
		return angleNum;
	}

	async rotateLeft() {
		const result = await this.progressbarService.run(this._rotateLeft.bind(this));

		this.history.add({
			title: `Rotated ${this.angle} deg`,
			imageSrc: null,
			imageData: null,
			action: "rotated",
		});

	}

	async rotateRight() {
		const result = await this.progressbarService.run(this._rotateRight.bind(this));

		this.history.add({
			title: `Rotated ${this.angle} deg`,
			imageSrc: null,
			imageData: null,
			action: "rotated",
		});

	}

	_rotateLeft() {
		this.angle = -this.getAngle();
		if (this.angle === -90) {
			this.rotateLeft90();
		} else {
			this.basisRotate(this.angle);
		}
	}

	_rotateRight() {
		this.angle = this.getAngle();

		if (this.angle === 90) {
			this.rotateRight90();
		} else {
			this.basisRotate(this.angle);
		}
	}

	basisRotate(angleDeg) {
		this.setAngleUI(angleDeg);

		if (this.originImage.secondImage.width === 0 || this.history.last().action !== 'rotated' ) {
			this.originImage.secondImage.src = this.originImage.baseImage.src;
		}


		const angleRad = (angleDeg * Math.PI) / 180;

		this.setBiggerSize(angleRad);

		this.transformCanvas.ctx.translate(this.transformCanvas.canvas.width / 2, this.transformCanvas.canvas.height / 2);
		this.transformCanvas.ctx.rotate(angleRad);


		this.transformCanvas.ctx.drawImage(
			this.originImage.secondImage,
			(-1 * this.transformCanvas.canvas.width) / 2 + (this.transformCanvas.canvas.width - this.originImage.secondImage.width) / 2,
			(-1 * this.transformCanvas.canvas.height) / 2 + (this.transformCanvas.canvas.height - this.originImage.secondImage.height) / 2,
			this.originImage.secondImage.width,
			this.originImage.secondImage.height
		);

		this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();

		this.transformCanvas.ctx.reset();
	}

	rotateLeft90() {
		this.setTransformSize();
		this.transformCanvas.ctx.translate(this.transformCanvas.canvas.width / 2, this.transformCanvas.canvas.height / 2);
		this.transformCanvas.ctx.rotate((-1 * Math.PI) / 2);

		this.transformCanvas.ctx.drawImage(this.originImage.baseImage, (-1 * this.originImage.baseImage.width) / 2, (-1 * this.originImage.baseImage.height) / 2);
		this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
	}

	rotateRight90() {
		this.setTransformSize();
		this.transformCanvas.ctx.translate(this.transformCanvas.canvas.width / 2, this.transformCanvas.canvas.height / 2);
		this.transformCanvas.ctx.rotate((1 * Math.PI) / 2);

		this.transformCanvas.ctx.drawImage(this.originImage.baseImage, (-1 * this.originImage.baseImage.width) / 2, (-1 * this.originImage.baseImage.height) / 2);
		this.originImage.baseImage.src = this.transformCanvas.canvas.toDataURL();
	}

	setTransformSize() {
		this.transformCanvas.canvas.width = this.originImage.baseImage.height;
		this.transformCanvas.canvas.height = this.originImage.baseImage.width;
	}

	setBiggerSize(angle) {
		const angleAbs = Math.abs(angle);
		const newWidth = this.originImage.secondImage.width * Math.cos(angleAbs) + this.originImage.secondImage.height * Math.sin(angleAbs);
		const newHeight = this.originImage.secondImage.width * Math.sin(angleAbs) + this.originImage.secondImage.height * Math.cos(angleAbs);
		this.transformCanvas.canvas.width = Math.round(newWidth);
		this.transformCanvas.canvas.height = Math.round(newHeight);
	}


	setAngleUI(angle) {
		this.domHandler.setAngle(angle);
	}

	resetRotateData() {
		this.originImage.secondImage = new Image();
		this.setAngleUI(0);
	}

}
