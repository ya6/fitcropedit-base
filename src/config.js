export const initParams = {
  canvasMultiplier: 1,
  rootSelector: "fitcropedit",
  rootElement: null,
  mainCanvasSelector: "fc-main-canvas",
  selectors: { // Ensure that the selectors match those in fitcropedit.css
    appbarFileInputSelector: "fc-appbar-file-input",
  },
  elements: {
    appbarFileInputElement: null,
  },
  template: {
    containerWidth: '80%',
    containerHeight: '600px',
    appbarHeight: 32,
    leftSidebarWidth: 100,
    rightSidebarWidth: 250,
  },
};
