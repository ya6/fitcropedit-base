export const initParams = {
  public: { canvasMultiplier: 1, containerWidth: "80%", containerHeight: "600px", imageDisplayScale: 0.95 },

  device: {
    type: "",
    width: 0,
    height: 0,
    mobileBP: 768,
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
  historybarSelector: "fc-historybar",
  historybarElement: null,
  wraperSelector: "fc-wraper",
  wraperElement: null,
  mainCanvasWraperSelector: "fc-main-canvas-wraper",
  mainCanvasWraperElement: null,
  mainCanvasSelector: "fc-main-canvas",
  mainCanvasElement: null,
  selectors: {
    // Ensure that the selectors match those in fitcropedit.css
    appbarFileInputSelector: "fc-appbar-file-input",
    topbarWidthSelector: "fc-topbar-width",
    topbarHeightSelector: "fc-topbar-height",
    topbarFormatSelector: "fc-topbar-format",
    progressbarSelector: "fc-progressbar",

    rightSidebarCloseButtonSelector: "fc-rightsidebar-close-button",
    rightSidebarSaveButtonSelector: "fc-rightsidebar-save-button",
    rightSidebarFormatBoxSelector: "fc-rightsidebar-format-box", //? box
    rightSidebarOutpitFormatSelector: "fc-rightsidebar-outpit-format-element",
    rightSidebarToolsContainerSelector: "fc-rightsidebar-tools-container-element",
    rightSidebarHistoryContainerSelector: "fc-rightsidebar-history-container-element",

    leftsidebarResizeSelector: "fc-leftsidebar-resolution-button",
    //tools
    rightSidebarResizeToolSelector: "fc-rightsidebar-resize-tool",

    historybarContentSelector: "fc-historybar-content",
  },
  elements: {
    appbarFileInputElement: null,
    topbarWidthElement: null,
    topbarWidthElement: null,
    topbarFormatElement: null,
    progressbarElement: null,

    rightSidebarCloseButtonElement: null,
    rightSidebarFormatBoxElement: null,
    rightSidebarOutpitFormatElement: null,
    rightSidebarToolsContainerElement: null,
    rightSidebarHistoryContainerElement: null,
    leftsidebarResizeElement: null,
    historybarContentElement: null,

    //tools
    rightSidebarResizeToolElement: null,
  },
  template: {
    mobileContainerHeight: "95vh",
    mobileContainerWidth: "95vw",
    rightSidebarWidth: 200,
  },
  data: {
    baseImage: {
      isLoaded: false,
      width: 0,
      height: 0,
      ratioWH: 0, // ? dangerous
      fullName: "",
      name: "",
      ext: "",
      type: "",
      size: 0, // ? if resize applied
      lastModified: 0,
      format: "",
      outputFormat: "",
    },
    postfix: "-fce",
    // formatList: { png: "png", jpeg: "jpg", webp: "webp", gif: "gif", bmp: "bmp" },
    resize: {
      min: 10,
      max: 6000,
    },
  },
};
