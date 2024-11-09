import StateService from "./services/StateService";
import MainCanvas from "./MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";
import ImageService from "./services/ImageService";
import DeviceService from "./services/deviceService";
import Template from "./layout/Template";

console.log("fitcropedit.js");

function bootstrap(params) {
  const stateService = new StateService();
  stateService.updateState(params);

  new DeviceService(stateService);

  //template

  const appbar = new Appbar(stateService);
  const leftSidebar = new LeftSidebar(stateService);
  const mainCanvas = new MainCanvas(stateService);

  const template = new Template(stateService);


  
  // const rightSidebar = new Rightsidebar(stateService);
  // templateService.getElements();

  //setup
  //   const imageService = new ImageService(stateService);

  
}

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
