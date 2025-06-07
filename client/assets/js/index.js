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
    text: `They both count as the most prolific\npaleontologists. Marsh made the \nmost of the contributions, with \nmore than 30 new species of dinosaurs.\n Although Cope only counted 3 valid classifications,\n he was better known for contributions to ichtiology and herpetology.`,
  },
   desk_black: {
    x: 0,
    y: 470/proport + addedH,
  },
   craneo_black: {
    x: 200/proport,
    y: 370/proport + addedH,
    text: `Both had distorded views about the evolution\nof humans. Marsh took bones from native american graves\nto verify if they were less evolved that white men.\nCope (and probably Marsh too) believed that brain size was\nrelated to intelligence. Actually, before dying he donated\nhis body to science not without challenging Marsh to do the same,\nto let others measure their brains and prove who was the most intelligent of both.\n\nMarsh didn't do that.`,
  },
   paper_black: {
    x: 60/proport,
    y: 570/proport + addedH,
    text: `Cope was the most prolifc author, with around 1500 papers\nwith vivid descriptions of his findings. Marsh was less prolific but more systematic\nin his descriptions.\nMarsh had an enourmous impact on the scientific development\nof the paleontology, but Cope had a big influence in our view of\nthe pre-historic environment.`,
  },
   bone_black: {
    x: 400/proport,
    y: 170/proport + addedH,
    text: `One of the bad consequences of the war\n was the number of errors they made while\nrushing their classifications.\nCope was who got it wrong most of the times.\nFrom 30 classifications of "new to science", only 3 are currently valid.\nMarsh made 58 classifications but got 20 wrong.`,
  },
   book_black: {
    x: 0,
    y: 430/proport + addedH,
    text:``
  },

};

const facts = {
    6: `Marsh and Cope count as the most prolific\npaleontologists of the XIX century. Marsh made the \nmost of the contributions, with \nmore than 30 new species of dinosaurs.\n Although Cope only counted 3 valid \nclassifications, he was better known \nfor contributions \nto ichtiology and herpetology.`,
    7: ``,
    8: `Both had distorded views about the evolution\nof humans. Marsh took bones from native american graves\nto verify if they were less evolved that white men.\nCope (and probably Marsh too) believed that brain size was\nrelated to intelligence. Actually, before dying he donated\nhis body to science not without challenging Marsh to do the same,\nto let others measure their brains and prove who was the most intelligent of both.\n\nMarsh didn't do that.`,
    9: `Cope was the most prolifc author, with around 1500 papers\nwith vivid descriptions of his findings. Marsh was less prolific but more systematic\nin his descriptions.\nMarsh had an enourmous impact on the scientific development\nof the paleontology, but Cope had a big influence in our view of\nthe pre-historic environment.`,
    10: `One of the bad \nconsequences of the\n war was the number of \nerrors they made while\nrushing their\nclassifications. Cope \nwas who got it wrong\nmost of the times.\nFrom 30 "new to \nscience" classifications,\n only 3 are currently \nvalid.\nMarsh made 58\nclassifications but got\n    20 wrong.`,
    11: ``
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
  //x:0,
  //y: 200,
  x: 355,
  y:120,
  fontSize: 25,
  fontFamily: 'Calibri',
  fill: 'white',
  //align: 'center',
  // for center align we need to set offset
  //offsetX: 200,
});

background.add(messageText02);

function updateMessage(text) {
  messageText02.text(text);
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
        console.log(outline._id);
        //console.log(animalLayer.children);
        for(let outIndex in animalLayer.children){
            let out = animalLayer.children[outIndex];
            if(out._id != outline._id){
                if(out.opacity() === 1.0){
                    if((outline._id != 6 && out._id != 7) || outline._id == 6){
                        out.opacity(0);
                    };
                    out.listening(false);
                    updateMessage(facts[outline._id]);
                }else{
                    out.opacity(1.0);
                    out.listening(true);
                    updateMessage();
                }
            }


        }

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
