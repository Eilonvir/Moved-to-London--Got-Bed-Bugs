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

// Story object base code - each node contains texts and path choices
let story = {
  start: {
    //Ideally content warning goes in the menu/title page. But otherwise will be here.

    //Start of exposition sequence. door visual appears on this node.

    text: "",

    options: { a: "ENTER" },
  },

  ENTER: {
    //

    text:
      "Congrats! you moved to London. Flat is nice. Flatmates are nice too. Are we going to the pub tonight?",

    // First decision point - with minor consequence - Ultimately leads the player to the next stage. Signifies futillity

    options: { a: "Yep!", b: "Nah. Going to bed now" },
  },

  "Yep!": {
    text: "Drank waaaay too much. Getting sleepy.  Good night!",
    options: { a: "Sleep" },
  },
  "Nah. Going to bed now": {
    text: "Straight to bed now, sleep tight",
    options: { a: "Sleep" },
  },
  Sleep: {
    text: "Night 01. The mattress feels a bit lumpy",
    options: { a: "Inspect mattress", b: "Go back to sleep" }, //Another minor decision point, will affect player's state in the morning (a.Fix mattress > sleep well / b. Ignore issue > back will hurt in the morning)
  },
  "Inspect mattress": {
    //Path to positive outcome
    text: "One of the slats seems to have gone out of place",
    options: { a: "Fix" },
  },
  "Go back to sleep": {
    // Said consequence of ignoring the issue
    text: "Back hurts like a bitch in the morning",
    options: { a: "Next" },
  },
  Fix: {
    text: "Had a decent night's sleep!",
    options: { a: "Next" },
  },
  Next: {
    //The turning point. You wake up with bites and investigate
    text: "Night 05, You wake up with bites",
    options: { a: "Inspect bites", b: "Google bug bites", c: "Scratch" },
  },
  "Inspect bites": {
    // Some playtesters got stuck in a loop here (current node + "Google bug bites", scratch). To progress you need to choose "Go to bed"

    text:
      "There's a huge red spot on your temple. It's puffy in the morning but flattens and spreads by the evening. There's a cluster of smaller bites on your shoulder. Very close together.",
    options: {
      a: "Google bug bites",
      b: "Scratch",
      c: "Go to bed",
    },
  },
  "Google bug bites": {
    text:
      "Search results show bed bugs, fleas, mites. The bite clusters match bed bugs. Fuck.",
    options: { a: "Inspect bites", b: "Scratch", c: "Go to bed" },
  },
  Scratch: {
    //Foreshadowing self harm escalation later on
    text: "You're bleeding",
    options: { a: "Inspect bites", b: "Google bug bites", c: "Go to bed" },
  },
  "Go to bed": {
    text:
      "Night 08. You wake up with more bites on your face and back. One is right on your lip",
    options: {
      a: "Consult flatmates",
      b: "Lift mattress",
    },
  },
  "Consult flatmates": {
    text:
      "Flatmate #1 says airing the mattress outside might help with the stress",
    options: { a: "Lift mattress" },
  },

  "Lift mattress": {
    text: "You lift the mattress to air it out...",
    options: { a: "Continue" },
  },
  Continue: {
    // The reveal. You always reach this point regardless of chosen path
    text: "There are bugs. Small, brown, flat bugs. Everywhere.",

    //Limited but different emotional response choices reinforce the illusion of agency.
    options: { a: "Panic", b: "PANIC", c: "Stay calm" },
  },
  Panic: {
    text: "Ew. EWWWW",
    options: { a: "PANIC" },
  },
  PANIC: {
    text:
      "You shit yourself. Your flatmate shits himself. Your other flatmate is fine. What now?",
    options: {
      a: "Contact landlord",
      b: "Contact council",
      c: "Deal with it yourself.",
    },
  },
  "Stay calm": {
    text: "Eh gross. Bugs are bugs. What now?",
    options: {
      a: "Contact landlord",
      b: "Contact council",
      c: "Deal with it yourself.",
    },
  },
  "Contact landlord": {
    // This path is about dismissal. Had gendered dismissal in mind but thought it would come across as too blunt in text.
    text:
      "Your landlord says the bugs probably came with you. He drops off spray cans. 'That should do it.'",
    options: { a: "Push back", b: "Fine. DIY" },
  },

  "Push back": {
    //dissmisal path continuation
    text: "You ask for professional pest control. He stops replying to texts.",
    options: { a: "Deal with it yourself." },
  },

  "Fine. DIY": {
    text: "You spray everything. Twice. The bites continue.",
    options: { a: "Deal with it yourself." },
  },
  "Contact council": {
    //bureaucratic nightmare path
    text:
      "Council website: 'Submit request online. Processing takes 2-4 weeks.' Your bites can't wait.",
    options: { a: "Deal with it yourself." },
  },
  "Deal with it yourself.": {
    // All paths force you here eventually. Experiencing a systemic let down and isolation.
    text: "Fine. You'll handle this. What's the plan?",
    options: { a: "DIY", b: "Professional" },
  },

  DIY: {
    // Isolation leads to sanity slipage
    text:
      "You order diatomaceous earth and spray. Week 1: still bites. Week 2: more powder. Week 3: you're checking the mattress TWICE DAILY. Flipping it once a week",
    options: { a: "Night 28" },
  },

  Professional: {
    // financial toll leads to sanity slipage
    text:
      "£800 for heat treatment. They come Tuesday. You evacuate for the day. That night: new bites. You book another treatment. Your flatmate offers her room while you wait for a new mattress. All your clothes go into plastic bags on the balcony. You iron everything. Then iron them again.",
    options: { a: "Night 28" },
  },
  "Night 28": {
    // Start of post treatment sanity sink. Progresion is chronological between nights 28-35-37 to "Cut skin open"
    text:
      "Night 28. You've been sleeping on the plastic wrap since the mattress arrived. Everything in this room feels contaminated.",
    options: { a: "Night 35" },
  },

  "Night 35": {
    //Start of delusional parasitosis symptoms
    text:
      "Night 35. You feel crawling on your skin. Static electricity, you tell yourself. But you can't shake the eerie feeling that you're not alone. You can't sleep.",
    options: { a: "Night 37" },
  },

  "Night 37": {
    //Escalation
    text:
      "Night 37. You feel pinpricks. Biting sensations. Every speck of dust could be an egg latched onto your clothes. Even after a hot shower, it's still there. You NEED to see what's underneath.",
    options: { a: "Cut skin open", b: "Cut skin open", c: "Cut skin open" },
  },
  "Cut skin open": {
    // Peak of story. Evidence gathering is a characteristic of DP. Self harming in the process of attempting to prove one's sanity.
    text:
      "You dig in with your nails. There's something small, beady, and ugly there—you can present it to your landlord. You're bleeding but clean. The dots are everywhere now.",
    options: { a: "End" },
  },
  End: {
    text:
      "A few months have passed. You still flip your mattress once a week. Spray cans and diatomaceous earth at the ready. Your bed is a complete fortress. You've bled money in the process. But your room is yours again. You are safe now.",
    options: { a: "About Delusory Parasitosis", b: "Return to Menu" },
  },
  "About Delusory Parasitosis": {
    text:
      "Delusory parasitosis (DP) is a condition where individuals remain convinced of parasitic infestation, despite no evidence. Experiencing pinpricks, biting and crawling sensations.They have extensive knowledge of the parasite they are dealing with in terms of appearance and behaviour. They gather evidence of infestation to prove their sanity, sometimes from their own body. Patients with DP are disproportionately female (Hinkle, 2000). This project explores the psychological aftermath of actual bed bug infestations.",
    options: { a: "Return to Menu" },
  },
};

let currentNode = "start"; //Tracks player's current position in the story
let buttons = [];
let gameState; // playing or idle, to return to menu
let visitCount = {}; // Tracks visits to each node
let startTime; // for fullscreen instruction to appear in a delay

//visuals > Overall: I've used grainy visuals for a retro horror game feel
let doorImg;
let bugImg;

function preload() {
  doorImg = loadImage("door.png");
  bugImg = loadImage("BUG.png")
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
