export const initParams = {
  public: { canvasMultiplier: 1, containerWidth: "80%", containerHeight: "600px", imageDisplayScale: 0.95 },

  device: {
    type: "",
    width: 0,
    height: 0,
    mobileBP: 768,
  },

  image: {
    isLoaded: false,
  },

  rootSelector: "fitcropedit",
  rootElement: null,
  appbarSelector: "fc-appbar",
  appbarElement: null,
  topbarSelector: "fc-topbar",
  topbarElement: null,
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
    appbarCloseButtonSelector: "fc-appbar-close-button",
    topbarWidthSelector: "fc-topbar-width",
    topbarHeightSelector: "fc-topbar-height",
    rightSidebarCloseButtonSelector: "fc-rightsidebar-close-button",
    rightSidebarSaveButtonSelector: "fc-rightsidebar-save-button",
  },
  elements: {
    appbarFileInputElement: null,
    appbarCloseButtonElement: null,
    topbarWidthElement: null,
    topbarWidthElement: null,
    rightSidebarCloseButtonElement: null,
  },
  template: {
    mobileContainerHeight: "95vh",
    mobileContainerWidth: "95vw",
    appbarHeight: 32,
  },
  data: {
    baseImage: {
      postfix: "-fce",
      fullName: "",
      name: "",
      ext: "",
      type: "",
      size: 0,
      lastModified: 0,
      format: { png: "png", jpeg: "jpg", webp: "webp" },
    },
  },
};
