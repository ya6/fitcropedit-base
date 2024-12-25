export default class ToolsManager {
  constructor(stateService, domHandler, closeIconButton, resizeTool) {
    this.appState = stateService.state;
    this.domHandler = domHandler;
    this.closeIconButton = closeIconButton;
    this.resizeTool = resizeTool;
  }

  manage(buttonElement, options, toolName) {
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();

    const isActive = this.domHandler.toggleActiveClass(buttonElement);

    if (options) {
      this.domHandler.clearToolsContainer();

      switch (options) {
        case "has-submenu":
          const submenu = this.appState.elements.leftsidebarSubmenuElement;
          if (!submenu.classList.contains("open")) {
            submenu.classList.add("open");
          }

          break;
      }
    }

    if (!options) {
      if (isActive) {
        this.domHandler.clearToolsContainer();
        //diplay close button
        this.domHandler.displayTool(this.closeIconButton.template());

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
