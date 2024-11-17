export default class ImageFormatSevice {
	
  trasform(transformCavas, image, format) {
    transformCavas.width = image.naturalWidth || image.width;
    transformCavas.height = image.naturalHeight || image.height;

    transformCavas.ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const mimeType = `image/${format}`;
    const dataUrl = transformCavas.toDataURL(mimeType);
    return dataUrl;
  }
}
