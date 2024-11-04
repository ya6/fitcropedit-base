export default class ImageService {
  formats = ["image/png", "image/jpeg", "image/webp", "image/gif"];

  constructor(stateService) {
    this.appState = stateService.state;
    this.container = this.appState.rootElement;

    this.init();
  }


  init() {
    this.loadImage();
  }

  loadImage() {
    const input = this.appState.elements.appbarFileInputElement;
    input.addEventListener("change", (e) => {
      if (e.target.files[0] && this.formats.includes(e.target.files[0].type)) {
        console.log(e.target.files[0]);
      }
    });
  }
}
