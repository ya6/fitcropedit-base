import StateService from "./services/StateService";
import MainCanvas from "./core/MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";
import Rightsidebar from "./layout/RightSidebar";

import ResizeService from "./services/ResizeService";
import DeviceService from "./services/DeviceService";
import Template from "./layout/Template";
import ImageLoader from "./core/ImageLoader";
import OriginImage from "./core/OriginImage";
import ImageProcessor from "./core/ImageProcessor";
import Controls from "./core/Controls";
import History from './core/history';
import Topbar from "./layout/TopBar";
import TransformCanvas from "./core/TransformCanvas";
import NotificationService from "./services/NotificationService";
import MeshCanvas from "./core/MeshCanvas";
import UIControls from "./core/UIControls";
import ResizeTool from "./tools/ResizeTool";
import ToolManager from "./tools/ToolManager";
import Historybar from './layout/Historybar';

console.log("fitcropedit.js");

function bootstrap(params) {
  const stateService = new StateService();
  stateService.updateState(params);

  const history = new History(stateService);
  const deviceService = new DeviceService(stateService);

  //template
 
  const historybar = new Historybar(stateService, history)
  const appbar = new Appbar(stateService);
  const topbar = new Topbar(stateService);
  const leftSidebar = new LeftSidebar(stateService);
  const mainCanvas = new MainCanvas(stateService);
  const rightSidebar = new Rightsidebar(stateService);
  const template = new Template(stateService, deviceService, mainCanvas);
  //
  const uiControls = new UIControls(stateService);

  const transformCanvas = new TransformCanvas();
  const meshCanvas = new MeshCanvas(stateService, mainCanvas);

  const notificationService = new NotificationService(stateService, uiControls);

  const originImage = new OriginImage(stateService, mainCanvas, meshCanvas);

  //tools


  const resizeTool = new ResizeTool(stateService, uiControls, originImage, transformCanvas);

  const toolManager = new ToolManager(uiControls, resizeTool);

  const imageLoader = new ImageLoader(
    stateService,
    transformCanvas,
    originImage,
    notificationService,
    uiControls,
    toolManager,
    history, historybar
  );

  const resizeService = new ResizeService(stateService, deviceService, mainCanvas);

  const imageProcessor = new ImageProcessor(
    stateService,
    deviceService,
    resizeService,
    mainCanvas,
    originImage,
    meshCanvas
  );

  const controls = new Controls(stateService, imageLoader, mainCanvas, originImage, uiControls, history, historybar, toolManager);
}

window.fitcropedit = {
  init(params = {}) {
    bootstrap(params);
  },
};
