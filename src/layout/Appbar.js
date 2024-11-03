export default class Appbar {
  appbar;
  appbarItems;

  constructor(container, stateManager) {
    this.container = container;
    this.stateManager = stateManager;
    this.init();
  }

  init() {
    // setLocation() ?
    this.createTemplate();
    this.injectElement(this.container, this.appbar);
    this.getAllControls();
    this.dispatch();
  }

  createTemplate() {
    this.appbar = document.createElement("div");
    this.appbar.setAttribute("id", "fc-appbar");
    this.injectString(this.appbar, this.innerTemplate());
    return this.appbar;
  }

  innerTemplate() {
    const logo = `
    <div class="fc-appbar-logo">Fitcropedit</div>
    `;

    const fileMenuItem = `
    <div class="fc-appbar-item" data-role="appbar-item">
    <div class="avoid-clicks">File</div>

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
    <ul>
      <li class="items-link">
      <input type="file" id="appbarImageInput" class="hidden action" accept="image/png, image/jpeg">
      <div class="">
        <label for="appbarImageInput" class="">
          Open
        </label>
      </div> 
      </li>
      <li class="items-link action action-save" >Save</li>
      <li class="items-link action action-reset" >Reset</li>
      <li class="items-link action action-close" >Close</li>
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
    this.appbarItems = this.appbar.querySelectorAll('[data-role="appbar-item"]');
  }

  dispatch() {
    this.appbar.addEventListener("click", (e) => {
      const targetElement = e.target;

      if (targetElement.dataset.role == "appbar-item") {
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
    });
  }

  //
  injectElement(host, element) {
    host.appendChild(element);
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
