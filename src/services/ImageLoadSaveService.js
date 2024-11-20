export default class ImageLoadSaveService {
  // formats = ["image/png", "image/jpeg", "image/webp", "image/gif"];
  formats = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/bmp"];
  //in 2 places (+config)
  extentions = { png: "png", jpeg: "jpg", webp: "webp", gif: "gif", bmp: "bmp" };

  //tiff, svg
  imageParams = {
    fullName: "",
    name: "",
    ext: "",
    type: "",
    format: "",
    size: 0,
    lastModified: 0,
  };

  constructor(notificationService) {
    this.notificationService = notificationService;
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
      "image/tiff": [0x49, 0x49, 0x2a, 0x00], // Little-endian TIFF (II*)
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
    this.imageParams.ext = this.extentions[this.imageParams.format];
    this.imageParams.outputFormat = this.imageParams.format;
    this.imageParams.lastModified = file.lastModified;
  }

  saveImage(image, postfix) {
    const dataUrl = image.src;
    const { name, ext } = this.imageParams;

    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;

    // TODO  add change name feature

    downloadLink.download = `${name}${postfix}.${ext}`;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }

  saveDataUrl(dataUrl, ext, postfix) {
    const { name } = this.imageParams;

    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;

    // TODO  add change name feature

    downloadLink.download = `${name}${postfix}.${ext}`;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }

  trasformImageFormat(transformCavas, image, format) {
    transformCavas.canvas.width = image.naturalWidth || image.width;
    transformCavas.canvas.height = image.naturalHeight || image.height;

    transformCavas.ctx.drawImage(image, 0, 0, transformCavas.canvas.width, transformCavas.canvas.height);

    const mimeType = `image/${format}`;
    const dataUrl = transformCavas.canvas.toDataURL(mimeType);
    return dataUrl;
  }
}
