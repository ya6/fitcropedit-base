export default class LeftSidebar {
  constructor(stateService, domHandler) {
    this.appState = stateService.state;
    this.domHandler = domHandler;

    this.init();
  }

  init() {
    this.createTemplate();
    this.storeLeftSidebar();
    this.dispatch();
  }

  //
  storeLeftSidebar() {
    this.appState.leftSidebarElement = this.leftSidebarElement;
  }

  dispatch() {
    this.leftSidebarElement.addEventListener("click", (e) => { });
  }

  createTemplate() {
    this.leftSidebarElement = document.createElement("div");
    this.leftSidebarElement.setAttribute("id", this.appState.leftSidebarSelector);
    this.leftSidebarElement.setAttribute("class", "fc-left-sidebar-container");
    this.domHandler.injectString(this.leftSidebarElement, this.innerTemplate());
  }

  innerTemplate() {
    const cropButton = `
    <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item">
      <div class="fc-custom-icon mx-auto">	
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 28.4 28.34"> 
          <path fill-rule="evenodd" d="m24.99 24.43h2.56c0.47 0 0.85-0.38 0.85-0.85s-0.38-0.85-0.85-0.85h-2.56v1.7zm-19.04-1.02zm-0.68-0.34 0.03 0.03zm-0.19-22.24v22.73 0.02 0.02 0.02 0.02 0.02 0.02 0.02 0.02 0.02 0.02l0.1 0.2c0.01 0.01 0.01 0.02 0.02 0.04l0.01 0.02c0.01 0.01 0.02 0.02 0.02 0.03l0.01 0.02 0.03 0.03 0.01 0.02c0 0.01 0.01 0.01 0.01 0.02l0.04 0.04 0.02 0.01c0.01 0 0.01 0.01 0.02 0.01s0.01 0.01 0.02 0.01l0.2 0.1c0.01 0 0.01 0.01 0.02 0.01l0.12 0.06h0.02 0.02 0.02 0.02 0.02 0.02 0.02 0.02 0.02 0.02 13.93v-1.7h-13.08v-21.87c0-0.47-0.38-0.85-0.85-0.85s-0.85 0.38-0.85 0.85zm-1.7 3.06h-2.56c-0.47 0-0.85 0.38-0.85 0.85s0.38 0.85 0.85 0.85h2.56v-1.7zm19.04 0zm0.68 0.34-0.03-0.03zm0.19 23.27v-22.73-0.02-0.02-0.02-0.02-0.02-0.02-0.02-0.02-0.02-0.02l-0.1-0.2c-0.01-0.01-0.01-0.02-0.02-0.04l-0.01-0.02c-0.01-0.01-0.02-0.02-0.02-0.03l-0.01-0.02-0.03-0.03-0.01-0.02c-0-0.01-0.01-0.01-0.01-0.02l-0.04-0.04-0.02-0.01c-0.01-0-0.01-0.01-0.02-0.01s-0.01-0.01-0.02-0.01l-0.2-0.1c-0.01-0-0.01-0.01-0.02-0.01l-0.12-0.06h-0.02-0.02-0.02-0.02-0.02-0.02-0.02-0.02-0.02-0.02-13.93v1.7h13.08v21.87c0 0.47 0.38 0.85 0.85 0.85s0.85-0.38 0.85-0.85z"/>	  
        </svg>	 
      </div>
      <div class="fc-avoid-clicks">Crop</div>
    </button>
  `;

    const resizeButton = `
  <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item" data-role="leftsidebar-button" data-action="resize">
    <div class="fc-custom-icon mx-auto">	
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
        <path fill-rule="evenodd" d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z"/>
      </svg>
    </div>
    <div class="fc-avoid-clicks">Resize</div>
  </button>
  `;

    const filtersButton = `
    <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item">
      <div class="fc-custom-icon mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 20.89 19.33">  
           <path fill-rule="evenodd" d="m0.65 1.7h2.83c0.28-0.98 1.19-1.7 2.26-1.7s1.98 0.72 2.26 1.7h12.24c0.36 0 0.65 0.29 0.65 0.65s-0.29 0.65-0.65 0.65h-12.24c-0.28 0.98-1.19 1.7-2.26 1.7s-1.98-0.72-2.26-1.7h-2.83c-0.36 0-0.65-0.29-0.65-0.65s0.29-0.65 0.65-0.65zm5.09-0.39c0.58 0 1.04 0.47 1.04 1.04 0 0.58-0.47 1.04-1.04 1.04-0.58 0-1.04-0.47-1.04-1.04 0-0.58 0.47-1.04 1.04-1.04zm-5.09 7.53h13.54c0.28-0.98 1.19-1.7 2.26-1.7s1.98 0.72 2.26 1.7h1.53c0.36 0 0.65 0.29 0.65 0.65s-0.29 0.65-0.65 0.65h-1.53c-0.28 0.98-1.19 1.7-2.26 1.7s-1.98-0.72-2.26-1.7h-13.54c-0.36 0-0.65-0.29-0.65-0.65s0.29-0.65 0.65-0.65zm15.8-0.39c0.58 0 1.04 0.47 1.04 1.04 0 0.58-0.47 1.04-1.04 1.04-0.58 0-1.04-0.47-1.04-1.04 0-0.58 0.47-1.04 1.04-1.04zm-8.62 6.19c1.07 0 1.98 0.72 2.26 1.7h10.15c0.36 0 0.65 0.29 0.65 0.65s-0.29 0.65-0.65 0.65h-10.15c-0.28 0.98-1.19 1.7-2.26 1.7s-1.98-0.72-2.26-1.7h-4.92c-0.36 0-0.65-0.29-0.65-0.65s0.29-0.65 0.65-0.65h4.92c0.28-0.98 1.19-1.7 2.26-1.7zm0 1.31c0.58 0 1.04 0.47 1.04 1.04 0 0.58-0.47 1.04-1.04 1.04-0.58 0-1.04-0.47-1.04-1.04 0-0.58 0.47-1.04 1.04-1.04z"/>
         </svg> 
      </div>
      <div>Filters</div>
    </button>
  `;

    const zoomButton = `
  <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item">
    <div class="fc-custom-icon mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 22.47 22.47"> 
        <path fill-rule="evenodd" d="m-0 8.09c0 4.47 3.62 8.09 8.09 8.09 1.76 0 3.39-0.56 4.72-1.52l7.43 7.43c0.51 0.51 1.34 0.51 1.85 0s0.51-1.34 0-1.85l-7.43-7.43c0.96-1.33 1.52-2.96 1.52-4.72 0-4.47-3.62-8.09-8.09-8.09s-8.09 3.62-8.09 8.09zm1.57 0c0 3.6 2.92 6.53 6.53 6.53 3.6 0 6.53-2.92 6.53-6.53 0-3.6-2.92-6.53-6.53-6.53-3.6 0-6.53 2.92-6.53 6.53z"/> 
      </svg> 
    </div>
    <div class="fc-avoid-clicks">Zoom</div>
  </button>
  `;

    const handButton = `
  <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item">
    <div class="fc-custom-icon mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 12.61 15.58"> 
        <path fill-rule="evenodd" d="m6.6 2.22c0.04 0.06 0.06 0.16 0.08 0.23 0.3 0.97 0.59 1.95 0.82 2.94 0.04 0.18 0.08 0.35 0.12 0.53 0.07 0.3 0.1 0.59 0.16 0.89 0.04 0.18 0.13 0.34 0.35 0.34 0.05 0 0.1-0.01 0.15-0.02 0.21-0.05 0.31-0.19 0.28-0.38l-0.13-0.89c-0.01-0.07-0.01-0.14-0.03-0.21-0.14-0.68-0.37-2.32-0.53-2.82l-0.51-1.59c-0-0.01-0-0.01-0.01-0.02-0.27-0.98 1.06-1.21 1.33-0.29 0 0.01 0 0.02 0.01 0.02l0.56 1.44v0.01l0.06 0.18c0.05 0.14 0.11 0.34 0.13 0.48l0.18 1.08 0.31 1.63c0.06 0.33 0.16 0.65 0.19 0.98 0.01 0.11 0.06 0.26 0.17 0.32 0.01 0 0.01 0.01 0.02 0.01 0.23 0.12 0.62-0.04 0.62-0.3 0.02-0.41 0.04-0.59-0.02-0.99l-0.54-2.72c-0.06-0.3-0.19-0.6-0.21-0.92-0.03-0.79 0.88-0.93 1.14-0.27 0.12 0.28 0.24 0.56 0.33 0.86 0.3 1.06 0.56 2 0.81 3.09 0.13 0.56 0.23 3.36 0.1 4.04-0.18 0.94-0.59 2.01-1.02 2.88-0.31 0.62-1.58 1.94-2.16 2.37-0.91 0.68-1.31 0.35-2.47 0.43-0.99 0.07-1.37 0.13-2.23-0.32-0.29-0.15-1.07-0.71-1.31-0.91-0.62-0.51-1.26-1.11-1.61-1.82l-1.01-2.26c-0-0.01-0.01-0.01-0.01-0.02-0.09-0.29-0.25-0.57-0.37-0.86-0.08-0.18-0.12-0.37-0.16-0.57-0.03-0.16-0.06-0.32-0.08-0.48l-0.12-1.45c-0.08-0.95 1.04-1.29 1.37-0.36 0.09 0.25 0.18 0.5 0.25 0.76 0.1 0.33 0.18 0.67 0.21 1.01v0.02c0.04 0.26 0.13 0.52 0.26 0.76 0.09 0.17 0.21 0.32 0.34 0.47 0.16 0.2 0.39 0.21 0.63 0.16 0.04-0.01 0.08-0.02 0.12-0.02 0.16-0.03 0.27-0.16 0.35-0.28 0.11-0.18 0.16-0.39 0.2-0.6 0.1-0.58 0.06-1.21-0.08-1.78-0.09-0.39-0.18-0.78-0.28-1.17-0.1-0.4-0.27-1.48-0.44-1.85l-0.6-1.28s-0-0.01-0.01-0.01c-0.18-0.34-0.11-0.78 0.29-0.96 0.39-0.17 0.79-0.07 0.99 0.29l0.75 1.34c0 0.01 0.01 0.02 0.01 0.02l0.12 0.29 0.88 2.89c0.05 0.16 0.19 0.3 0.39 0.3 0.21 0 0.38-0.15 0.39-0.34 0-0.06-0.02-0.12-0.04-0.18l-0.93-3.38c-0-0.01-0.01-0.02-0.01-0.03l-0.34-0.7-0.62-1.15s-0-0.01-0.01-0.01c-0.2-0.33-0.16-0.78 0.23-0.97 0.38-0.19 0.79-0.11 1 0.24l0.73 1.14c0.14 0.24 0.25 0.51 0.4 0.74zm-0.45 0.26c-0.15-0.24-0.26-0.49-0.39-0.73l-0.72-1.13v-0.01c-0.08-0.12-0.21-0.11-0.33-0.05-0.1 0.05-0.07 0.16-0.02 0.24 0.01 0.01 0.02 0.03 0.02 0.04l0.6 1.11c0.01 0.02 0.02 0.03 0.03 0.05l0.34 0.7c0.02 0.04 0.03 0.07 0.04 0.11l0.93 3.38c0.03 0.12 0.06 0.2 0.06 0.32v0.02c-0.02 0.48-0.44 0.84-0.91 0.84-0.42 0-0.75-0.27-0.88-0.66v-0.01l-0.87-2.87-0.1-0.25-0.75-1.32v-0.01c-0.07-0.13-0.21-0.11-0.32-0.06-0.1 0.04-0.09 0.15-0.04 0.24 0.01 0.01 0.01 0.02 0.02 0.04l0.6 1.29c0.13 0.3 0.22 0.71 0.28 1.03 0.06 0.3 0.11 0.61 0.19 0.91 0.1 0.39 0.18 0.78 0.28 1.17 0.16 0.64 0.2 1.34 0.08 2-0.05 0.27-0.12 0.53-0.26 0.76-0.16 0.27-0.39 0.48-0.71 0.54-0.03 0.01-0.07 0.01-0.1 0.02-0.43 0.09-0.85 0.01-1.14-0.34-0.14-0.17-0.28-0.35-0.39-0.54-0.16-0.29-0.27-0.6-0.32-0.93-0-0.02-0.01-0.04-0.01-0.05-0.03-0.31-0.1-0.61-0.19-0.91-0.08-0.25-0.16-0.49-0.25-0.73-0.14-0.39-0.39-0.17-0.37 0.14l0.12 1.44c0.02 0.14 0.04 0.29 0.07 0.43 0.03 0.16 0.07 0.32 0.13 0.47 0.12 0.3 0.28 0.57 0.38 0.88l1 2.23c0.32 0.63 0.92 1.19 1.47 1.64 0.19 0.16 0.41 0.31 0.62 0.45 0.19 0.13 0.41 0.29 0.61 0.4 0.77 0.4 1.1 0.33 1.95 0.27 0.3-0.02 0.59-0.02 0.89-0 0.18 0.01 0.38 0.02 0.56 0 0.29-0.03 0.51-0.16 0.74-0.33 0.51-0.38 1.72-1.63 2-2.19 0.42-0.84 0.8-1.83 0.98-2.75 0.04-0.21 0.04-0.5 0.05-0.72 0.01-0.39 0-0.77-0.01-1.16-0.01-0.41-0.03-0.81-0.06-1.22-0.02-0.22-0.03-0.51-0.08-0.72-0.23-1.03-0.52-2.05-0.8-3.05-0.09-0.27-0.2-0.54-0.31-0.81v-0.01c-0.06-0.15-0.15-0.12-0.14 0.05 0.02 0.27 0.15 0.58 0.21 0.85l0.54 2.72v0.03c0.06 0.39 0.04 0.69 0.02 1.07 0 0.66-0.81 1.04-1.37 0.76-0.02-0.01-0.03-0.02-0.05-0.03-0.25-0.15-0.38-0.43-0.41-0.71-0.03-0.31-0.13-0.63-0.19-0.94l-0.31-1.63v-0.01l-0.18-1.08v-0.01c-0.02-0.12-0.07-0.27-0.11-0.38-0.02-0.06-0.05-0.12-0.06-0.17l-0.56-1.44c-0.01-0.02-0.02-0.04-0.02-0.07-0.04-0.13-0.19-0.28-0.32-0.18-0.05 0.03-0.02 0.15-0.02 0.17v0.01l0.51 1.59c0.15 0.46 0.23 1.07 0.31 1.55 0.07 0.44 0.14 0.89 0.23 1.32 0.02 0.08 0.02 0.16 0.03 0.24l0.13 0.89c0.07 0.47-0.22 0.86-0.68 0.96-0.09 0.02-0.17 0.03-0.26 0.03-0.47 0-0.77-0.33-0.86-0.76-0.06-0.29-0.09-0.59-0.16-0.88-0.04-0.17-0.08-0.35-0.12-0.52-0.24-0.98-0.52-1.94-0.82-2.91-0.01-0.04-0.02-0.08-0.04-0.12z"/>
      </svg>
    </div>
    <div class="fc-avoid-clicks">Hand</div>
  </button>
  `;

    const transformButton = `
  <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item">
    <div class="fc-custom-icon mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 132.93 125.7">			
      <path fill-rule="evenodd" d="m98.72 8.16h-64.49v109.39h64.49v-109.39zm8.16-8.16h-80.81v125.7h80.81v-125.7z"/>
      <path fill-rule="evenodd" d="m-0 48.84 24.26 14.01-24.26 14.01v-28.01z"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 13.052 8.1577)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 13.052 125.7)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 8.1577)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 21.21)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 34.262)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 47.314)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 86.47)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 99.522)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 112.58)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(-4.0042e-14 -.78739 .083176 2.318e-14 -7.4214e-5 125.7)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 119.87 8.1577)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 119.87 125.7)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 8.1577)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 21.21)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 34.262)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 47.314)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 86.47)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 99.522)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 112.58)" width="10.36" height="98.08"/>
      <rect fill-rule="evenodd" transform="matrix(4.0042e-14 -.78739 -.083176 2.318e-14 132.92 125.7)" width="10.36" height="98.08"/>
      <path fill-rule="evenodd" d="m132.93 48.84-24.26 14.01 24.26 14.01v-28.01z"/>	 
    </svg>	
      </div>
      <div class="fc-avoid-clicks">Transform</div>
  </button>
  `;

    const backgroundButton = `
  <button class="fc-left-sidebar-button" type="button" data-anchor="left-sidebar-item" data-role="leftsidebar-button" data-options="has-submenu" data-action="background">
    <div class="fc-custom-icon mx-auto">         
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 .64 .64"> 
        <path fill-rule="evenodd" d="m0.09 0h0.46c0.05 0 0.09 0.04 0.09 0.09v0.46c0 0.05-0.04 0.09-0.09 0.09h-0.46c-0.05 0-0.09-0.04-0.09-0.09v-0.46c0-0.05 0.04-0.09 0.09-0.09zm0.5 0.27-0.32 0.32h0.17l0.15-0.15v-0.17zm-0.36 0.32 0.36-0.36v-0.14c0-0.01 0-0.01-0.01-0.02l-0.51 0.51c0.01 0.01 0.01 0.01 0.02 0.01h0.14zm-0.14-0.54c-0.02 0-0.04 0.02-0.04 0.04v0.04l0.08-0.08h-0.04zm-0.04 0.14v0.15l0.29-0.29h-0.15l-0.14 0.14zm0 0.2v0.16l0.5-0.5h-0.16l-0.34 0.34zm0.42 0.2h0.08c0.02 0 0.04-0.02 0.04-0.04v-0.08l-0.12 0.12z"/>
      </svg>

    </div>
    <div class="fc-avoid-clicks">Background</div>
  </button>
  `;

    const sidebarTemplate = `
    <div id=${this.appState.selectors.leftsidebarMenuSelector} class="fc-left-sidebar-menu-container">
      ${cropButton}
      ${zoomButton}
      ${handButton}
      ${filtersButton}
      ${resizeButton}
      ${transformButton}
      ${backgroundButton}
    </div>
  
    <div id=${this.appState.selectors.leftsidebarSubmenuSelector}>
     <div class="fc-leftsidebar-submenu-toggler"  data-action="leftsidebar-submenu-toggle"></div>
    </div>
    
  `;

    return sidebarTemplate;
  }
}
