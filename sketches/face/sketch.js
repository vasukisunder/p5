let earWag = 0;
let tailWag = 0;
let tongueWag = 0;
let ballCursor;
let clouds = [];
let flowers = [];
let bigPlants = [];

function preload() {
  ballCursor = loadImage('sketches/face/ball.png');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  angleMode(DEGREES);
  noCursor();
  
  // Initialize moving clouds
  for(let i = 0; i < 3; i++) {
    clouds.push({
      x: random(width),
      y: random(30, 80),
      size: random(30, 40),
      speed: random(0.2, 0.4)
    });
  }
  
  let flowerColors = ['#FF6B6B', '#FFB84C', '#FFFFFF', '#FF9999'];
  
  // Back hill flowers - grid-based distribution with random offset
  for(let x = 0; x < width; x += 30) {  // Adjust spacing
    for(let y = 250; y < 300; y += 20) {
      // Add random offset to grid positions
      let flowerX = x + random(-15, 15);
      let flowerY = y + random(-10, 10);
      
      // Add slight curve to follow hill
      flowerY += sin(x * 0.8) * 15;
      
      // Size based on y position
      let size = map(flowerY, 380, 250, 1.2, 0.4);
      
      flowers.push({
        x: flowerX,
        y: flowerY,
        size: size * random(0.9, 1.1),
        color: random(flowerColors),
        layer: 'back'
      });
    }
  }
  
  // Front hill flowers - grid-based distribution with random offset
  for(let x = 0; x < width; x += 35) {  // Slightly wider spacing for front
    for(let y = 320; y < 390; y += 25) {
      // Add random offset to grid positions
      let flowerX = x + random(-15, 15);
      let flowerY = y + random(-10, 10);
      
      // Add slight curve to follow hill
      flowerY += sin(x * 0.8) * 10;
      
      // Don't place on path
      if(!(flowerX > 180 && flowerX < 340 && flowerY > 300)) {
        // Size based on y position
        let size = map(flowerY, 400, 320, 1.4, 0.8);
        
        flowers.push({
          x: flowerX,
          y: flowerY,
          size: size * random(0.9, 1.1),
          color: random(flowerColors),
          layer: 'front'
        });
      }
    }
  }
  
  // Add some random additional flowers for natural variety
  for(let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(250, 300);  // back hill
    let size = map(y, 380, 250, 1.2, 0.4);
    
    flowers.push({
      x: x,
      y: y + sin(x * 0.8) * 15,
      size: size * random(0.9, 1.1),
      color: random(flowerColors),
      layer: 'back'
    });
  }
  
  for(let i = 0; i < 15; i++) {
    let x = random(width);
    let y = random(320, 390);  // front hill
    
    if(!(x > 180 && x < 340 && y > 300)) {
      let size = map(y, 400, 320, 1.4, 0.8);
      
      flowers.push({
        x: x,
        y: y + sin(x * 0.8) * 10,
        size: size * random(0.9, 1.1),
        color: random(flowerColors),
        layer: 'front'
      });
    }
  }
  
  // Initialize big plants in foreground
  for(let i = 0; i < 8; i++) {
    let x = random(width);
    // Keep big plants in the very front
    let y = random(360, 390);
    if(!(x > 180 && x < 340)) {  // Avoid path area
      bigPlants.push({
        x: x,
        y: y,
        type: floor(random(3))
      });
    }
  }
}

