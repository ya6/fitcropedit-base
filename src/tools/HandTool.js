export default class HandTool {
	params = { xCenter: null, yCenter: 0 };
	mouse = {
		down: false,
		x: 0,
		y: 0,
		pointX: null,
		pointY: null,
		dx: 0,
		dy: 0,
	};

	constructor(originImage, mainCanvas) {
		this.originImage = originImage;
		this.mainCanvas = mainCanvas;
	}

	getDelta() {
		if (!this.mouse.down) { return; }
		this.mouse.dx = this.mouse.x - this.mouse.pointX;
		this.mouse.dy = this.mouse.y - this.mouse.pointY;
		this.moveImage()
	}

	trackMove(e) {
		this.getDelta();
		this.getMouseCoods(e);
	}

	moveImage() {
		this.originImage.params.xCenter = this.params.xCenter + this.mouse.dx;
		this.originImage.params.yCenter = this.params.yCenter + this.mouse.dy;
		this.originImage.calcInitCoords();
		this.originImage.drawImage();
	}

	getMouseCoods(e) {
		const rect = this.mainCanvas.canvas.getBoundingClientRect();
		this.mouse.x = e.clientX - rect.left;
		this.mouse.y = e.clientY - rect.top;
	}

	markPosition() {
		this.mouse.pointX = this.mouse.x;
		this.mouse.pointY = this.mouse.y;
		this.params.xCenter = this.originImage.params.xCenter;
		this.params.yCenter = this.originImage.params.yCenter;
	};


	activate() {
		this.mainCanvas.canvas.style.cursor = "grab";
		this.dispatchMouseEvents();
	}

	dispatchMouseEvents() {
		this.mainCanvas.canvas.addEventListener("mousedown", this.mousedownHandle, true);
		this.mainCanvas.canvas.addEventListener("mousemove", this.moveHandle, true);
		this.mainCanvas.canvas.addEventListener("mouseup", this.mouseupHandle, true);
	}

	mousedownHandle = () => { this.mouse.down = true; this.markPosition() };
	moveHandle = (e) => { this.trackMove(e) };
	mouseupHandle = () => { this.mouse.down = false };

	removeMouseEvents() {
		this.mainCanvas.canvas.removeEventListener("mousedown", this.mousedownHandle, true);
		this.mainCanvas.canvas.removeEventListener("mousemove", this.moveHandle, true);
		this.mainCanvas.canvas.removeEventListener("mouseup", this.mouseupHandle, true);
	}

	stop() {
		this.mainCanvas.canvas.style.cursor = "default";
		this.removeMouseEvents();
	}
}