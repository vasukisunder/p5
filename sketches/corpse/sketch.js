let t = 0;
let starTrail = [];  // Array to store previous mouse positions
let lastStarTime = 0;  // To control how often we add new stars

function setup() {
    let canvas = createCanvas(400, 600);
    canvas.parent('sketch-holder');
    angleMode(DEGREES);
    frameRate(30);
}

function draw() {
    // Only add new star position every 100ms
    if ((mouseX !== 0 || mouseY !== 0) && millis() - lastStarTime > 100) {
        starTrail.unshift({
            x: mouseX,
            y: mouseY,
            time: millis()
        });
        lastStarTime = millis();
    }
    
    // Remove stars older than 2 seconds
    let currentTime = millis();
    starTrail = starTrail.filter(pos => currentTime - pos.time < 2000);
    
    // Base dark background
    background('#0A1526');  // Deep navy base
    
    // Create swirling effect with overlapping gradients
    noStroke();
    
    // First layer of swirls
    for (let i = 0; i < 5; i++) {
        let xOffset = sin(t + i * 60) * 100;
        let yOffset = cos(t + i * 60) * 100;
        
        let gradientSize = 300;
        let x = (width / 2) + xOffset;
        let y = (height / 2) + yOffset;
        
        // Create gradient swirl
        for (let r = gradientSize; r > 0; r -= 20) { 
            let alpha = map(r, 0, gradientSize, 255, 0);
            // Swirl colors range from #1B263B to #415A77
            let swirl = lerpColor(
                color('#1B263B'),  // Darker blue
                color('#415A77'),  // Lighter blue
                map(r, gradientSize, 0, 0, 1)
            );
            swirl.setAlpha(alpha * 0.2);
            fill(swirl);
            ellipse(x, y, r * 2);
        }
    }
    
    // Second layer of smaller, brighter swirls
    for (let i = 0; i < 8; i++) {
        let xOffset = cos(t * 1.5 + i * 45) * 150;
        let yOffset = sin(t * 1.5 + i * 45) * 150;
        
        let gradientSize = 200;
        let x = (width / 2) + xOffset;
        let y = (height / 2) + yOffset;
        
        for (let r = gradientSize; r > 0; r -= 15) {
            let alpha = map(r, 0, gradientSize, 200, 0);
            // Brighter swirl colors range from #778DA9 to #A5C5E8
            let swirl = lerpColor(
                color('#778DA9'),  // Medium blue
                color('#A5C5E8'),  // Light blue
                map(r, gradientSize, 0, 0, 1)
            );
            swirl.setAlpha(alpha * 0.1);
            fill(swirl);
            ellipse(x, y, r);
        }
    }
    
    t += 0.5;  // Animation speed
    
    // Draw character
    drawLegs();
    drawHead();
    drawBody();
    
    // Draw star trail
    push();
    textSize(10);  // Smaller text size
    textAlign(CENTER, CENTER);
    let stars = ["⭐", "✨", "💫"];
    starTrail.forEach((pos, index) => {
        let alpha = map(currentTime - pos.time, 0, 2000, 255, 0);
        fill(255, 255, 255, alpha);
        text(stars[index % stars.length], pos.x, pos.y);
    });
    pop();
    
    // Mouse coordinates
    push();
    fill('white');
    noStroke();
    textSize(12);
   // text(`(${mouseX}, ${mouseY})`, mouseX + 10, mouseY + 10);
    pop();
}
  
  function drawHead(){
    // hair behind head
    push();
    noStroke();
    let lightBlue = color('#558DBB');
    let darkBlue = color('#3A6082');
    
    // Main hair with gradient (original rect with rounded corners)
    for(let y = 50; y < 200; y++) {
        let inter = map(y, 50, 200, 0, 1);
        let hairColor = lerpColor(lightBlue, darkBlue, inter);
        fill(hairColor);
        rect(130, y, 140, 100, 200, 200, 0, 0);
    }
    pop();
    
    fill('#CFEAFF');
    push();
    noStroke();
    
    //shoulders
    triangle(200, 170, 276, 200, 124, 200);
    rect(190, 150, 20, 40);
    rect(120, 194, 160, 40, 20);
    pop();
  
    //head - modified to create oval shape with cheekbones
    noStroke();
    // Upper larger circle for forehead and upper cheeks
    ellipse(200, 95, 105, 95);
    // Lower smaller circle for jaw and lower cheeks
    ellipse(200, 120, 85, 80);
    
    //eyes, eyebrows, and eyelids
    push();
    noStroke();
    // White part of eyes
    fill('white');
    circle(175, 110, 30);
    circle(225, 110, 30);
    
    // Black pupils
    noStroke();
    fill('black');
    circle(175, 110, 8);
    circle(225, 110, 8);
    pop();
    
    // Eyelids
    fill('#3A6082');  // Dark blue for eyelids
    arc(175, 110, 30, 30, 180, 360);  // Left eyelid
    arc(225, 110, 30, 30, 180, 360);  // Right eyelid
    
    // Eyebrows
    stroke('#3A6082');
    strokeWeight(3);
    noFill();
    
    // Left eyebrow - curves down from center to side
    beginShape();
    vertex(190, 85);
    bezierVertex(
        185, 85,
        170, 85,
        155, 99
    );
    endShape();
    
    // Right eyebrow - curves down from center to side
    beginShape();
    vertex(210, 85);
    bezierVertex(
        215, 85,
        230, 85,
        245, 99
    );
    endShape();
    
    
    
    // Nose
    push();
    stroke('#3A6082');
    strokeWeight(1);
    noFill();
    beginShape();
    vertex(200, 115);  // Top of nose
    bezierVertex(
        197, 125,  // Control point 1
        197, 130,  // Control point 2
        200, 130   // Bottom of nose
    );
    endShape();
    pop();
    
    // Closed lips
    push();
    stroke('#B27EBD');
    strokeWeight(6);
    line(190, 144, 210, 144);  // Upper lip line
    
    noFill();
    beginShape();
    vertex(190, 144);  // Left corner
    bezierVertex(
        195, 155,  // Control point 1
        203, 155,  // Control point 2
        212, 144   // Right corner
    );
    endShape();
    pop();
    
    // bangs/hair in front
    push();
    noStroke();
    fill(lightBlue);  // Using the lighter blue for bangs
    
    push();
    translate(230, 65);
    rotate(-55);
    ellipse(0, 0, 30, 70);
    pop();
    
    translate(170, 65);
    rotate(55);
    ellipse(0, 0, 30, 70);
    pop();
    
    // smile
    push();
    noFill();
    stroke(0);
    strokeWeight(1);
    translate(200, 140);
    rotate(-5);
    //arc(0, 0, 30, 8, 0, 180);
    pop();
  }
  
  
  function drawBody(){
    
            noStroke();

    
    fill('#CFEAFF');
    
    quad(120, 220, 280, 220, 284, 285, 210, 395);
    quad(280, 220, 120, 220, 116, 285, 190, 395);
  
    fill('#415a77');
     circle(170, 240, 65);
    circle(230, 240, 65);
    quad(135, 240, 265, 240, 230, 335, 170, 335); //corset
    

         push();
  noStroke();
    quad(172, 325, 220, 325, 160, 572, 15, 572) // dress1
        quad(228, 325, 180, 325, 240, 572, 385, 572) //dress2
    
    

  ellipse(80,570,160,55);
  ellipse(320,570,160,55);
  pop();

   
    push();
    stroke('#3B506C');  // Dark blue for the lines
    strokeWeight(1);
    blendMode(OVERLAY);
    
    // Number of lines to draw
    let numLines = 15;
    
    // Calculate spacing for top x values
    let topSpacing = (228 - 172) / (numLines - 1);
    // Calculate spacing for bottom x values
    let bottomSpacing = (370 - 35) / (numLines - 1);
    
    for(let i = 0; i < numLines; i++) {
        // Calculate x coordinates
        let topX = 172 + (topSpacing * i);
        let bottomX = 35 + (bottomSpacing * i);
        
        line(topX, 330, bottomX, 590);
    }
    pop();
  
    
    // shoulders
    text("✨✨", 120, 250);
    text("✨⭐️", 120, 240);
    text("✨💫", 127, 243);
    text("⭐️", 118, 235);
  
  
    text("✨", 258, 220);
    text("⭐️", 264, 230);
  
    
    text("⭐️", 200, 390);
    text("💫", 184, 387);
    text("⭐️", 215, 395);
    text("✨", 175, 395);
  
  
    // torso
    text("⭐️", 280, 290);
    text("💫", 285, 282);
    text("✨", 265, 293);
    
    // shield
    text("⭐️", 345, 363);
    text("💫", 371, 308);
    text("✨", 365, 255);
    text("⭐️", 373, 285);
    text("💫", 353, 342);
    text("⭐️", 355, 224);
    
    
    /* push()
    stroke('#778da9');
    strokeWeight(3);
    line(150, 207, 265, 211);
    line(136, 219, 180, 370);
    line(280, 228, 274, 271);
    line(265, 304, 218, 374);
    line(303, 285, 366, 285)
    
    
    pop() */ 
    
  }
  
  function drawLegs(){
    fill('#415a77');
    
    /*push()
    translate(180, 380);
    rotate(45);
    rect(0, 0, 40, 120, 20);
    pop()
    
    push()
    translate(190, 395);
  
    rotate(315);
    rect(0, 0, 40, 120, 20);
    pop();*/
    
    //quad(200, 300, 280, 480, 200, 600, 120, 480);
    //rect(120, 580, 160, 30);
    
    push()
    fill('#1b263b');
    //quad(200, 390, 240, 480, 200, 600, 160, 480);
    pop();
    
        fill('#CFEAFF');
        rect(160, 360, 80, 220);
    rect(0, 570, 400, 300);
    
  }


function keyPressed() {
  if (key === 's') {

    saveGif('animation.gif', 10);
  }
}
  