function draw() {
  // Sky gradient - turquoise to light blue
  noStroke();
  for(let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let skyColor = lerpColor(
      color('#7EDCD5'),  // Turquoise
      color('#A5E6E1'),  // Lighter turquoise
      inter
    );
    fill(skyColor);
    rect(0, y, width, 1);
  }
  
  // Moving clouds
  for(let cloud of clouds) {
    drawCloud(cloud.x, cloud.y, cloud.size);
    cloud.x += cloud.speed;
    if(cloud.x > width + 100) {
      cloud.x = -100;
      cloud.y = random(30, 80);
    }
  }
  
  // Farthest hill
  fill('#436B44');  // Darkest green
  beginShape();
  vertex(0, 230);
  bezierVertex(100, 180, 300, 200, 400, 170);
  vertex(400, 300);
  vertex(0, 300);
  endShape(CLOSE);
  
  // Background mountains with proportional snow caps
  fill('#8CA9B5');  // Grey mountains
  beginShape();
  vertex(0, 200);
  vertex(100, 120);
  vertex(200, 180);
  vertex(300, 100);
  vertex(400, 150);
  vertex(400, 250);
  vertex(0, 250);
  endShape(CLOSE);
  
  // Adjusted snow caps to be more spiky and proportional
  fill('#FFFFFF');
  // First peak
  beginShape();
  vertex(85, 135);    // Left base
  vertex(93, 125);    // Left middle
  vertex(100, 120);   // Peak
  vertex(107, 125);   // Right middle
  vertex(115, 135);   // Right base
  endShape(CLOSE);
  
  // Second peak
  beginShape();
  vertex(285, 115);   // Left base
  vertex(293, 105);   // Left middle
  vertex(300, 100);   // Peak
  vertex(307, 105);   // Right middle
  vertex(315, 115);   // Right base
  endShape(CLOSE);
  
  // Middle ground hills
  fill('#2D5A27');
  beginShape();
  vertex(0, 250);
  bezierVertex(100, 200, 300, 220, 400, 180);
  vertex(400, 300);
  vertex(0, 300);
  endShape(CLOSE);
  
  // Draw back layer flowers
  for(let flower of flowers) {
    if(flower.layer === 'back') {
      drawFlower(flower.x, flower.y, flower.color, flower.size);
    }
  }
  
  // Pine trees
  drawPineTree(50, 200, 40);
  drawPineTree(30, 220, 50);
  drawPineTree(350, 190, 45);
  drawPineTree(370, 210, 55);
  
  // Foreground hill
  fill('#3D8C40');
  beginShape();
  vertex(0, 280);
  bezierVertex(150, 260, 250, 270, 400, 250);
  vertex(400, 400);
  vertex(0, 400);
  endShape(CLOSE);
  
  // Path
  fill('#E6C288');
  beginShape();
  vertex(150, 400);
  bezierVertex(180, 350, 220, 300, 250, 280);
  vertex(270, 280);
  bezierVertex(300, 300, 340, 350, 370, 400);
  endShape(CLOSE);
  
  // Draw front layer flowers
  for(let flower of flowers) {
    if(flower.layer === 'front') {
      drawFlower(flower.x, flower.y, flower.color, flower.size);
    }
  }
  
  earWag = map(mouseX, 0, width, -30, 30);
  let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
  tailWag = map(speed, 0, 50, -25, 25) * sin(frameCount * 5);
  tongueWag = map(mouseX, 0, width, -10, 10);
  
  let earSize = map(mouseY, 0, height, 0.8, 1.2);
  let tailSize = map(mouseY, 0, height, 0.8, 1.2);
  
  push();
  translate(width/2, height/2 + 70);
  
  drawBody();
  
  push();
  translate(45, 0);
  rotate(tailWag);
  scale(tailSize);
  drawTail();
  pop();
  
  drawHead(earSize);
  
  pop();
  
  imageMode(CENTER);
  image(ballCursor, mouseX, mouseY, 50, 50);
}

function drawCloud(x, y, size) {
  push();
  fill('#FFFFFF');
  noStroke();
  ellipse(x, y, size * 1.3, size);
  ellipse(x - size/2, y, size);
  ellipse(x + size/2, y, size);
  ellipse(x, y - size/3, size);
  fill('#F5F5F5');  // Slightly darker for depth
  ellipse(x + 5, y + 5, size * 1.2, size * 0.9);
  pop();
}

