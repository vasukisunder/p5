let circles = [];
let growth = [];
let diameters = []; 
let strokeWeights = [];

function setup() {
  let canvas = createCanvas(500, 650);
  canvas.parent('sketch-holder');
  background('#030400');  

  //starting at 12,12 to more closely mimic the artwork 
  for (let x = 12; x <= width; x += 10) {
    for (let y = 12; y <= height; y += 10) {
      let diameter = random(3, 7);
      circles.push({x: x, y: y, d: diameter}); //storing the x y coordinates and the random diameter
      growth.push(random(0.01, 0.2));  // storing a random value for growth so it pulses
      diameters.push(diameter);  // remembering original diameter so mouse XY has an effect
      strokeWeights.push(random(1, 3));  
    }
  }
}

function draw() {
  background('#030400');  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    let d = dist(mouseX, mouseY, circle.x, circle.y);
        if (d < 100) {  
      circle.d = diameters[i] + 0.5; 
    } else {
      circle.d += growth[i];

      // this part of the code (the pulsing effect) was achieved with help from chatGPT
      if (circle.d > 7 || circle.d < 3) {
        growth[i] *= -1;
      }
    }

    noFill();
    stroke('#D5D6CE');  
    strokeWeight(strokeWeights[i]);  
    ellipse(circle.x, circle.y, circle.d);
  }
}