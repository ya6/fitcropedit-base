export default class ToolManager {
  constructor(uiControls, resizeTool) {
    this.uiControls = uiControls;
    this.resizeTool = resizeTool;
  }

  manage(buttonElement, toolName) {
    const isActive = this.uiControls.toggleActiveClass(buttonElement);

    if (isActive) {
      switch (toolName) {
        case "resize":
          this.uiControls.displayTool(this.resizeTool.template()); //? one func
          this.resizeTool.activateTemplate();
          break;
      }
    } else {
      this.uiControls.hideTool();
    }
  }

  reset(toolsArr = []) {
    toolsArr.forEach((tool) => {
      switch (tool) {
        case "reset":
          break;
      }
    });
    this.uiControls.hideTool();
    this.uiControls.resetLeftSidebarMenu();
  }
}
