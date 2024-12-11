export default class History {
  project = {
    name: "",
    file: { fullName: "" },
    history: [{ title: "Empty", image_src: null, action: "clear" }],
  };

  constructor(stateService, name = "fce-project-1") {
    if (History.instance) {
      return History.instance;
    }
    this.project.name = name;
	this.appState = stateService.state
    History.instance = this;
  }

  historyContent() {
    let content = `
     <ul>
    `;

    this.project.history.forEach((element, idx) => {
      content += `
		<li class="fc-history-list-item" data-role="history-item" data-number="${idx}">
		  ${element.title}
		</li>
		`;
    });

     content += `</ul>`
    return content;
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
    this.project.history= [...this.project.history, step]
	this.updateHistoryUI()
  }

  clearHistory() {
    this.project.history = [];
	this.updateHistoryUI()
  }

  resetHistory() {
    this.project.history = [{ title: "Empty", image_src: null, action: "clear" }];
	this.updateHistoryUI()
  }


  updateHistoryUI() {
    this.appState.elements.historybarContentElement.innerHTML = "";
    this.injectString(this.appState.elements.historybarContentElement, this.historyContent());
  }

  injectString(host, template) {
    host.insertAdjacentHTML("afterbegin", template);
  }

}
