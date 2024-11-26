export default class ToolsItems {
  ResolutionTemplate() {
    // <div id="${this.appState.selectors.leftsidebarResolutionSelector}">

    const size = `
    <div>
      <div class="sub-title">Size
        <span class="ms-05"
        </span>
      </div>
      <div class="flex my-3">
        <label>W:</label>
        <input class="rounded-sub-input" type="text" placeholder="width">
        <label class="ms-1">H:</label>
        <input class="rounded-sub-input" type="text" placeholder="height">
        <span> px</span>
      </div>
    </div>
    `;

    const applyButtons = `
    <div class="flex mt-1 mb-3">
      <button type="button" class="control-button" data-action="tools-resolution-apply-button">
        <div class="custom-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
          </svg>
        </div>     
      Apply
      </button>
  
      <button type="button" class="control-button ms-1" data-action="tools-resolution-cancel-button">
        <div class="custom-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </div>
       Cancel
       </button>  
    </div>
    `;

    return `
	 <h3 class="no-mp">Resolution</h3>
    ${size}
    ${applyButtons}
	</div>
	`;
  }
}
