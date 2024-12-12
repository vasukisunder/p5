let currentScene = 'welcome';
let playerX, playerY, handX, handY;

let sofa, player, plant, hand, bookScene, bookshelf, scroll, painting1, painting2, rug, flower1, flower2, outside;

let card = false;

let bg = ['#6d6875', '#b5838d', '#e5989b', '#ffb4a2', '#ffcdb2'];


let music;

// Add these variables to store pre-processed images
let resizedImages = {};
let blurredBackground;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  angleMode(DEGREES);
  noStroke();
  
  // Pre-process image resizing
  resizedImages.player = player.get();
  resizedImages.player.resize(50, 0);
  resizedImages.hand = hand.get();
  resizedImages.hand.resize(80, 0);
  resizedImages.rug = rug.get();
  resizedImages.rug.resize(250, 120);
  resizedImages.bookshelf = bookshelf.get();
  resizedImages.bookshelf.resize(220, 170);
  resizedImages.flower1 = flower1.get();
  resizedImages.flower1.resize(80, 0);
  resizedImages.sofa = sofa.get();
  resizedImages.sofa.resize(220, 0);
  resizedImages.flower2 = flower2.get();
  resizedImages.flower2.resize(80, 0);
  resizedImages.painting1 = painting1.get();
  resizedImages.painting1.resize(80, 80);
  resizedImages.painting2 = painting2.get();
  resizedImages.painting2.resize(80, 80);
  
  // Pre-render blurred background
  blurredBackground = createGraphics(600, 400);
  blurredBackground.noStroke();
  for (let a = 0; a < bg.length; a++) {
    blurredBackground.fill(bg[a]);
    blurredBackground.rect(0, a*80, 600, (a+1)*80);
  }
  blurredBackground.filter(BLUR, 20);

  playerX = 300; 
  playerY = 300; 

  // Start music after user interaction
  canvas.mousePressed(() => {
    if (music.isLoaded() && !music.isPlaying()) {
      music.loop();
    }
  });
}

function preload() {
  sofa = loadImage('sketches/game/assets/sofa.png');
  player = loadImage('sketches/game/assets/player.png');
  hand = loadImage('sketches/game/assets/hand.png');
  bookScene = loadImage('sketches/game/assets/books.png');
  bookshelf = loadImage('sketches/game/assets/bookshelf.png');
  scroll = loadImage('sketches/game/assets/scroll.png');
  painting1 = loadImage('sketches/game/assets/waterlilies.png');
  painting2 = loadImage('sketches/game/assets/waterlilies2.png');
  rug = loadImage('sketches/game/assets/rug.png');
  flower1 = loadImage('sketches/game/assets/flower1.png');
  flower2 = loadImage('sketches/game/assets/flower2.png');
  outside = loadImage('sketches/game/assets/night.jpeg');
  
  music = loadSound('sketches/game/assets/indigo.mp3');
  font = loadFont('sketches/game/assets/rainyhearts.ttf');
}

function draw() {
  background(220);
  switch (currentScene) {
    case "welcome":
      drawWelcome();
      break;
    case "books":
      drawBooks();
      break;
    case "home":
      drawHome();
      break;
    case "outside":
      drawOutside();
      break;
  }
  

  
  push()
  textSize(10);
    // text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  pop()
}


function keyPressed() {
  if (key === ' ') {
    card = true;
  }
}

function keyReleased() {
  if (key === ' ') {
    card = false;
  }
}

