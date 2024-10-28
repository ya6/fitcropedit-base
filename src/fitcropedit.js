import StateManager from "./StateManager";
import MainCanvas from "./MainCanvas";

console.log("fitcropedit.js");

const stateManager = new StateManager()

const { canvasMultiplier } = stateManager.state;

const container = document.getElementById("fitcropedit");

const mainCanvas = new MainCanvas(container, canvasMultiplier);
