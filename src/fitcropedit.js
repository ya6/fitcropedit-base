import StateService from "./services/StateService";
import MainCanvas from "./core/MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";

import DeviceService from "./services/DeviceService";
import Template from "./layout/Template";
import ImageLoadSaveService from "./services/ImageLoadSaveService";
import OriginImage from "./core/OriginImage";
import ResizeService from "./services/ResizeService";
import ImageProcessor from "./core/ImageProcessor";
import Controls from './core/Controls';
import Topbar from './layout/TopBar';
import TransformCanvas from './core/TransformCanvas';


console.log("fitcropedit.js");

function bootstrap(params) {
  const stateService = new StateService();
  stateService.updateState(params);

  const deviceService = new DeviceService(stateService);

  //template
  const appbar = new Appbar(stateService);
  const topbar = new Topbar(stateService);
  const leftSidebar = new LeftSidebar(stateService);
  const mainCanvas = new MainCanvas(stateService);
  const rightSidebar = new Rightsidebar(stateService);
  const template = new Template(stateService, deviceService, mainCanvas);

  const transformCanvas = new TransformCanvas()

  const imageLoadSaveService = new ImageLoadSaveService();

  const originImage = new OriginImage(stateService, imageLoadSaveService, mainCanvas);

  const resizeService = new ResizeService(stateService, deviceService, mainCanvas);

  const imageProcessor = new ImageProcessor(stateService, deviceService, resizeService, mainCanvas, originImage);

  const controls = new Controls(stateService, imageLoadSaveService, mainCanvas, originImage)
}

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