function drawWelcome() {
  // Use pre-rendered background
  image(blurredBackground, 0, 0);
  
  textAlign(CENTER);
  push()
  rectMode(CORNER);
  for (let a = 0; a < bg.length; a++){
    fill(bg[a]);
    rect(0, a*80, 600, (a+1)*80);
      filter(BLUR, 20);

  }
  pop()
  
  
  fill("#2e222f");
  textSize(60);
  textFont(font);
  text("Living Room", 300, 120);
  textSize(20);
  text("Welcome to my space! \n Use the arrow keys to walk around \n and learn a little about me.", 300, 170);
  
      fill("#753c54"); 

  rect(225, 250, 150, 30);
  fill("#fff")
  textSize(18);
  text("enter?", 300, 270);
  
  if (
    mouseX > 225 &&
    mouseX < 225 + 150 &&
    mouseY > 250 &&
    mouseY < 250 + 30
  ) {
  fill("#ed8099"); 
  rect(225, 250, 150, 30);
    fill("#fff");
      text("enter!", 300, 270);
    
    if(mouseIsPressed){
      currentScene = "home";
    }

  }
  
  
  push()
  textSize(12);
    fill("#966c6c");

  textAlign(LEFT);
  text("artwork from Adobe Stock", 5, 395);
  
pop()
  
   push()
  textSize(12);
    fill("#966c6c");

  textAlign(RIGHT);
  text("music by berlioz",595, 395);
  
pop()
  
  
  drawPlayer(); 
  movePlayer(); 
  

}

function drawOutside(){
  
  textAlign(CENTER);
  fill("#050B17")
  rect(0,0,600,400);
  image(outside, 0, 100);
  outside.resize(600, 0);
  
  fill("#fff");
  textFont(font);
  textSize(24);
  text("Thank you for exploring!", 300, 80);
 
  fill("#ed8099"); 
  rect(225, 105, 150, 30);
  fill("#050B17")
  textSize(18);
  text("start over", 300, 125);
  
  if (
    mouseX > 225 &&
    mouseX < 225 + 150 &&
    mouseY > 105 &&
    mouseY < 105 + 30
  ) {
    fill("#753c54"); 
  rect(225, 105, 150, 30);
    fill("#fff");
      text("start over", 300, 125);
    
    if(mouseIsPressed){
      currentScene = "welcome";
    }

  }
}
  


function drawHome() {
  
  
  push()
  fill("#3e3546");
    rectMode(CORNER);

    rect(0, 0, 600, 50); //wall
  rect(0, 50, 600, 150); //wall

  
  pop()
  
  
  
  push()
  rectMode(CORNER);

  fill("#966c6c");
  rect(0, 200, 600, 300); //floor
  pop()
  
  
  push()
  fill("#165a4c");
  image(resizedImages.rug, 175, 240);
  pop()
  
    
   movePlayer(); 
  
  // console.log(playerX, playerY);

  if ((dist(playerX + 20, playerY, 200, 120) < 100)) {
    
    push()
    stroke("white");
    fill("#391E0C");
    rectMode(CORNER);
    drawingContext.shadowColor = '#fff';
    drawingContext.shadowBlur = 100;
    rect(90, 40, 220, 170);
        pop()
if (keyIsPressed && key === ' ') {
    currentScene = "books"; 
    resetPosition();

  }
    }
  push()
  rectMode(CORNER);
    fill("#391E0C");
  //rect(90, 40, 220, 160); //bookshelf
  
  image(resizedImages.bookshelf, 90, 40);
  pop();
 
  image(resizedImages.flower1, 0, 60);
  image(resizedImages.sofa, 340, 140);
  
   push();
  translate(590, 290);
  textAlign(LEFT);
  fill("#323353");
  rectMode(CENTER);
  rect(0, 0, 40, 110);
  fill("#fff");
  rotate(-90);
  text("go outside...", -30, 0);
  pop();
  
  
   if ((dist(playerX + 20, playerY, 570, 280) < 50)) {
    
    push()
    stroke("white");
    //noFill();
    rectMode(CENTER);
         drawingContext.shadowColor = '#fff';
    drawingContext.shadowBlur = 100;
  fill("#323353");

    rect(590, 290, 40, 110);


        pop()
     
    currentScene = "outside"; 
    resetPosition();
     
     

    }
    drawPlayer(); 

  
  if ((dist(playerX + 20, playerY, 450, 80) < 100)) {
    
    push()
    stroke("white");
    //noFill();
    rectMode(CORNER);
    drawingContext.shadowColor = '#fff';
    drawingContext.shadowBlur = 100;
    rect(355, 35, 90);
    rect(455, 35, 90);

        pop()
if (keyIsPressed && key === ' ') {
  drawInfo(5);

  }
    }
    
 
  

  if(!card){
     push()
  rectMode(CORNER);
  fill("#b5838d");
  rect(355, 35, 90);
    rect(455, 35, 90);
  pop()

  image(resizedImages.painting1, 360, 40);
  

    image(resizedImages.painting2, 460, 40);

  

  }
     image(resizedImages.flower2, 540, 60);
  
 
  textAlign(LEFT);
  fill("#fdcbb0")
  textFont(font);
  textSize(15);
  text("use arrow keys to move around", 10, 390);
  
  textAlign(RIGHT);
    text("press spacebar to interact", 590, 390);



  
}


