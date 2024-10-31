import StateManager from "./StateManager";
import MainCanvas from "./MainCanvas";
import Navbar from './layout//Navbar';


console.log("fitcropedit.js");

const stateManager = new StateManager();

function main() {
  const container = document.getElementById("fitcropedit");

  //template
  new Navbar(container, stateManager)

  const mainCanvas = new MainCanvas(container, stateManager);
}

window.fitcropedit = {
  init(params) {
    stateManager.updateState(params);
    main();
  },
};
