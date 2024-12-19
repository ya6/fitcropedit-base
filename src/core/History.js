export default class History {
  project = {
    name: "",
    file: { fullName: "" },
    history: [{ title: "Empty", imageSrc: null, metaData: null, action: "clear" }],
  };

  constructor(stateService, domHandler, name = "fce-project-1") {
    if (History.instance) {
      return History.instance;
    }
    this.project.name = name;
    this.appState = stateService.state;
    this.domHandler = domHandler;
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

    content += `</ul>`;
    return content;
  }

  setFileData(fullName) {
    this.project.file.fullName = fullName;
  }

  add(step) {
    this.project.history = [...this.project.history, step];
    this.updateHistoryUI();
  }

  clearHistory() {
    this.project.history = [];
    this.updateHistoryUI();
  }

  resetHistory() {
    this.project.history = [{ title: "Empty", imageSrc: null, metaData: null, action: "clear" }];
    this.updateHistoryUI();
  }

  updateHistoryUI() {
    this.appState.elements.historybarContentElement.innerHTML = "";
    this.domHandler.injectString(this.appState.elements.historybarContentElement, this.historyContent());
  }

  // injectString(host, template) {
  //   host.insertAdjacentHTML("afterbegin", template);
  // }
}
