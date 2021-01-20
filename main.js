window.onload = () => {
  let canvas = document.querySelector("canvas");

  setCanvasRenderResolutionToStyleSize(canvas);

  // Canvas contextet 'ctx' är ett objekt som har
  // allt vi behöver för att rita i canvas.
  // Precis som att DOM 'document' var allt vi behövde
  // för att ändra på innehållet i en webbsida.
  let ctx = canvas.getContext("2d");

  // UTMANING: DOM navigation
  // använd er av drawLine och drawElem funktionerna
  // för att rita upp hela HTML strukturen i <body>
  // elementet på sidan'
  //
  // Läs på https://www.w3schools.com/Js/js_htmldom_navigation.asp
  // för att se hur ni kan automatisera processen istället
  // för att göra som jag gjort nedan, skrivit för hand.

  // Exempel kod
  let body = document.querySelector("body");

  drawLine(ctx, 200, 100, 100, 200);
  drawLine(ctx, 200, 100, 300, 200);

  drawElem(ctx, body, 200, 100);
  drawElem(ctx, body.children[0], 100, 200);
  drawElem(ctx, body.children[1], 300, 200);

  // Ett lösningsförslag
  /*
  let body = document.querySelector("body");
  // en gång med linjer
  lösningsFörslag(ctx, body);
  // en gång med bara lådor
  lösningsFörslag(ctx, body, ritaLinjer=false);
  */
};

// Ritar upp en representation av ett element
// centrerat på de givna x,y koordinaterna
let drawElem = (ctx, elem, x, y) => {
  let w = 100;
  let h = 60;

  // fyll insidan med vitt
  ctx.fillStyle = "white";
  ctx.fillRect(x - w / 2, y - h / 2, w, h);

  // rita rektangelns kant
  ctx.beginPath();
  ctx.rect(x - w / 2, y - h / 2, w, h);
  ctx.stroke();

  // rita elementets tag namn
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(elem.nodeName, x, y);
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

let lösningsFörslag = (ctx, startElem, ritaLinjer=true) => {
  //I början har vi bara en förälder
  let föräldrar = [startElem];

  // för varje rad i min bild..
  for (let rad = 0; rad < 6; rad++) {
    // samla alla barn i en lista
    let barnen = [];
    // för varje förälder..
    for (let i = 0; i < föräldrar.length; i++) {
      let förälder = föräldrar[i];
      // för varje barn till en förälder..
      for (let j = 0; j < förälder.children.length; j++) {
        // kom ihåg barnet
        barnen.push(förälder.children[j]);
      }
    }

    // Skapa sex jämt fördelade platser
    let platser = [];
    let antalPlatser = 6;
    let space = ctx.canvas.width / (antalPlatser + 1);
    for (let i = 0; i < antalPlatser; i++) {
      let plats = {
        x: space * (i + 1), // öka x avstånd för varje i
        y: 100 * (rad + 1), // öka y för varje rad i bilden
      };
      platser.push(plats);
    }

    // för varje förälder..
    for (let i = 0; i < föräldrar.length; i++) {
      // Hämta en plats och förälder
      let plats = platser.pop();
      let förälder = föräldrar[i];

      // rita föräldern
      drawElem(ctx, förälder, plats.x, plats.y);

      // <JS knep!>
      // man kan lägga till medlemmar till
      // vilka objekt somhelst, närsomhelst.

      // Kom ihåg förälderns plats (framtida farfars plats)
      förälder.plats = plats;

      if (rad !== 0 && ritaLinjer) {
        // Om det inte är första raden
        // kolla farfars plats
        let farfPlats = förälder.parentNode.plats;
        // rita linje från farfar till förälder
        drawLine(ctx, plats.x, plats.y, farfPlats.x, farfPlats.y);
      }
    }

    // för nästa rad i bilden är alla barn nu föräldrar
    föräldrar = barnen;
  }
};
