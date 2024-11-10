import StateService from "./services/StateService";
import MainCanvas from "./MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";

import DeviceService from "./services/DeviceService";
import Template from "./layout/Template";
import ImageLoadService from './services/ImageLoadService';
import OriginImage from './OriginImage';

console.log("fitcropedit.js");

function bootstrap(params) {
  const stateService = new StateService();
  stateService.updateState(params);

  const deviceService = new DeviceService(stateService);

  //template
  const appbar = new Appbar(stateService);
  const leftSidebar = new LeftSidebar(stateService);
  const mainCanvas = new MainCanvas(stateService);
  const rightSidebar = new Rightsidebar(stateService);
  const template = new Template(stateService, deviceService, mainCanvas);
  
  //
   const imageLoadService = new ImageLoadService();
   const originImage = new OriginImage(stateService, imageLoadService);
}

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
