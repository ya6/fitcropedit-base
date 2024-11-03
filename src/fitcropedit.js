import StateService from "./services/StateService";
import MainCanvas from "./MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";
import TemplateService from "./services/TemplateService";
import ImageService from "./services/ImageService";

console.log("fitcropedit.js");

function bootstrap(params) {

  const container = document.getElementById("fitcropedit");
  const stateService = new StateService();
  
  stateService.updateState(params);
  
  container.style.width = stateService.state.template.containerWidth;
  container.style.height = stateService.state.template.containerHeight;
  
  //template
  const appbar = new Appbar(container, stateService);
  const leftSidebar = new LeftSidebar(container, stateService);
  const rightSidebar = new Rightsidebar(container, stateService);
  const mainCanvas = new MainCanvas(container, stateService);
  
  //setup
  const templateService = new TemplateService(container, stateService);
  const imageService = new ImageService(container, stateService);

  const resizeObserver = new ResizeObserver((entries) => {
    stateService.state.template.containerWidth = entries[0].target.clientWidth;
    stateService.state.template.containerHeight = entries[0].target.clientHeight;

    mainCanvas.init();
  });

  resizeObserver.observe(container);
}

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
