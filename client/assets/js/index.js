// create stage
const addedH = 50;
const proport = 2;
const originalImgSize = 1200;
const longTextSpacing = ' '.repeat(32);

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

const facts = {
    6: {
      text:`Marsh and Cope count as the most prolific\npaleontologists of the XIX century. Marsh made the \nmost of the contributions, with \nmore than 30 new species of dinosaurs.\n\nAlthough Cope only counted 3 valid \nclassifications, he was better known \nfor contributions \nto ichtiology and herpetology.`,
      coords:{
        x:0,
        y:200,
      }
    },
    7: {
      text:``,
      coords:{
        x:0,
        y:0
      }
    },
    8: {
      text:`Both had distorded views about the \nevolution of humans. Marsh took bones\nfrom native American graves to verify if \nthey were less evolved that white men.\n\n${longTextSpacing}Cope (and probably\n${longTextSpacing}Marsh too) believed\n${longTextSpacing}that brain size was\n${longTextSpacing}related to intelligence.\n${longTextSpacing}Actually, before dying\n${longTextSpacing}Cope donated his body\n${longTextSpacing}to science not without\n${longTextSpacing}challenging Marsh to\n${longTextSpacing}  do the same, to let\n${longTextSpacing}   others measure their\n${longTextSpacing}   brains and determine\n${longTextSpacing}  who was the smartest\n${longTextSpacing}   of the two.\n\n                         Marsh declined the offer.`,
      coords:{
        x: 180,
        y: 135
      }
    },
    9: {
      text: `Cope was the most prolifc author, with\naround 1500 papers with vivid\ndescriptions of his findings.\nMarsh was less prolific but more\n${longTextSpacing} systematic in his\n${longTextSpacing}descriptions.\n\n${longTextSpacing}  Marsh had an\n${longTextSpacing} enourmous impact\n${longTextSpacing} on the scientific\n${longTextSpacing} development of\n${longTextSpacing} paleontology,\n${longTextSpacing} but Cope had a big\n${longTextSpacing}    influence in our\n${longTextSpacing}   view of pre-historic\n${longTextSpacing}   environments.`,
      coords:{
        x: 180,
        y: 150
      }
    },
    10: {
      text:`One of the bad \nconsequences of the\n war was the number of \nerrors they made while\nrushing their\nclassifications. Cope \nwas who got it wrong\n most of the times.\n From 30 "new to \n science" classifications,\n only 3 are currently \n valid.\n\n Marsh made 58\n    classifications but got\n     20 wrong.`,
      coords:{
        x:355,
        y:120,
      }
    },
    11: {
      text:``,
      coords:{
        x:0,
        y:0
      }
    },
}


// create message text
const messageText = new Konva.Text({
  text: 'BONE WARS FACTS\n\n(click on the objects in the office)',
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

// create message text
const messageText02 = new Konva.Text({
  text: '',
  x: 0,
  y: 0,
  fontSize: 50/proport,
  fontFamily: 'Calibri',
  fill: 'white',
  //align: 'center',
  // for center align we need to set offset
  //offsetX: 200,
});

background.add(messageText02);

function updateMessage(text, coords) {
  messageText02.text(text);
  messageText02.x(coords.x);
  messageText02.y(coords.y);
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
        opacity: 1.,
       });

      outline.on('click', ()=>{
        //console.log(outline);
        //console.log(animalLayer.find('_id'));
        //console.log(outline._id);
        //console.log(animalLayer.children);
        for(let outIndex in animalLayer.children){
            let out = animalLayer.children[outIndex];
            if(out._id != outline._id){
                if(out.opacity() === 1.0){
                    if((outline._id != 6 && out._id != 7) || outline._id == 6){
                        out.opacity(0);
                    };
                    out.listening(false);
                }else{
                    out.opacity(1.0);
                    out.listening(true);
                }
            }
        }
        console.log(messageText02.text());
        messageText02.text() == ''? updateMessage(facts[outline._id].text, facts[outline._id].coords): updateMessage('', {x:0, y:0});
      });

      animalLayer.add(outline);
    })();
  }


  stage.add(background);
  stage.add(animalLayer);

  //updateMessage();
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
