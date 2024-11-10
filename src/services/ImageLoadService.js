export default class ImageLoadService {
  formats = ["image/png", "image/jpeg", "image/webp", "image/gif"];

  loadImageFromInput(image, inputElement) {
    inputElement.addEventListener("change", (e) => {
      if (e.target.files[0] && this.formats.includes(e.target.files[0].type)) {
        image.src = URL.createObjectURL(e.target.files[0]);
      }
    });
  }
}
