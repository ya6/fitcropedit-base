import StateManager from "./StateManager";
import MainCanvas from "./MainCanvas";
import Appbar from "./layout/Appbar";
import LeftSidebar from "./layout/LeftSidebar";

console.log("fitcropedit.js");

const container = document.getElementById("fitcropedit");
const stateManager = new StateManager();

function bootstrap(params) {
  stateManager.updateState(params);

  container.style.width = stateManager.state.template.containerWidth;
  container.style.height = stateManager.state.template.containerHeight;

  //template
  const appbar = new Appbar(container, stateManager);
  const leftSidebar = new LeftSidebar(container, stateManager);
  const mainCanvas = new MainCanvas(container, stateManager);

  const resizeObserver = new ResizeObserver((entries) => {
    stateManager.state.template.containerWidth = entries[0].target.clientWidth;
    stateManager.state.template.containerHeight = entries[0].target.clientHeight;

    mainCanvas.init();
  });

  resizeObserver.observe(container);

  //
}

// function main() {
//   //template
//   new Navbar(container, stateManager);
//   new LeftSidebar(container, stateManager);
//   new MainCanvas(container, stateManager);
// }

window.fitcropedit = {
  init(params) {
    bootstrap(params);
  },
};
