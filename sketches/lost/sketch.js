let timeOfDay = 0;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    angleMode(DEGREES);
  }
  
  
  function draw() {
    background('#132a13');
    
    // Calculate sun position (0 = sunrise, 180 = sunset)
    let sunY = map(sin(timeOfDay), -1, 1, 270, 50);
    
    // Sky colors based on sun position
    let skyColor;
    if (sunY < 120) { // Morning to midday
        let t = map(sunY, 50, 120, 0, 1);
        skyColor = lerpColor(
            color('#caf0f8'), // Sunrise
            color('#D8EEFC'), // Bright blue midday
            t
        );
    } else if (sunY >= 120 && sunY < 200) { // Midday to sunset
        let t = map(sunY, 120, 200, 0, 1);
        skyColor = lerpColor(
            color('#D8EEFC'), // Bright blue midday
            color('#b56576'), // Sunset pink
            t
        );
    } else { // Night approaching
        let t = map(sunY, 200, 270, 0, 1);
        skyColor = lerpColor(
            color('#b56576'), // Sunset pink
            color('#355070'), // Night blue
            t
        );
    }
    
    // Sun stays golden
    let sunColor = color('#FFE194');  // Consistent golden yellow
    
    // sky
    push();
    fill(skyColor)
    rect(20, 20, 360, 270);
    pop();
    
    // sun
    push()
    noStroke();
    
    push()
    fill(sunColor);
    circle(100, sunY, 130);
    filter(BLUR, 10);
    pop()
    
    push()
    fill(lerpColor(sunColor, color('#FFFFFF'), 0.2));
    circle(100, sunY, 100);
    filter(BLUR, 5);
    pop()
    
    push()
    fill(lerpColor(sunColor, color('#FFFFFF'), 0.4));
    circle(100, sunY, 80);
    pop();
    pop()
    
    
    push()
    noStroke()
    fill('#90B876');
    translate(90, 270);
    rotate(5);
    ellipse(0, 0, 200, 100);
    pop()
    
    push()
    noStroke()
    fill('#C2DAB8');
    translate(290, 260);
    rotate(-20);
    ellipse(0, 0, 280, 120);
    pop()
    
    // windows
    push();
    noFill();
    stroke('#262F20');
    strokeWeight(6);
  
    
    quad(20, 20, 100, 50, 100, 260, 20, 290);
    quad(380, 20, 300, 50, 300, 260, 380, 290);
    
    push()
    strokeWeight(10);
    rect(20, 20, 360, 270);
    pop()
    
    line(20, 110, 100, 120);
    line(20, 200, 100, 190);
    line(380, 110, 300, 120);
    line(380, 200, 300, 190);
    pop();
    
    
    // fix for window blur
    push()
    fill('#132a13');
    noStroke();
    rect(0, 0 ,20, 400);
    rect(380, 20, 20, 400);
    rect(0, 0, 400, 20);
    rect(0, 290,400, 100);
    pop()
    
    // counter
    push()
    noStroke();
    fill('#A2AEA2');
    translate(-20, 345);
    rotate(-5);
    rect(0, 0, 600, 200);
    pop()
  
    
    // resizing slightly
    push();
    scale(0.9, 0.9);
    translate(20,50);
    noStroke();
  
    
    // plant pot
    push()
    fill('#1F0C00');
    ellipse(200, 359, 100, 40)
    pop()
    
    push()
    fill('#402311');
    ellipse(200, 347, 100, 40)
    pop()
    
    push()
    fill('#5C3A25');
    ellipse(200, 335, 100, 40)
    pop()
    
    push()
    fill('#704A32');
    ellipse(200, 323, 100, 40)
    pop()
    
    push()
    fill('#845B41');
    ellipse(200, 311, 100, 40)
    pop()
    
    push()
    fill('#9C755C');
    ellipse(200, 299, 100, 40)
    pop()
    
    push()
    fill('#1E140F');
    ellipse(200, 295, 80, 23)
    pop()
    
    
    // back leaves
    push();
    fill('#295325');
    
    push();
    translate(237, 82);
    rotate(85);
    ellipse(0, 0, 14, 20);
    pop();
    
    push();
    translate(246, 59);
    rotate(105);
    ellipse(0, 0, 14, 20);
    pop();
  
    pop();
    
    
    
    // cactus body
    push();
    fill('#5D9656');
    rect(176, 86, 16, 214, 18, 10, 0, 0); 
    pop();
    
    push();
    fill('#498B42');
    rect(192, 86, 16, 214, 18, 10, 0, 0); 
    pop();
    
    push();
    fill('#336A2D');
    rect(208, 70, 16, 224, 18, 10, 0, 0); 
    pop();
    
    
    // leaning top of cactus
    push()
    translate(205, 20);
    rotate(22);
    
    push();
    fill('#5D9656');
    rect(0, 0, 16, 74, 25, 0, 0, 0); 
    pop();
    
    push();
    fill('#498B42');
    rect(16, 0, 16, 74, 0, 0, 0, 0); 
    pop();
    
    push();
    fill('#336A2D');
    rect(32, 0, 16, 72, 0, 25, 0, 0); 
    pop();
    
    pop();
    
    
    // soil in the pot
    push()
    fill('#1E140F');
    ellipse(200, 298, 58, 12)
    pop()
    
    
    // cactus spikes
    push();
    textSize(18);
    fill('#1E140F')
    textAlign(CENTER, CENTER);
    blendMode(MULTIPLY);
    
    for (let y = 295; y >= 100; y -= 20) {
    
      text('*', 176, y-8);
      text('*', 189, y-15);
      text('*', 206, y);
      text('*', 222, y+3);
      
    }
    
    push()
    translate(202, 29);
    rotate(22);
    
    for (let y = 0; y <= 70; y+= 20){ 
      text('*', 0, y);
      text('*', 14, y-5);
      text('*', 31, y);
      text('*', 46, y+5);   
    }
    pop();
    pop();
  
    
    
    
    // front leaves
    push();
    fill('#295325');
    
    push();
    translate(198, 34);
    rotate(-20);
    ellipse(0, 0, 14, 20);
    pop();
    
    push();
    translate(185, 53);
    rotate(-50);
    ellipse(0, 0, 14, 20);
    pop();
    
    push();
    translate(178, 72);
    rotate(-80);
    ellipse(0, 0, 14, 20);
    pop();
  
    pop();
    
    pop();
    
    // Increment time
    timeOfDay += 0.5;
  }
  
  
  