export default class ToolsManager {
  constructor(stateService, domHandler, closeIconButton, resizeTool, mirrorTool, rotateTool, zoomTool) {
    this.appState = stateService.state;
    this.domHandler = domHandler;
    this.closeIconButton = closeIconButton;
    this.resizeTool = resizeTool;
    this.mirrorTool = mirrorTool;
    this.rotateTool = rotateTool;
    this.zoomTool = zoomTool;
  }

  manage(buttonElement, options, toolName) {
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();

    const isActive = this.domHandler.toggleActiveClass(buttonElement);
    // todo check for layout vertical or horizontal
    if (options) {
      switch (options) {
        case "has-submenu":
          const submenu = this.appState.elements.leftsidebarSubmenuElement;
          if (!submenu.classList.contains("open-left") && !submenu.classList.contains("open-down")) {
            let controlClassName = this.appState.device.isSmall ? "open-down" : 'open-left';
            submenu.classList.add(controlClassName);
          }

          break;
      }
    }

    if (!options) {
      if (isActive) {
        //diplay close button
        this.domHandler.displayInRightsidebar(this.closeIconButton.template());

        switch (toolName) {
          case "resize":
            this.domHandler.displayInRightsidebar(this.resizeTool.template()); //? one func
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

  horizontalFlip() {
    this.mirrorTool.horizontalFlip();
  }

  verticalFlip() {
    this.mirrorTool.verticalFlip();
  }

  rotateLeft() {
    this.rotateTool.rotateLeft();
  }

  rotateRight() {
    this.rotateTool.rotateRight();
  }

  zoomIn() { 
    this.zoomTool.zoomIn();
  }

  zoomOut() {
    this.zoomTool.zoomOut();
  }
}
