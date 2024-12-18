export default class Historybar {
  historybarElement;

  constructor(stateService, history) {
    this.appState = stateService.state;
    this.history = history;

    this.init();
  }

  init() {
    this.createTemplate();
    this.storeHistorybar();
    this.dispatch();

    this.history.updateHistoryUI();
  }

  storeHistorybar() {
    this.appState.historybarElement = this.historybarElement;
    this.appState.elements.historybarContentElement = this.historybarElement.querySelector(
      `#${this.appState.selectors.historybarContentSelector}`
    );
  }

  createTemplate() {
    this.historybarElement = document.createElement("div");
    this.historybarElement.setAttribute("id", this.appState.historybarSelector);
    this.injectString(this.historybarElement, this.innerTemplate());
  }

  innerTemplate() {
    const back = `
	<div class="control-button">
    <div class="custom-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 6.45 4.61">   
        <path fill-rule="evenodd" d="m2.38 1.54h2.35c0.75 0 1.36 0.61 1.36 1.36s-0.61 1.36-1.36 1.36h-1.43c-0.1 0-0.19 0.07-0.19 0.17s0.08 0.17 0.18 0.17h1.43c0.94 0 1.71-0.77 1.71-1.71s-0.77-1.71-1.71-1.71h-2.35v-1.19l-2.38 1.38 2.38 1.38v-1.22z"/>
      </svg>
    </div>  
	</div> 
  `;

    const forward = `
	<div class="control-button">
		<div class="custom-icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 7.24 5.18">
			  <path fill-rule="evenodd" d="m4.57 1.73h-2.64c-0.84 0-1.53 0.69-1.53 1.53s0.69 1.53 1.53 1.53h1.6c0.11 0 0.21 0.08       0.21 0.2 0 0.11-0.09 0.2-0.21 0.2h-1.61c-1.06 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92h2.64v-1.34l2.68 1.55-2.68 1.55v-1.36z"/>
			</svg>
		</div>  
	</div>  
  `;

    const template = `
  <div class="flex align-center">
    <div data-role="history-tab" class="flex">
        <div class="fc-historybar-title fc-avoid-clicks">History</div>

        <div class="custom-icon ms-05" data-role="custom-toggle-icon-open">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
          <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
          </svg>
        </div>
        
          <div class="hidden custom-icon ms-05" data-role="custom-toggle-icon-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
            <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
            </svg>
          </div>
      </div>

     <div class="fc-historybar-buttons">
      <div class="control-button ms-2">
          <div class="custom-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 9.99 4.51">
              <path fill-rule="evenodd" d="m4.35 0-3.91 2.25 3.91 2.25v-1.97h5.36c0.15 0 0.28-0.13 0.28-0.28s-0.13-0.28-0.28-0.28h-5.36v-1.97zm-4.35 4.33v-4.15c0-0.09 0.08-0.17 0.17-0.17s0.17 0.08 0.17 0.17v4.15c0 0.09-0.08 0.17-0.17 0.17s-0.17-0.08-0.17-0.17z"/>
            </svg>
          </div>
          <div class="fc-avoid-clicks ms-05">Reset</div> 
      </div>
      
    </div>

	<div id ="${this.appState.selectors.historybarContentSelector}" data-role="history-list" class="fc-history-list hidden">
	</div>

  </div>
	
  
	  `;

    return template;
  }

  dispatch() {
    const openIcon = this.historybarElement.querySelector('[data-role="custom-toggle-icon-open"]');
    const closeIcon = this.historybarElement.querySelector('[data-role="custom-toggle-icon-close"]');
    const dropdown = this.historybarElement.querySelector('[data-role="history-list"]');

    this.historybarElement.addEventListener("click", (e) => {
      const targetElement = e.target;
      // console.log(targetElement);

      if (targetElement.dataset.role === "history-tab") {
        this.toggeElements(openIcon);
        this.toggeElements(closeIcon);
        this.toggeElements(dropdown);
      }

      if (targetElement.dataset.role === "history-item") {
        // console.log("history-item");
      }
    });
  }

  toggeElements(elements, className = "hidden") {
    elements.classList.toggle(className);
  }

  injectString(host, template) {
    host.insertAdjacentHTML("afterbegin", template);
  }
}
