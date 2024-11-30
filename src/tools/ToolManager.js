export default class ToolManager {
  constructor(uiControls, resizeTool) {
    this.uiControls = uiControls;
    this.resizeTool = resizeTool;
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
