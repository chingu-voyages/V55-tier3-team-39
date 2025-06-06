// create stage
const addedH = 50;
const proport = 2;
const originalImgSize = 1200;

const stage = new Konva.Stage({
  container: 'container',
  width: originalImgSize/proport,
  height: originalImgSize/proport + addedH,

});

const background = new Konva.Layer();
const animalLayer = new Konva.Layer();
const animalShapes = [];
let score = 0;



const outlines = {

 dino_black: {
    x: 690/proport,
    y: 400/proport + addedH,
  },
   desk_black: {
    x: 0,
    y: 470/proport + addedH,
  },
   craneo_black: {
    x: 200/proport,
    y: 370/proport + addedH,
  },
   paper_black: {
    x: 60/proport,
    y: 570/proport + addedH,
  },
   bone_black: {
    x: 400/proport,
    y: 170/proport + addedH,
  },
   book_black: {
    x: 0,
    y: 430/proport + addedH,
  },

};


// create message text
const messageText = new Konva.Text({
  text: 'Ahoy! Put the animals on the beach!',
  x: stage.width() / 2,
  y: 40,
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'white',
  align: 'center',
  // for center align we need to set offset
  offsetX: 200,
});
background.add(messageText);

function updateMessage(text) {
  messageText.text(text);
}

const images = {};

function loadImages(sources, callback) {
  const assetDir = '../assets/img/';
  let loadedImages = 0;
  let numImages = 0;
  
  for (const src in sources) {
    numImages++;
  }
  
  for (const src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = assetDir + sources[src];
    images[src].width = images[src].width / proport; //this value should depend on existing viewport size
    images[src].height = images[src].height / proport;
  }
}

function initStage(images) {

  // create animal outlines
  for (const key in outlines) {
    // anonymous function to induce scope
    (function () {
      const imageObj = images[key];
      const out = outlines[key];

      const outline = new Konva.Image({
        image: imageObj,
        x: out.x,
        y: out.y,
      });

      animalLayer.add(outline);
    })();
  }

  stage.add(background);
  stage.add(animalLayer);

  updateMessage(
    'Ahoy! Put the animals on the beach!'
  );
}

const sources = {
  dino_black: 'dinoheadtransparent.png',
  book_black: 'booktransparent.png',
  craneo_black: 'craneotransparent.png',
  paper_black: 'papertransparent.png',
  bone_black: 'bonetransparent.png',
  desk_black: 'desktransparent.png'

};

// Demo warning: You'll need local image files for this demo to work
loadImages(sources, initStage);
