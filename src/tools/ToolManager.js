export default class ToolManager {
  constructor(uiControls, closeIconButton, resizeTool) {
    this.uiControls = uiControls;
    this.closeIconButton = closeIconButton;
    this.resizeTool = resizeTool;
  }

  manage(buttonElement, toolName) {
    const isActive = this.uiControls.toggleActiveClass(buttonElement);

    if (isActive) {
      this.uiControls.clearToolsContainer();
      //diplay close button

      switch (toolName) {
        case "resize":
          this.uiControls.displayTool(this.resizeTool.template()); //? one func
          this.resizeTool.activateTemplate();
          break;
      }
    } else {
      this.uiControls.clearToolsContainer();
    }
  }

  reset(toolsArr = []) {
    toolsArr.forEach((tool) => {
      switch (tool) {
        case "reset":
          break;
      }
    });
    this.uiControls.clearToolsContainer();
    this.uiControls.resetLeftSidebarMenu();
  }
}
