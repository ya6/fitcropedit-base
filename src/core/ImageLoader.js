export default class LoadManager {
  formats = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/bmp"];
  //in 2 places (+config)
  extentions = { png: "png", jpeg: "jpg", webp: "webp", gif: "gif", bmp: "bmp" };
  //tiff, svg

  imageParams = {
    width: 0,
    height: 0,
    ratioWH: 0,
    fullName: "",
    name: "",
    ext: "",
    type: "",
    format: "",
    size: 0,
    lastModified: 0,
    outputFormat: "",
  };

  constructor(stateService, transformCanvas, originImage, notificationService, uiControls) {
    this.stateService = stateService;
    this.appState = stateService.state;
    this.transformCanvas = transformCanvas;
    this.originImage = originImage;
    this.notificationService = notificationService;
    this.uiControls = uiControls;

    this.init();
  }

  init() {
    this.handleLoadImage();
    this.loadImageFromMenu();
  }

  loadImageFromInput(image, inputElement) {
    inputElement.addEventListener("change", async (e) => {
      if (e.target.files[0]) {
        //chek 1
        if (!this.isValidImage(e.target.files[0])) {
          this.notificationService.notify("Unsupported file format");
          return;
        }

        //chek 2
        const fileType = await this.validateFileSignature(e.target.files[0]);

        if (!fileType) {
          this.notificationService.notify("Unsupported file format");
          return;
        }

        image.src = URL.createObjectURL(e.target.files[0]);

        this.collectFileData(e.target.files[0], fileType);
        e.target.value = "";
      }
    });
  }

  async validateFileSignature(file) {
    const allowedSignatures = {
      "image/png": [0x89, 0x50, 0x4e, 0x47],
      "image/jpeg": [0xff, 0xd8, 0xff],
      "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF

      "image/bmp": [0x42, 0x4d],
      "image/gif": [0x47, 0x49, 0x46, 0x38],
    };

    const arrayBuffer = await file.slice(0, 4).arrayBuffer();
    const header = new Uint8Array(arrayBuffer);

    for (const [type, signature] of Object.entries(allowedSignatures)) {
      if (signature.every((byte, index) => header[index] === byte)) {
        return type;
      }
    }

    return null;
  }

  isValidImage(file) {
    return this.formats.includes(file.type);
  }

  collectFileData(file, fileType) {
    this.imageParams.fullName = file.name;
    const fileNameParts = file.name.split(".");
    fileNameParts.pop();
    this.imageParams.name = fileNameParts.join("");
    this.imageParams.size = file.size;

    this.imageParams.type = fileType;

    this.imageParams.format = this.imageParams.type.split("/").pop();
    this.imageParams.outputFormat = this.imageParams.format;

    this.imageParams.ext = this.extentions[this.imageParams.format];
    this.imageParams.lastModified = file.lastModified;
  }

  loadImageFromMenu() {
    const inputElement = this.appState.elements.appbarFileInputElement;
    this.loadImageFromInput(this.originImage.baseImage, inputElement);
  }

  handleLoadImage() {
    this.originImage.baseImage.addEventListener("load", () => {
      this.appState.data.baseImage.isLoaded = true;

      this.imageParams.width = this.originImage.baseImage.width;
      this.imageParams.height = this.originImage.baseImage.height;

      this.imageParams.ratioWH = this.originImage.baseImage.width / this.originImage.baseImage.height;

      this.stateService.saveBaseImageParams(this.imageParams);

      this.originImage.collectParams();
      this.originImage.drawImage();

      this.uiControls.diplayDimentionInUI();
      this.uiControls.displayOutputFormatUI();
      this.uiControls.displayExtentionUI();
    });
  }

  saveImage() {
    const { outputFormat, format } = this.appState.data.baseImage;

    if (this.originImage.baseImage.width > 0) {
      if (format === outputFormat) {
        this.save();
      } else {
        this.convertAndSave(outputFormat);
      }
    }
  }

  //set img as param?
  save() {
    const dataUrl = this.originImage.baseImage.src;
    const { name, ext } = this.imageParams;
    const postfix = this.appState.data.postfix;
    const fullName = `${name}${postfix}.${ext}`;

    this.downloadImage(dataUrl, fullName);
  }

  // TODO  add change name feature

  //set img as param?
  convertAndSave(exportFormat) {
    const { name } = this.imageParams;
    const postfix = this.appState.data.postfix;
    const ext = this.extentions[exportFormat];

    const fullName = `${name}${postfix}.${ext}`;

    const dataUrl = this.convertImageFormat(this.originImage.baseImage, exportFormat);
    this.downloadImage(dataUrl, fullName);
  }

  downloadImage(dataUrl, fullName) {
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = fullName;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }

  // place?
  convertImageFormat(image, format) {
    this.transformCanvas.canvas.width = image.naturalWidth || image.width;
    this.transformCanvas.canvas.height = image.naturalHeight || image.height;

    this.transformCanvas.ctx.drawImage(
      image,
      0,
      0,
      this.transformCanvas.canvas.width,
      this.transformCanvas.canvas.height
    );

    const mimeType = `image/${format}`;
    const dataUrl = this.transformCanvas.canvas.toDataURL(mimeType);
    return dataUrl;
  }
}
