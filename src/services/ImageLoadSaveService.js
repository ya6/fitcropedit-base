export default class ImageLoadSaveService {
  formats = ["image/png", "image/jpeg", "image/webp", "image/gif"];
  imageParams = {
    fullName: "",
    name: "",
    ext: "",
    type: "",
    format: "",
    size: 0,
    lastModified: 0,
  };

  constructor() {}

  loadImageFromInput(image, inputElement) {
    inputElement.addEventListener("change", (e) => {
      if (e.target.files[0] && this.formats.includes(e.target.files[0].type)) {
        image.src = URL.createObjectURL(e.target.files[0]);
        this.collectFileData(e.target.files[0]);
        e.target.value = "";
      }
    });
  }

  collectFileData(file) {
    //TODO add check to ext
    const fileNameParts = file.name.split(".");

    this.imageParams.ext = fileNameParts.pop();
    this.imageParams.name = fileNameParts.join("");
    this.imageParams.fullName = file.name;
    this.imageParams.size = file.size;
    this.imageParams.type = file.type;
    this.imageParams.format = file.type.split("/").pop();
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
