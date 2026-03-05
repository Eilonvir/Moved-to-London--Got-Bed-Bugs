
// Variable for story structure json
let story;

let currentNode = "start"; //Tracks player's current position in the story
let buttons = [];
let gameState; // playing or idle, to return to menu
let visitCount = {}; // Tracks visits to each node
let startTime; // for fullscreen instruction to appear in a delay



//visuals > Overall: I've used grainy visuals for a retro horror game feel
let doorImg;
let bugImg;

function preload() {
  story = loadJSON('story.json');
  doorImg = loadImage("door.png");
  bugImg = loadImage("BUG.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  textFont("Courier New");
  fill(255);

  gameState = "loading"; // short delay to ensure proper initialization before showing menu
  setTimeout(() => {
    gameState = "menu";
  }, 100);
  startTime = millis();
}

function draw() {
  let elapse = millis() - startTime;
  background(0);
  grid();
  if (gameState === "loading") {
    //blank screen before menu shows to clear bug

    return;
  }
  if (gameState === "menu") {
    textSize(32);
    text("Moved to London, Got Bed Bugs", width / 2, height / 2 - 50);
    textSize(16);
    text(
      "Content Warning: Entomophobia, parasitosis, trypophobia, self harm",
      width / 2,
      height / 2
    );

    if (elapse > 2000 && !fullscreen()) {
      text("Press Enter for Fullscreen", width / 2, 100);
    }
    if (buttons.length === 0) {
      let playBtn = createButton("PLAY");
      playBtn.position(width / 2 - 100, height / 1.5);
      playBtn.size(200, 50);
      playBtn.style('cursor', 'none');
      playBtn.mousePressed(() => {
        playBtn.remove();
        buttons = [];


        gameState = "playing";
        currentNode = "start";
        visitCount = {};
        updateButtons();
      });
      buttons.push(playBtn);
    }
  } else if (gameState === "playing") {

    textSize(22);

    text(story[currentNode].text, width / 4, 50, width / 2, height - 200);

    // Show warning after three visits to loop nodes
    if (
      (currentNode === "Inspect bites" ||
        currentNode === "Google bug bites" ||
        currentNode === "Scratch") &&
      visitCount[currentNode] >= 3
    ) {
      textSize(16);
      fill(255, 0, 0);
      text(
        "You've explored all paths here. Go to bed.",
        width / 2,
        height - 100
      );
      fill(255);
      textSize(22);
    }

    // Display door image at start node
    if (currentNode === "start") {
      image(doorImg, width / 2, height / 3, 350, 350);
    }
  }
  // Update cursor position  
  let cursor = select("#custom-cursor");
  cursor.position(mouseX - 37.5, mouseY - 30); 


}

function updateButtons() {
  //inputs current node options to the appropriate number of buttons, and centers them in the layout.

  // return to menu tool
  if (currentNode === "Return to Menu") {
    for (let btn of buttons) {
      btn.remove();
    }
    buttons = [];
    gameState = "menu";
    currentNode = "start"; // Reset story position
    return;
  }
  // removes a button if necessary, based off number of option buttons needed
  for (let btn of buttons) {
    btn.remove();
  }
  buttons = []; // array for current choice buttons to store and remove

  //Giving variables alt names for readability
  let options = story[currentNode].options;
  let keys = Object.keys(options);
  let totalButtons = keys.length;
  let buttonWidth = 200;
  let spacing = 20;

  //Calculating here the pixels the total width of the current number of buttons + spacing would take
  let totalWidth = totalButtons * buttonWidth + (totalButtons - 1) * spacing;

  //the start x point would adjust according to the buttons, so that they would be positioned at the center of screen, for a neater layout.
  let startX = (width - totalWidth) / 2;
  let buttonY = height / 1.5;

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let btn = createButton(options[key]);
    btn.position(startX + i * (buttonWidth + spacing), buttonY);
    btn.size(buttonWidth, 40);
    btn.style('cursor', 'none');
    btn.mousePressed(() => {
      currentNode = options[key];

      // Track visits for loop nodes
      if (!visitCount[currentNode]) {
        visitCount[currentNode] = 0;
      }
      visitCount[currentNode]++;
      updateButtons();
    });
    buttons.push(btn);
  }
}

function grid() {
  //Tight custom grid from previous projects help tie other code sketches of mine visually as a series. Helps a more aesthetic interface
  stroke(255, 40);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }
}

function keyPressed() {
  //Adding the ENTER and F keys for fullscreen mode - thought ENTER makes more sense
  if (key === "f" || key === "F" || key === "Enter" || key === "ENTER") {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
function windowResized() {
  if (fullscreen()) {
    resizeCanvas(windowWidth, windowHeight);
    updateButtons(); // fixes a bug in button location when  moving to full screen. Done with Claude AI
  }
}
