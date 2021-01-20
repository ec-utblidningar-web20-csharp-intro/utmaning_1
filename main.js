window.onload = () => {
  let body = document.querySelector("body");
  let canvas = document.querySelector("canvas");

  setCanvasRenderResolutionToStyleSize(canvas);

  // Canvas contextet 'ctx' är ett objekt som har
  // allt vi behöver för att rita i canvas.
  // Precis som att DOM 'document' var allt vi behövde
  // för att ändra på innehållet i en webbsida.
  let ctx = canvas.getContext("2d");
  
  drawLine(ctx, 200, 100, 100, 200);
  drawLine(ctx, 200, 100, 300, 200);

  drawElem(ctx, body, 200, 100);
  drawElem(ctx, body.children[0], 100, 200);
  drawElem(ctx, body.children[1], 300, 200);
};

// Ritar upp en representation av ett element
// centrerat på de givna x,y koordinaterna
let drawElem = (ctx, elem, x, y) => {
  let w = 100;
  let h = 60;

  // rita rektangeln
  ctx.beginPath();
  ctx.rect(x - w / 2, y - h / 2, w, h);
  ctx.stroke();

  // rita elementets tag namn
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = "20px Arial";
  ctx.fillText(elem.tagName, x, y);
};

let drawLine = (ctx, x0, y0, x1, y1) => {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
};

let setCanvasRenderResolutionToStyleSize = (canvas) => {
  let posInfo = canvas.getBoundingClientRect();
  canvas.width = posInfo.width;
  canvas.height = posInfo.height;
};