function drawBooks() {
 image(bookScene, 0, 0);
  bookScene.resize(600, 400);
  
  push()
  rectMode(CORNER);
  stroke("white");
  drawingContext.shadowBlur = 100;
  
  if ((dist(playerX - 20, playerY, 143, 95) < 30)) {
    fill("#D9A944");
      drawingContext.shadowColor = '#D9A944';

    rect(127, 37, 36, 116);
    if (keyIsPressed && key === ' ') {
    drawInfo(0); 
  }
  }
  
  if ((dist(playerX - 20, playerY, 50, 95) < 50)) {
    fill("#891D1A");
          drawingContext.shadowColor = '#891D1A';

    rect(32, 37, 36, 116);
     if (keyIsPressed && key === ' ') {
    drawInfo(1); 
  }
  }
  
  if ((dist(playerX - 20, playerY, 550, 95) < 50)) {
    fill("#B51F10");
          drawingContext.shadowColor = '#B51F10';

    rect(532, 37, 36, 116);
     if (keyIsPressed && key === ' ') {
    drawInfo(2); 
  }
  }
  
  if ((dist(playerX, playerY, 233, 300) < 30)) {
    fill("#891D1A");
          drawingContext.shadowColor = '#891D1A';

    rect(216, 235, 36, 116);
     if (keyIsPressed && key === ' ') {
    drawInfo(3); 
  }
  }
  
  if ((dist(playerX - 20, playerY, 300, 300) < 30)) {
    fill("#887919");
          drawingContext.shadowColor = '#887919';

    rect(283, 235, 36, 116);
     if (keyIsPressed && key === ' ') {
    drawInfo(4); 
  }
  }
    
  
  pop()
  
  textAlign(LEFT);
  fill("#fdcbb0")
  textFont(font);
  textSize(15);
  text("use arrow keys to move around", 10, 390);
  
  textAlign(RIGHT);
    text("press spacebar to interact", 590, 390);
  
   textAlign(CENTER);
    text("press escape to go back", 300, 20);
  
  
  drawHand();
  movePlayer();
  
  if (keyIsPressed && key === 'Escape') {
    currentScene = "home"; 
  }
  

  
}

function drawPlayer() {
  image(resizedImages.player, playerX, playerY);
}

function drawHand() {
  image(resizedImages.hand, playerX - 50, playerY);
}




function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5; 
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5; 
  }
  if (keyIsDown(UP_ARROW)) {
    playerY -= 5; 
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += 5; 
  }
}




function resetPosition() {
  playerX = width / 2; 
  playerY = height - 30; 
}


function drawInfo(num) {
  
  push()
  drawingContext.shadowBlur = 0;

  image(scroll, 25, 25);
  scroll.resize(550, 350)
  rectMode(CORNER);

  fill("#391E0C");
  textFont(font);
  textAlign(LEFT);
  let title = media[num].title;
  let desc = media[num].description;
  let author = media[num].author;

  textSize(40);
  text(`${title}`, 120, 110); 
  
  textSize(24);
  text(`by ${author}`, 120, 140); 
  
  textSize(22);

  text(`${desc}`, 120, 190, 360, 140); 


  
  pop()
 
}