function drawHead(earSize) {
  noStroke();
  fill('#654321');
  rect(-50, -140, 100, 90, 35);
  
  fill('#654321');
  
  push();
  translate(-40, -130);
  rotate(-20 + earWag);
  scale(earSize);
  rect(-15, -30, 30, 45, 10);
  pop();
  
  push();
  translate(40, -130);
  rotate(20 - earWag);
  scale(earSize);
  rect(-15, -30, 30, 45, 10);
  pop();
  
  fill('#966432');
  rect(-35, -110, 70, 50, 25);
  
  noStroke();
  fill('#FFFFFF');
  ellipse(-20, -110, 16, 20);
  ellipse(20, -110, 16, 20);
  
  let eyeX = map(mouseX, 0, width, -3, 3);
  let eyeY = map(mouseY, 0, height, -3, 3);
  
  fill('#1E1E1E');
  ellipse(-20 + eyeX, -110 + eyeY, 8, 12);
  ellipse(20 + eyeX, -110 + eyeY, 8, 12);
  
  fill('#3C2814');
  ellipse(0, -85, 25, 18);
  
  noFill();
  stroke('#3C2814');
  strokeWeight(2);
  arc(0, -75, 30, 15, 0, 180);
}

function drawBody() {
  fill('#654321');
  noStroke();
  rect(-45, -60, 90, 120, 30);
  
  fill('#966432');
  rect(-30, -40, 60, 90, 20);
  
  fill('#966432');
  rect(-35, 50, 25, 20, 5);
  rect(10, 50, 25, 20, 5);
}

function drawTail() {
  noStroke();
  fill('#654321');
  
  beginShape();
  vertex(-10, -10);
  vertex(20, -15);
  vertex(55, -8);
  vertex(60, 0);
  vertex(55, 8);
  vertex(20, 15);
  vertex(-10, 10);
  endShape(CLOSE);
}

function drawPineTree(x, y, size) {
  fill('#1A472A');
  triangle(x, y, x - size/2, y + size, x + size/2, y + size);
  triangle(x, y - size/3, x - size/2, y + size/2, x + size/2, y + size/2);
  triangle(x, y - size/1.5, x - size/2, y, x + size/2, y);
  fill('#5C3A21');
  rect(x - 5, y + size, 10, 15);
}

function drawBigPlant(x, y, type) {
  switch(type) {
    case 0:  // Tall grass
      push();
      stroke('#2D5A27');
      strokeWeight(2);
      for(let i = 0; i < 5; i++) {
        let angle = map(i, 0, 4, -20, 20);
        line(x, y, x + cos(angle) * 30, y - 40);
      }
      pop();
      break;
      
    case 1:  // Fern
      push();
      stroke('#2D5A27');
      strokeWeight(2);
      line(x, y, x, y - 35);
      for(let i = 0; i < 6; i++) {
        let yOffset = map(i, 0, 5, 0, 35);
        let size = map(i, 0, 5, 15, 5);
        line(x, y - yOffset, x - size, y - yOffset - size);
        line(x, y - yOffset, x + size, y - yOffset - size);
      }
      pop();
      break;
      
    case 2:  // Big flower
      push();
      stroke('#2D5A27');
      strokeWeight(2);
      line(x, y, x, y - 30);
      fill('#FF6B6B');
      noStroke();
      for(let angle = 0; angle < 360; angle += 45) {
        push();
        translate(x, y - 30);
        rotate(angle);
        ellipse(0, -10, 12, 20);
        pop();
      }
      fill('#FFD700');
      circle(x, y - 30, 12);
      pop();
      break;
  }
}

function drawFlower(x, y, color, size) {
  push();
  fill(color);
  for(let angle = 0; angle < 360; angle += 72) {
    push();
    translate(x, y);
    rotate(angle);
    ellipse(0, -5 * size, 8 * size, 15 * size);
    pop();
  }
  fill('#FFD700');
  circle(x, y, 8 * size);
  pop();
} 