/*Dear Professor Carter,
I'm very sorry that I continued to use Project 02, even though I understand it doesn't meet the HTML page count requirement. I just didn’t want to give up the JavaScript content I had already developed.
Many of the elements and features in my project are different from what we covered in class, because I couldn’t find the tools I needed in the in-class code to create the kind of experience I envisioned. So I spent a lot of time after class exploring on my own, watching many tutorials to achieve the effects I wanted.
I’ve done my best to revise the feedback you gave me on Project 02, and I also worked hard on the p5.js part.
Thank you so much for all your help and support this semester. I’m especially grateful for the opportunity you gave me to join the 327 course — I’ve learned a lot!

Wish you have a happy summer!

Take care, 
Josie */

function setup() {
    const container = select('#myCanvasContainer');  
    const w = container.width;  
    const h = container.height; 
    createCanvas(w, h).parent(container); 
    setupDay3();  // set up all day3 specific elements
    setupDay4();  // day4
    setupDay5();  //day5
    noStroke();   
}

function draw() {
    background(colorState);   
    console.log(dayNumber);   // show the day number
    switch (dayNumber) {      // determine which animation or scene to render based on the current day

        case 1:
            drawCalmBriefcase(); // draw briefcase-day1
            break;
        case 2:
            drawCrisisPulse(); // draw "!"-day2
            break;
        case 3:
            drawHunger();      // day3- draw hunger
            break;
        case 4:
            drawSickness();    // dy4- sickness
            break;
        case 5:
            drawChallenge();   // dy5
            break;
    }
}

let angle = 0; 

function drawCalmBriefcase() {
    background(colorState);             
    let floatOffset = sin(angle) * 5;    
    angle += 0.03;                       

    push();                             
    translate(width / 2, height / 2 + floatOffset);  //center the canvas and apply vertical float effect
    drawBriefcase();                    // draw the briefcase
    pop();                             // restore the previously saved drawing state
}

function drawBriefcase() {
    rectMode(CENTER);       
    noStroke();             
    fill(80, 50, 20);       
    rect(0, 30, 200, 120, 10);  
    fill(100, 70, 30);      
    rect(0, -20, 200, 40, 10);  
    fill(255, 215, 0);      
    rect(0, 10, 20, 10, 3); //draw the briefcase

    let handleOffset = sin(angle * 2) * 3;  // Calculate vertical offset for briefcase handle; frequency = 2×angle, amplitude = 3px
    stroke(60, 30, 0);                    
    strokeWeight(8);                     
    noFill();                          
    beginShape();                      
    vertex(-40, -40 + handleOffset);  // Draw the handle's left end with time-based vertical movement
    quadraticVertex(0, -60 + handleOffset, 40, -40 + handleOffset); // a curved shape
    endShape();                        // end shaping
}


let pulse = 0;  // Pulse variable used to control tension/crisis animations

function drawCrisisPulse() {
    background(colorState);  

    // shaking
    translate(random(-2, 2), random(-2, 2));

    // darw many red dots
    for (let i = 0; i < 300; i++) {
        stroke(255, 0, 0, random(100, 255));  
        point(random(width), random(height)); // random position
    }

    // draw "!"
    push(); 
    let alpha = map(sin(pulse), -1, 1, 150, 255);  
    let sizePulse = 100 + sin(pulse) * 10;       
    translate(width / 2 + random(-2, 2), height / 2 + random(-2, 2)); 
    rotate(radians(random(-3, 3)));  // rotate the object by a random angle
    textAlign(CENTER, CENTER);        
    textSize(sizePulse);             
    fill(255, 0, 0, alpha);           
    text("!", 0, 0);                  
    pop();                           

    pulse += 0.1;                    // Increase pulse value for animated visual effects
}


let hungerPulse = 0; 
let foodParticles = [];  

function setupDay3() {
    foodParticles = [];  
    for (let i = 0; i < 20; i++) {  // make 20 food particles
        foodParticles.push({
            x: random(width),          
            y: random(height),        
            size: random(10, 20),      
            speed: random(0.5, 1.5)    
        });
    }
}

