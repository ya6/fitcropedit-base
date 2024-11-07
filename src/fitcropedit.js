import StateService from "./services/StateService";
import MainCanvas from "./MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";
import TemplateService from "./services/TemplateService";
import ImageService from "./services/ImageService";
import DeviceService from "./services/deviceService";

console.log("fitcropedit.js");

function bootstrap(params) {
  const stateService = new StateService();
  stateService.updateState(params);
  
  new DeviceService(stateService);


  //template
  const templateService = new TemplateService(stateService);
  const appbar = new Appbar(stateService);
  const leftSidebar = new LeftSidebar(stateService);
  const rightSidebar = new Rightsidebar(stateService);
  const mainCanvas = new MainCanvas(stateService);
  templateService.getElements();

  //setup
  const imageService = new ImageService(stateService);

  const resizeObserver = new ResizeObserver((entries) => {
    stateService.state.template.containerWidth = entries[0].target.clientWidth;
    stateService.state.template.containerHeight = entries[0].target.clientHeight;

    mainCanvas.init();
  });

  resizeObserver.observe(stateService.state.rootElement);
}

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
