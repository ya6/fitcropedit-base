
import { initParams } from "./config";
import { MainCanvas } from './MainCanvas';

console.log("fitcropedit.js");

const { canvasMultiplier } = initParams;
const container = document.getElementById("fitcropedit");

const mainCanvas = new MainCanvas(container, canvasMultiplier);