function drawHunger() {
    background(colorState);  

    let pulseSize = 100 + sin(hungerPulse) * 20;  
    noFill();                  
    stroke(200, 100, 100);     
    strokeWeight(3);          
    ellipse(width / 2, height / 2, pulseSize, pulseSize);  

    // mouse
    noStroke();                
    fill(30);                  
    ellipse(width / 2, height / 2, 60);  

    //  Food particles move toward the center point
    for (let p of foodParticles) {
        let dx = width / 2 - p.x;   
        let dy = height / 2 - p.y;  
        let d = dist(p.x, p.y, width / 2, height / 2);  
        p.x += dx / d * p.speed;    
        p.y += dy / d * p.speed;    

        fill(240, 180, 100, 200);   
        ellipse(p.x, p.y, p.size);  

        // If a particle is within 30 pixels of the center, reset its position to a random location on the canvas
        if (d < 30) {
            p.x = random(width);
            p.y = random(height);
        }
    }

    hungerPulse += 0.1;  
}


let sicknessPulse = 0;   // Variable controlling pulse effect in sickness animation
let virusParticles = []; // Store the array of virus particles

function setupDay4() {
    virusParticles = [];  
    for (let i = 0; i < 50; i++) {  // make 50 virus particles
        virusParticles.push({
            x: random(width),          
            y: random(height),         
            r: random(2, 6),           
            angle: random(TWO_PI),     
            speed: random(0.5, 1.5)    
        });
    }
}

function drawSickness() {
    // Background gradient color (body temperature: pale → overheated red)
    let bgR = map(sin(sicknessPulse), -1, 1, 180, 250);
    let bgG = map(sin(sicknessPulse), -1, 1, 220, 100);
    let bgB = map(sin(sicknessPulse), -1, 1, 220, 100);
    background(bgR, bgG, bgB);

    // virusparticles moving
    noStroke();
    for (let p of virusParticles) {
        fill(120, 200, 255, 150);
        ellipse(p.x + sin(p.angle) * 3, p.y + cos(p.angle) * 3, p.r);
        p.angle += 0.01 * p.speed;
        p.y += 0.2 * p.speed;
        if (p.y > height) {
            p.y = 0;
            p.x = random(width);
        }
    }

    // add visual blur effect
    fill(255, 255, 255, 30 + sin(sicknessPulse * 2) * 20);
    rect(0, 0, width, height);

    // flashing effect to simulate heartbeat
    if (frameCount % 90 < 10) {
        fill(255, 100);
        rect(0, 0, width, height);
    }
    //simulate dizziness with subtle screen wobble
    translate(random(-1.5, 1.5), random(-1.5, 1.5));
    sicknessPulse += 0.03;
}


let player;
let obstacles = [];

function setupDay5() {
    player = {x: width / 2, y: height - 60, r: 15, vy: 0};
    obstacles = [];

    for (let i = 0; i < 6; i++) {
        obstacles.push({
            x: random(50, width - 50),
            y: -i * 100,
            w: random(80, 150),
            h: 15,
            speed: 2
        });
    }
}

function drawChallenge() {
    background(colorState);

    // palyer = ball 
    fill(255, 200, 50);
    noStroke();
    ellipse(player.x, player.y, player.r * 2);

    // Update player position (moving upward continuously)
    player.vy -= 0.1; // Accelerate the player upward
    player.y += player.vy;

    if (player.y < height / 2) {
        let diff = height / 2 - player.y;
        player.y = height / 2;
        for (let obs of obstacles) {
            obs.y += diff; // Move all obstacles downward
        }
    }

    // update obstacles
    for (let obs of obstacles) {
        obs.y += obs.speed;
        fill(180, 80, 80);
        rect(obs.x, obs.y, obs.w, obs.h);

        // Collision detection
        if (
            player.x > obs.x &&
            player.x < obs.x + obs.w &&
            player.y + player.r > obs.y &&
            player.y - player.r < obs.y + obs.h
        ) {
            player.vy = -5; // Trigger a rebound motion to reflect failed attempt
            flashScreen();
        }

        // reset the obstacles' position
        if (obs.y > height) {
            obs.y = -100;
            obs.x = random(50, width - 50);
        }
    }

    // Limit maximum falling speed
    if (player.y > height - player.r) {
        player.y = height - player.r;
        player.vy = -8; // Bounce up again

    }
}
function flashScreen() {
    fill(255, 100);
    rect(0, 0, width, height);
}
