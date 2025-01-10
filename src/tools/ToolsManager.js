export default class ToolsManager {


  tools = ['resize', 'rotate', 'zoom', 'hand']

  constructor(stateService, originImage, domHandler, notificationService, closeIconButton, resizeTool, mirrorTool, rotateTool, zoomTool, handTool) {
    this.appState = stateService.state;
    this.domHandler = domHandler;
    this.originImage = originImage;
    this.notificationService = notificationService;

    this.closeIconButton = closeIconButton;
    this.resizeTool = resizeTool;
    this.mirrorTool = mirrorTool;
    this.rotateTool = rotateTool;
    this.zoomTool = zoomTool;
    this.handTool = handTool;
  }

  manage(buttonElement, options, toolName) {
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();

    const isActive = this.domHandler.toggleActiveClass(buttonElement);
    // todo - check - hard to read code
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
        //tepm  
        this.notificationService.removeNotification();
        //diplay close button
        this.domHandler.displayInRightsidebar(this.closeIconButton.template());

        switch (toolName) {
          case "resize":
            this.domHandler.displayInRightsidebar(this.resizeTool.template()); //? one func
            this.resizeTool.activateTemplate();
            break;

          case "hand":
            this.handTool.activate();
            break;
        }
      } else {
        this.domHandler.clearToolsContainer();
      }
    }
  }

  reset(toolsArr = []) {
    const toolsToReset = typeof toolsArr === 'string' ? [toolsArr] : toolsArr;

    toolsToReset.forEach((tool) => {
      switch (tool) {
        case "reset":
          break;

        case "zoom":
          this.originImage.params.zoom = 1;
          this.domHandler.displayZoomUI(1);
          break;
      }
    });
    this.domHandler.clearToolsContainer();
    this.domHandler.resetLeftSidebarMenu();
    //todo set all itit UI
  }

  stop(toolsArr = []) {
    const toolsToReset = typeof toolsArr === 'string' ? [toolsArr] : toolsArr;

    toolsToReset.forEach((tool) => {
      switch (tool) {
        case "hand":
          this.handTool.stop();
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
