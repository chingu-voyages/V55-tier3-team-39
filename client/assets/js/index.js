// create stage
const stage = new Konva.Stage({
  container: 'container',
  width: 578,
  height: 530,
});

const background = new Konva.Layer();
const animalLayer = new Konva.Layer();
const animalShapes = [];
let score = 0;

// create and load background image
const backgroundImage = new Image();
backgroundImage.onload = function() {
  const backgroundKonvaImage = new Konva.Image({
    image: backgroundImage,
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
  });
  background.add(backgroundKonvaImage);
  backgroundKonvaImage.moveToBottom();
};
backgroundImage.src = '../assets/img/beach.png';

// image positions
const animals = {
  monkey: {
    x: 275,
    y: 70,
  },
  dino: {
    x: 2,
    y: 70,
  },
};

const outlines = {
  monkey_black: {
    x: 300,
    y: 420,
  },
 dino_black: {
    x: 3,
    y: 420,
  },
};

function isNearOutline(animal, outline) {
  const a = animal;
  const o = outline;
  const ax = a.x();
  const ay = a.y();

  if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
    return true;
  } else {
    return false;
  }
}

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

function loadImages(sources, callback) {
  const assetDir = '../assets/img/';
  const images = {};
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
    images[src].width = images[src].width / 3; //this value should depend on existing viewport size
    images[src].height = images[src].height / 3;
  }
}

function initStage(images) {
  // create draggable animals
  for (const key in animals) {
    // anonymous function to induce scope
    (function () {
      const privKey = key;
      const anim = animals[key];

      const animal = new Konva.Image({
        image: images[key],
        x: anim.x,
        y: anim.y,
        draggable: true,
      });
      console.log(animal);

      animal.on('dragstart', function () {
        this.moveToTop();
      });
      
      /*
       * check if animal is in the right spot and
       * snap into place if it is
       */
      animal.on('dragend', function () {
        const outline = outlines[privKey + '_black'];
        if (!animal.inRightPlace && isNearOutline(animal, outline)) {
          animal.position({
            x: outline.x,
            y: outline.y,
          });
          animal.inRightPlace = true;

          if (++score >= 4) {
            const text = 'You win! Enjoy your booty!';
            updateMessage(text);
          }

          // disable drag and drop
          setTimeout(function () {
            animal.draggable(false);
          }, 50);
        }
      });
      
      // make animal glow on mouseover
      animal.on('mouseover', function () {
        animal.image(images[privKey + '_glow']);
        console.log(images[privKey]);
        document.body.style.cursor = 'pointer';
      });
      
      // return animal on mouseout
      animal.on('mouseout', function () {
        animal.image(images[privKey]);
        document.body.style.cursor = 'default';
      });

      animal.on('dragmove', function () {
        document.body.style.cursor = 'pointer';
      });

      animalLayer.add(animal);
      animalShapes.push(animal);
    })();
  }

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
  beach: 'beach.png',
//   monkey: 'monkey.png',
//   monkey_glow: 'monkey-glow.png',
//   monkey_black: 'monkey-black.png',
  dino: 'dinoheadtransparent.png',
  dino_glow: 'dinoheadtransparent.png',
  dino_black: 'dinoheadtransparent.png',
};

// Demo warning: You'll need local image files for this demo to work
loadImages(sources, initStage);
