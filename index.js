const ActionsItems = { pen: "pen", eraser: "eraser" };
let globalCompositeOperationSetting = "source-over";
let currnetItem = null;
const canvas = document.getElementById("canvas");
canvas.width = window?.innerWidth;
canvas.height = window?.innerHeight;
let isDragging = false;
let ctx = null;
if (canvas.getContext) {
  ctx = canvas.getContext("2d");
} else {
  throw new Error("Canvas context is not found");
}
ctx.globalCompositeOperation = globalCompositeOperationSetting;
ctx.lineWidth = 15;
ctx.lineCap = "round";
ctx.strokeStyle = "#ffa100";

//-----

const gco = document.getElementById("gco-wrapper");

const GCO_JSON = [
  "source-over",
  "source-in",
  "source-out",
  "source-atop",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

function createGcos() {
  GCO_JSON.map((item) => {
    const gcoEntity = document.createElement("button");
    gcoEntity.classList.add("gco-entity");
    gcoEntity.textContent = item;
    gcoEntity.addEventListener("click", () => {
      globalCompositeOperationSetting = item;
    });
    gco.appendChild(gcoEntity);
  });
}
createGcos();

//---

const penBtn = document.getElementById("pen-btn");
const eraserBtn = document.getElementById("eraser-btn");
penBtn.addEventListener("click", () => {
  currnetItem = ActionsItems.pen;
});
eraserBtn.addEventListener("click", () => {
  currnetItem = ActionsItems.eraser;
});

function handlewindowResize() {
  canvas.width = window?.innerWidth;
  canvas.height = window?.innerHeight;
}
window.addEventListener("resize", handlewindowResize, false);

canvas.addEventListener("mousedown", handleOnCanvasMouseDown);
canvas.addEventListener("mousemove", handleOnCanvasMouseMove);
canvas.addEventListener("mouseup", handleOnCanvasMouseUp);
canvas.addEventListener("mouseout", handleOnCanvasMouseOut);

function handleOnCanvasMouseDown(e) {
  isDragging = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
}
function handleOnCanvasMouseMove(e) {
  if (isDragging === true) {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}
function handleOnCanvasMouseUp() {
  isDragging = false;
}
function handleOnCanvasMouseOut() {
  isDragging = false;
}
