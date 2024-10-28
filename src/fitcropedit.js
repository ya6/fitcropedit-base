import StateManager from "./StateManager";
import MainCanvas from "./MainCanvas";

console.log("fitcropedit.js");

const stateManager = new StateManager();

function main() {
  const container = document.getElementById("fitcropedit");

  //
  const mainCanvas = new MainCanvas(container, stateManager);
}

window.fitcropedit = {
  init(params) {
    stateManager.updateState(params);
    main();
  },
};
