export const initParams = {
  device: {
    type: "",
    width: 0,
    height: 0,
    mobileBP: 768
  },

  image:{
    isLoaded: false
  },

  canvasMultiplier: 1,
  rootSelector: "fitcropedit",
  rootElement: null,
  appbarSelector: "fc-appbar",
  appbarElement: null,
  leftSidebarSelector: "fc-left-sidebar",
  leftSidebarElement: null,
  rightSidebarSelector: "fc-right-sidebar",
  rightSidebarElement: null,
  wraperSelector: "fc-wraper",
  wraperElement: null,
  mainCanvasWraperSelector: "fc-main-canvas-wraper",
  mainCanvasWraperElement: null,
  mainCanvasSelector: "fc-main-canvas",
  mainCanvasElement: null,
  selectors: {
    // Ensure that the selectors match those in fitcropedit.css
    appbarFileInputSelector: "fc-appbar-file-input",
  },
  elements: {
    appbarFileInputElement: null,
  },
  template: {
    containerWidth: "80%",
    containerHeight: "600px",
    mobileContainerHeight: "95vh",
    mobileContainerWidth: "95vw",
    appbarHeight: 32,
    // leftSidebarWidth: 100,
    // rightSidebarWidth: 250,
  },
};
