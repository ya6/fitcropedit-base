import StateService from "./services/StateService";
import MainCanvas from "./core/MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";

import DeviceService from "./services/DeviceService";
import Template from "./layout/Template";
import ImageLoader from "./core/ImageLoader";
import OriginImage from "./core/OriginImage";
import ResizeService from "./services/ResizeService";
import ImageProcessor from "./core/ImageProcessor";
import Controls from "./core/Controls";
import Topbar from "./layout/TopBar";
import TransformCanvas from "./core/TransformCanvas";
import NotificationService from "./services/NotificationService";
import MeshCanvas from "./core/MeshCanvas";

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

  const transformCanvas = new TransformCanvas();
  const meshCanvas = new MeshCanvas(stateService, mainCanvas);

  const notificationService = new NotificationService();

  const originImage = new OriginImage(stateService, mainCanvas, meshCanvas);

  const imageLoader = new ImageLoader(stateService, transformCanvas, originImage, notificationService);

  const resizeService = new ResizeService(stateService, deviceService, mainCanvas);

  const imageProcessor = new ImageProcessor(
    stateService,
    deviceService,
    resizeService,
    mainCanvas,
    originImage,
    meshCanvas
  );

  const controls = new Controls(stateService, imageLoader, mainCanvas, originImage);
}

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
