export default class History {
  project = {
    name: "",
    file: { fullName: "" },
    history: [{ title: "Empty", image_src: null, action: "clear" }],
  };

  constructor(name = "fce-project-1") {
    if (History.instance) {
      return History.instance;
    }
    this.project.name = name;
    History.instance = this;
  }

  setFileData(fullName) {
    this.project.file.fullName = fullName;

    this.clearHistory();
    const stepOne = {
      title: "Loaded Image",
      image_src: null, // ? stored in originImage
      action: "reset",
    };

    this.add(stepOne);
  }

  add(step) {
    this.project.history.push(step);
  }

  clearHistory() {
    this.project.history = [];
  }

  resetHistory() {
    this.project.history = [{ title: "Empty", image_src: null, action: "clear" }];
  }
}
