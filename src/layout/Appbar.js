export default class Appbar {
  appbarElement;
  appbarItems;

  constructor(stateService) {
    this.appState = stateService.state;
    
    this.init();
  }

  init() {
    this.createTemplate();
    this.storeAppbar();
    this.getAllControls();
    this.dispatch();
  }

  createTemplate() {
    this.appbarElement = document.createElement("div");
    this.appbarElement.setAttribute("id", this.appState.appbarSelector);
    this.injectString(this.appbarElement, this.innerTemplate());
  }

  //
  storeAppbar() {
    this.appState.appbarElement = this.appbarElement;
  }

  innerTemplate() {
    const logo = `
    <div class="fc-appbar-logo">Fitcropedit</div>
    `;

    const fileMenuItem = `
    <div class="fc-appbar-item" data-role="appbar-item">
    <div class="fc-avoid-clicks">File</div>

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

  <div class="dropdown-box absolute hidden" data-role="dropdown-box">
    <ul class="fc-appbar-ul">
      <li class="fc-appbar-items-link" data-role="dropdown-item">
      <input type="file" id="${this.appState.selectors.appbarFileInputSelector}" data-role="dropdown-item"  class="hidden" accept="image/png, image/jpeg, image/webp, image/gif">
      <div>
        <label class="item-link-text" for="${this.appState.selectors.appbarFileInputSelector}">
          Open
        </label>
      </div> 
      </li>
      <li class="items-link"><span class="item-link-text" data-role="dropdown-item" data-action="appbar-save-button">Save</span></li>
      <li class="items-link"><span class="item-link-text" data-role="dropdown-item" data-action="appbar-reset-button">Reset</span></li>
      <li class="items-link"><span class="item-link-text" data-role="dropdown-item" data-action="appbar-close-button">Close</span></li>
    </ul>
  </div>
</div>
`;

    return `
  ${logo}
  ${fileMenuItem}
    `;
  }

  getAllControls() {
    this.appbarItems = this.appbarElement.querySelectorAll('[data-role="appbar-item"]');
  }

  dispatch() {
    this.appbarElement.addEventListener("click", (e) => {
      const targetElement = e.target;

      if (targetElement.dataset.role === "appbar-item") {
        // open dropdown
        // manage icons
        this.appbarItems.forEach((el) => {
          const curentOpenIcon = el.querySelector('[data-role="custom-toggle-icon-open"]');
          const curentcloseIcon = el.querySelector('[data-role="custom-toggle-icon-close"]');
          const curentDropdown = el.querySelector('[data-role="dropdown-box"]');

          if (el === targetElement) {
            this.toggeElements(curentOpenIcon);
            this.toggeElements(curentcloseIcon);
            this.toggeElements(curentDropdown);
          } else {
            this.showhiddenElements(curentOpenIcon);
            this.hideElements(curentcloseIcon);
            this.hideElements(curentDropdown);
          }
        });
      }

      if (targetElement.dataset.role === "dropdown-item") {
        this.closeAllMenuItems();
      }
    });
  }

  closeAllMenuItems() {
    this.appbarItems.forEach((el) => {
      const curentOpenIcon = el.querySelector('[data-role="custom-toggle-icon-open"]');
      const curentcloseIcon = el.querySelector('[data-role="custom-toggle-icon-close"]');
      const curentDropdown = el.querySelector('[data-role="dropdown-box"]');

      this.showhiddenElements(curentOpenIcon);
      this.hideElements(curentcloseIcon);
      this.hideElements(curentDropdown);
    });
  }

   injectString(host, template) {
    host.insertAdjacentHTML("afterbegin", template);
  }

  hideElements(elements) {
    if (this.isIterable(elements)) {
      elements.forEach((el) => el.classList.add("hidden"));
    } else {
      elements.classList.add("hidden");
    }
  }

  showhiddenElements(elements) {
    if (this.isIterable(elements)) {
      elements.forEach((el) => el.classList.remove("hidden"));
    } else {
      elements.classList.remove("hidden");
    }
  }

  toggeElements(elements) {
    if (this.isIterable(elements)) {
      elements.forEach((el) => el.classList.toggle("hidden"));
    } else {
      elements.classList.toggle("hidden");
    }
  }

  isIterable(pretender) {
    return typeof pretender[Symbol.iterator] === "function";
  }
}
