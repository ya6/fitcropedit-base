export default class ToolsManager {
  constructor(domHandler, closeIconButton, resizeTool) {
    this.domHandler = domHandler;
    this.closeIconButton = closeIconButton;
    this.resizeTool = resizeTool;
  }

  manage(buttonElement, toolName) {
    const isActive = this.domHandler.toggleActiveClass(buttonElement);

    if (isActive) {
      this.domHandler.clearToolsContainer();
      //diplay close button
     
      this.domHandler.displayTool(this.closeIconButton.template()); //? one func


      switch (toolName) {
        case "resize":
          this.domHandler.displayTool(this.resizeTool.template()); //? one func
          this.resizeTool.activateTemplate();
          break;
      }
    } else {
      this.domHandler.clearToolsContainer();
    }
  }

  reset(toolsArr = []) {
    toolsArr.forEach((tool) => {
      switch (tool) {
        case "reset":
          break;
      }
    });
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();
  }
}
