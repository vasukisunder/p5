let phase = 0;
let textPhase = 0;
const MOON_SIZE = 120;
let stars = [];
let phaseText;

function preload() {
  // Remove font loading
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('sketch-holder');
  noStroke();
  
  // Create HTML element for phase text with default font
  phaseText = createDiv('');
  phaseText.style('color', 'white');
  phaseText.style('font-size', '13px');
  // Remove custom font styling
  phaseText.style('position', 'absolute');
  phaseText.style('width', '100%');
  phaseText.style('text-align', 'center');
  phaseText.style('top', '40%');
  phaseText.style('left', '3%');
  phaseText.style('transform', 'translateY(-50%)');
  
  // Rest of setup remains the same
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(0, width),
      y: random(0, height),
      size: random(1, 3),
      type: random() > 0.7 ? '+' : '.',
      twinkleSpeed: random(0.02, 0.05),
      twinkleOffset: random(0, TWO_PI),
      baseSize: random(1, 3)
    });
  }
}

function draw() {
  // Draw gradient background
  push();
  translate(-width/2, -height/2, -300);
  noStroke();
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(
      color(20, 20, 40),
      color(5, 5, 15),
      inter
    );
    fill(c);
    rect(0, y, width, 1);
  }
  
  // Draw twinkling stars
  for (let star of stars) {
    // Calculate more subtle twinkle effect
    let twinkle = sin(frameCount * star.twinkleSpeed + star.twinkleOffset);
    let currentSize = star.baseSize * (1 + twinkle * 0.3);    // 30% size variation
    let brightness = map(twinkle, -1, 1, 150, 255);           // More subtle brightness range
    
    push();
    fill(255, 255, 255, brightness);
    if (star.type === '+') {
      translate(star.x, star.y);
      let thickness = map(brightness, 150, 255, 1, 1.5);      // Less thickness variation
      rect(-currentSize/2, -thickness/2, currentSize, thickness);
      rect(-thickness/2, -currentSize/2, thickness, currentSize);
    } else {
      circle(star.x, star.y, currentSize);
    }
    pop();
  }
  pop();
  
  // Moon and lighting
  camera(0, 0, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
  ambientLight(10);
  
  push();
  let lightAngle = radians(phase);
  let lightX = cos(lightAngle);
  let lightZ = sin(lightAngle);
  directionalLight(255, 255, 255, lightX, 0, lightZ);
  
  fill(200);
  sphere(MOON_SIZE, 48, 48);
  pop();
  
  // Update text at a slower rate
  textPhase += 0.3;  // Slower update for text
  if (textPhase >= 360) {
    textPhase = 0;
  }
  
  // Update phase text using textPhase instead of phase
  let phaseName = "";
  if (textPhase >= 337.5 || textPhase < 22.5) phaseName = "New Moon";
  else if (textPhase >= 22.5 && textPhase < 67.5) phaseName = "Waxing Crescent";
  else if (textPhase >= 67.5 && textPhase < 112.5) phaseName = "First Quarter";
  else if (textPhase >= 112.5 && textPhase < 157.5) phaseName = "Waxing Gibbous";
  else if (textPhase >= 157.5 && textPhase < 202.5) phaseName = "Full Moon";
  else if (textPhase >= 202.5 && textPhase < 247.5) phaseName = "Waning Gibbous";
  else if (textPhase >= 247.5 && textPhase < 292.5) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";
  
  phaseText.html(phaseName);
  
  // Moon phase continues at original speed
  phase += 0.6;
  if (phase >= 360) {
    phase = 0;
  }
} 

