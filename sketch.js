/*
"Moved to London, Got Bed Bugs", Michaella Miller, Updated: 20.01.2026

On the tenth day of moving into my London flat, I’ve discovered my mattress is infested with bed bugs. What ensued post discovery and treatment was paranoia that overtook my everyday life. I have spent my free time ironing my clothes. Flipped my (new) mattress once a week. Bleeding money into anti bed bug products. My room was no longer my own. It belonged to them really.  
I have adapted my dealings with bed bugs into an interactive, choose your own adventure game. Enjoy.


Instructions:  Using the mouse, click the choice buttons to progress in this interactive fiction piece.

This is a piece of chiefly text based interactive fiction (IF), about the the emotional toll post dealing with insect infestations. 

IF must interact with input meaningfully (Montfort, 2003): In this case, all player choices converge on the same psychological endpoint, 
develop regardless of treatment approach.The key point for the protagonist's sanity slipage is the discovery of the in-world actual infestion. The illusion of agency mirrors the protagonist's loss of control over their own perception of reality.
The player should question if the final sequence occurs in the protagonists head or in the IF's material world.For the peak of the narrative, I have referred to delusory parasitosis (DP)- a condition in which the sufferer remains convinced they are dealing with an infestation, experiencing itching, crawling, pinprick sensations known as formication and paresthesia [Hinkle, 2000]. This complex is derived from being as stated, a delusion – with professionals finding lesions on the skin but no sign of the infestation itself. However one can experience DP post an actual infestation as a trauma response.
Individuals with DP gather evidence off their own body - skin particles and entrapped hairs and fibers that are insect-like [Hinkle, 2003][Freudenmann]. They overtreat their skin with everything between home remedies and bleach, self-harming in the process. The gendered dimension of delusory parasitosis - with sufferers being disproportionately female [Hinkle, 2000] - intersects with patterns of medical dismissal. This dynamic drives obsessive evidence-gathering and DIY treatment escalation, creating a feedback loop where self-advocacy becomes self-harm.
 

Bibliography:

Freudenmann, R.W. and Lepping, P. (2009) 'Delusional infestation', Clinical Microbiology Reviews, 22(4), pp. 690-732.

Hinkle, N.C. (2000) 'Delusory parasitosis', American Entomologist, 46(1), pp. 17-25.

Montfort, N. (2003) Twisty Little Passages: An Approach to Interactive Fiction. Cambridge, MA: MIT Press.

Developed with assistance from Claude AI (Anthropic) for:
- Menu system implementation and game state management (lines 270-320, function draw())
- Window resize bug fix for button repositioning (line 417, function windowResized())
- Menu text persistence bug fix (loading state delay, line 255)
- Code structure consultation and debugging support throughout development
- Academic research integration and narrative design feedback
*/

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
  noCursor();
   
  // Force CSS cursor to none
  document.body.style.cursor = 'none';
  
  // Create HTML cursor element
  let cursorImg = createImg("BUG.png");
  cursorImg.id("custom-cursor");
  cursorImg.style('position', 'absolute');
  cursorImg.style('pointer-events', 'none'); // allows clicking through it
  cursorImg.style('z-index', '9999'); // stays on top of everything
  cursorImg.style('width', '75px');
  cursorImg.style('height', '60px');

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

        // Clear the canvas immediately
        background(0);
        grid();

        // Then change state
        gameState = "playing";
        currentNode = "start";
        visitCount = {};
        updateButtons();
      });
      buttons.push(playBtn);
    }
  } else if (gameState === "playing") {
    // Clear any menu buttons that might have persisted
    if (
      currentNode === "start" &&
      buttons.length > 0 &&
      buttons[0].html() === "PLAY"
    ) {
      for (let btn of buttons) {
        btn.remove();
      }
      buttons = [];
      updateButtons();
    }
    textSize(22);

    text(story[currentNode].text, width / 4, 50, width / 2, height - 200);
    if (  // console message would show after three visits to each node
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
      imageMode(CENTER);
      image(doorImg, width / 2, height / 3, 350, 350);
    }
  }
    // fixed here custom cursor not showing over buttons with Claude  
    // Update cursor position (at the very end)
  let cursor = select("#custom-cursor");
  cursor.position(mouseX - 37.5, mouseY - 30); // offset to center it

  //image(bugImg, mouseX, mouseY, 75, 60)
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
  // Adding the ENTER and F keys for fullscreen mode - thought ENTER makes more sense
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
