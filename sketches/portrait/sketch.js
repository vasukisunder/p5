// each value represents the hour in a 168 hour week, where I completed one full water bottle
let waterHours = [11, 14, 21, 33, 36, 40, 51, 58, 71, 86, 94, 103, 110, 117, 135, 144, 159, 163, 167, 168]; 

let sunset = ['#6d6875', '#b5838d', '#e5989b', '#ffb4a2', '#ffcdb2'];

let startHeight = endHeight = hours = 0;
let font;
let notif = "";

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  textAlign(CENTER);
  noStroke();
  
  img = loadImage('/sketches/portrait/surfer.png');
  
  font = loadFont('/sketches/portrait/candy.otf');

  noCursor(); //replacing cursor with surfer image
}

function draw() {
  background("#f5ebe0");
  
  //sunset sky?
  for (let a = 0; a < sunset.length; a++){
    fill(sunset[a]);
    rect(0, a*120, 600, (a+1)*120);
      filter(BLUR, 20);

  }
  
  //sun
  push()
  fill('#FFE194');
  circle(300, 500, 400);
  filter(BLUR, 10);
  pop()
  
  push()
  fill('#FFCE80');
  circle(300, 500, 380);
  filter(BLUR, 15);
  pop()

  push()
  fill('#F9AF64');
  circle(300, 500, 320);
    filter(BLUR, 8);
  pop();
  
  
  let seconds = millis() / 1000;
  
  if (hours < 168) {
    hours = seconds * 8;
  }  
  
  if (hours > 168) {
    hours = 168;
  }
  
  let weekPercent = (hours / 168) * 100;
  
  // console.log(hours);
  
  for (let i = 0; i < waterHours.length; i++){
    if (hours >= waterHours[i]){
      endHeight = (waterHours[i]/168) * 600;
      
      notif = "you have drank " + i * 32 + " ounces of water";
    } else {
      break;
    }
  }
  
  // simulates the "growing" animation
    if (startHeight < endHeight) {
    startHeight += 2; 
  }
  
  // making the water gradually get darker
  let waterColor = color(
  map(startHeight, 0, height, 173, 30),  
  map(startHeight, 0, height, 216, 50),  
  map(startHeight, 0, height, 230, 100) 
);
  fill(waterColor);
  
  // rect(0, height - startHeight, 600, startHeight);
  
  
  beginShape();
for (let x = 0; x <= width; x += 10) {
  // mouseX to control frequency, and mouseY to control amplitude
  let frequency = map(mouseX/2, 0, width, 0.01, 0.1); 
  let amplitude = map(mouseY, 0, height, 5, 30);    

   // lines 100-105 courtesy of chatGPT -- using a sine wave to create a water shape
  let y = height - startHeight + sin((x + frameCount * 0.05) * frequency) * amplitude;
  vertex(x, y);
}
vertex(width, height); // Bottom right corner
vertex(0, height);     // Bottom left corner
endShape(CLOSE);
  
  
  
  

  fill("#fff");
  
  push();
  textFont(font);
  textSize(140)
  text("ride the waves", 300, 150)
  pop();
    //// blendMode(DIFFERENCE);

  text("the week is " + nf(weekPercent, 0, 1) + "% complete", 300, 480);
  text(notif, 300, 500);
 
  //surfer mouse 
  image(img, mouseX, mouseY, 160, 130);

  
}