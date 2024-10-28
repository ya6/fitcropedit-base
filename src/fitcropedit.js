
import { initParams } from "./config";

console.log("fitcropedit.js");

const { canvasMultiplier } = initParams;

const container = document.getElementById("fitcropedit");

const canvas = document.getElementById("fc-canvas");
const ctx = canvas.getContext("2d");

const resizeObserver = new ResizeObserver((entries) => {
  const containerWidth = entries[0].target.clientWidth;
  const containeHeight = entries[0].target.clientHeight;
  canvas.width = containerWidth * canvasMultiplier;
  canvas.height = containeHeight * canvasMultiplier;
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);
});

resizeObserver.observe(container);
