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
import History from "./core/history";
import Topbar from "./layout/TopBar";
import TransformCanvas from "./core/TransformCanvas";
import NotificationService from "./services/NotificationService";
import MeshCanvas from "./core/MeshCanvas";
import DomHandler from "./core/DomHandler";
import ResizeTool from "./tools/ResizeTool";
import ToolsManager from "./tools/ToolsManager";
import Historybar from "./layout/Historybar";
import ProgressbarService from "./services/progressbarService";
import CloseIconButton from "./layout/elements/CloseIconButton";
import ImageAnalyzer from './services/ImageAnalyzer';
import InfoService from './services/InfoService';
import MirrorTool from './tools/MirrorTool';
import RotateTool from './tools/RotateTool';
import ZoomTool from './tools/ZoomTool';
import HandTool from './tools/HandTool';

if (!window.document) {
  throw new Error("Ficropedit requires a window with a document");
}

console.log("fitcropedit.js");

function bootstrap(params) {
  const stateService = new StateService();
  stateService.updateState(params);

  const domHandler = new DomHandler(stateService);
  const history = new History(stateService, domHandler);
  const deviceService = new DeviceService(stateService);
  //elements
  const closeIconButton = new CloseIconButton();

  //templates
  const historybar = new Historybar(stateService, history);
  const appbar = new Appbar(stateService, domHandler);
  const txopbar = new Topbar(stateService, domHandler);
  const leftSidebar = new LeftSidebar(stateService, domHandler);
  const mainCanvas = new MainCanvas(stateService, domHandler);
  const rightSidebar = new Rightsidebar(stateService, domHandler);
  const template = new Template(stateService, deviceService, mainCanvas, domHandler);
  //

  const progressbarService = new ProgressbarService(stateService);

  const transformCanvas = new TransformCanvas();
  const meshCanvas = new MeshCanvas(stateService, mainCanvas);



  const notificationService = new NotificationService(stateService, domHandler);

  const originImage = new OriginImage(stateService, mainCanvas, meshCanvas);

  const imageAnalyzer = new ImageAnalyzer(stateService, originImage, transformCanvas);
  const infoService = new InfoService(stateService, domHandler, closeIconButton);

  //tools

  const resizeTool = new ResizeTool(
    stateService,
    history,
    domHandler,
    originImage,
    transformCanvas,
    progressbarService
  );
  const mirrorTool = new MirrorTool(originImage, transformCanvas, history, progressbarService);
  const rotateTool = new RotateTool(stateService, originImage, transformCanvas, domHandler, history, progressbarService)
  const zoomTool = new ZoomTool(originImage, domHandler);
  const handTool = new HandTool(originImage, mainCanvas);
  const toolsManager = new ToolsManager(stateService, originImage, domHandler, notificationService,
    closeIconButton, resizeTool, mirrorTool, rotateTool, zoomTool, handTool);

  const imageLoader = new ImageLoader(
    stateService,
    transformCanvas,
    originImage,
    notificationService,
    domHandler,
    toolsManager,
    history,
    progressbarService, imageAnalyzer
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

  const controls = new Controls(
    stateService,
    imageLoader,
    mainCanvas,
    originImage,
    domHandler,
    history,
    historybar,
    progressbarService,
    toolsManager,
    infoService,
    notificationService
  );
}

window.fitcropedit = {
  init(params = {}) {
    bootstrap(params);
  },
};
