//jordyn
//oct 5th 2021



// global variables
let ship;
let ship2;
let gameover = false;
let x = 350;
let y = 450;
let speed = 4;
let backgroundColor = "black";
let lastChanged = 700;
let time = 100;
let gotHit = false;
let shipimage;
let music;
let rotation = 0;
let timelist = [2000,2300,2670,2970,3070,3250,3900,4200,4550,4700,4750,4800,5000,5100,5400,5500,5700,6000,6400,6700,6850,7050,7500,7650,8000,8300,8450,8500,8550,8600,8650,8700,8950,9080,9280,
  9500,9800,10000,10300,10400,10600,11200,11500,11850,12000,12050,12100,12350,12450,12750,12850,13080,13380,13550,13950,14050,14150,14250,14350,14450,14550,14950,15050,15300,15600,15700,15900,16000,16450,16700,
  17000,17300,17700,17850,18000,18250,18350,18400,18450,18550,18600,18650,18750,18900,19200,19500,19550,19600,19650,19700,19850,20000,20250,20300,20500,20800,21000,21350,21450,21550,21650,21750,21850,21950,22050,22100,22150,22200,22250,22300,22350,22400,22450,22500,
  22650,22800,23000,23200,23300,23350,23400,23450,23500,23600,23900,24000,24300,24550,24850,25250,25450,25550,25850,26000,26050,26100,26200,26250,26300,26400,26600,27100,27200,27300,27400,27500,27600,27700,27750,27800,27850,27900,27950,28000,28050,28100,28300,28700,28800,28900,29000,29100,29200,29300,29400,29450,29500,29900,29950,30000,30100,30200,30400,30600,30700,30750,30800,30850,30900,31000,31200,31300,31500, 
  31800, 31850, 31900, 31950, 32000, 32050, 32100, 32150, 32200, 32250, 32300,32350,32400,32450,32500,32550,32600,32650,32700,32750,32800,32850,32900,32950,33000,33050,33100,33150,33200,33250,33300,33350,33400,33450,33500,33550,33600,33650,33700,33750,33800,33850,33900,33950,34000,34050,34100,34150,34200,34250,34300,34350,34400,34450,34500,34550,34600,34650,34700,34750,34800,34850,34900,34950,35200,35250,35300,35350,35400,35450,35500,35550,35600,
  35650,35700,35750,35800,35850,35900,35950,36000,36050,36100,36150,37350,37400,37450,37500,37550,37600,37650,37700,37750,37800,37850,37900,37950,38000,38050,38100,38150,38200,38250,38300,38350,38600,38650,38700,38750,38800,38850,38900,38950,39000,39050,39100,39150,39200,39250,39300,39350,39400,39450,39500,39550,11000000];
let movelist = [70,  140, 190, 240, 300, 350, 400, 440, 480, 500, 520, 540, 580, 600, 630, 650, 630, 600, 560, 530, 480, 430, 410, 390, 340, 320, 300, 280, 260, 240, 220, 180, 140, 110, 70, 140, 190, 240, 300, 350, 400, 440, 480, 500, 520, 540, 580, 600, 630, 650, 630, 600, 560, 530, 480, 430, 390, 340, 320, 300, 280, 260, 240, 220, 180, 150, 130, 110, 80, 60,
  350,450,600,500,450,350,600,570,540,350,380,410,460,600,650,390,420,450,480,510,350,600,550,520,350,500,450,375,425,475,650,600,550,525,500,475,450,425,410,395,390,390,390,390
  ,600,450,500,600,580,550,350,380,400,430,550,520,480,380,450,650,600,550,350,650,600,650,370,420,380,350,500,370,400,430,460,490,460,650,620,590,560,560,590,620,650,350,400,600,570,530,450,400,420,350,400,430,600,560,540,350,370,550,500,380,410,440,470,500,650,600,350,370,400
  ,550,537.5,525,512.5,500,487.5,475,462.5,450,437.5,425,412.5,400,387.5,375,362.5,350,337.5,325,312.5,300,287.5,275,262.5,250,237.5,225,212.5,200,212.5,225,237.5,625,612.5,600,587.5,375,387.5,325,312.5,50,62.5,75,82.5,325,312.5,387.5,375,450,437.5,200,212.5,500,487.5,150,162.5,550,537.5,525,512.5,100,112.5,125,137.5,600,600,500,500,500,400,400,400,400,400,400,300,300,300,300,200,200,100,100,100,555.5,533.3,500,533.3,555.5,533.3,511.1,488.8,466.6,444.4,466.6,
  488.8,466.6,444.4,422.2,400,378.8,356.6,378.8,400,422.2,75,75,150,150,150,150,225,225,300,300,300,300,450,450,450,450,500,500,500,500,550,550,550,550];
let timelist2 = [17000,17300,17700,17850,18000,18250,18350,18400,18450,18550,18600,18650,18750,18900,19200,19500,19550,19600,19650,19700,19850,20000,20250,20300,20500,20800,21000,21350,21450,21550,21650,21750,21850,21950,22050,22100,22150,22200,22250,22300,22350,22400,22450,22500,
  22650,22800,23000,23200,23300,23350,23400,23450,23500,23600,23900,24000,24300,24550,24850,25250,25450,25550,25850,26000,26050,26100,26200,26250,26300,26400,26600,27100,27200,27300,27400,27500,27600,27700,27750,27800,27850,27900,27950,28000,28050,28100,28300,28700,28800,28900,29000,29100,29200,29300,29400,29450,29500,29900,29950,30000,30100,30200,30400,30600,30700,30750,30800,30850,30900,31000,31200,31300,31500,
  32000, 32050, 32100, 32150, 32200, 32250, 32300,32350,32400,32450,32500,32550,32600,32650,32700,32750,32800,32850,32900,32950,33000,33050,33100,33150,33200,33250,33550,33600,33650,33700,33750,33800,33850,33900,33950,34000,34050,34100,34150,34200,34250,34300,34350,34400,34450,34500,34550,34600,34650,34700,34750,34800,34850,34900,34950,35000,35050,35100,35150,35200,35250,35300,35350,35400,35450,35500,35550,35600,
  35650,35700,35750,35800,35850,35900,35950,36000,36050,36100,36150,36200,36250,36300,36350,36400,36450,36500,36550,36600,36650,36700,36750,36800,36850,36900,36950,37000,37050,37100,37150,37200,37250,37300,37350,37400,37450,37500,37550,37600,37650,37700,37750,37800,37850,37900,37950,38000,38050,38100,38150,38200,38250,38300,38350,38400,38450,38500,38550,38600,38650,38700,38750,38800,38850,38900,38950,39000,39050,39100,39150,39200,39250,39300,39350,39400,39450,39500,39550,11000000];
let movelist2 = [350,250,100,200,250,350,100,130,160,350,320,290,240,100,50,310,280,250,220,190,350,100,150,180,350,200,250,325,275,225,50,100,150,175,200,225,250,275,290,305,310,310,310,310                                                                                                                                                          //this tbh
  ,100,250,200,100,120,150,350,320,300,270,150,180,210,320,250,50,100,150,350,50,100,50,320,270,320,350,200,330,300,270,240,210,240,50,80,110,140,140,110,80,50,350,300,100,130,170,250,300,280,350,300,270,100,140,160,350,330,150,200,320,290,260,230,200,50,100,350,330,300
  ,100,100,200,200,200,200,300,300,300,300,300,300,600,600,600,600,500,500,500,500,400,400,400,350,350,350,350,360,360,350,350,350,350,350,350,360,360,360,360,350,350,350,350,360,360,360,350,350,350,350,360,360,360,360,350,450,440,430,420,410,400,390,380,370,360,350,340,330,320,310,300,290,280,270,260,250,240,230,240,250,260,270,280,290,300,290,280,270,260,100,122.2,144.4,166.6,188.8,211.1,233.3,255.5,277.7,300,277.7,255.5,277.7,300,277.7,255.5,277.7,300,277.7,255.5,
  233.3,211.1,233.3,255.5,233.3,211.1,188.8,166.6,144.4,122.2,144.4,166.6,188.8,211.1,220,230,240,250,260,270,280,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,100,130,350,310,];//next is a repeat section, around 219 in list 1 and 140 in list 2
                
let startScreen = true;
let howToPlay = false;
let play = false;
let offset;
let counter = 0;
let templist = [];
//let moveDown = true;
//let hasWentDown = false;
let phase2 = false;
let restart = false;
function preload(){
  shipimage = loadImage("assets/ship.png");
  soundFormats("mp3");
  music = loadSound("assets/spaceInvaders.mp3");
}

//sets the class for bullet object with all its information
class enemyShip {
  constructor(shipSprite,dropList,xlist){
    this.x = 50;
    this.y = 100;
    this.spawn = false;
    this.bulletArray = [];
    this.bulletSpeed = 1;
    this.shipSpeed = 0;
    this.timelist = dropList;
    this.movelist = xlist;
    this.timevariable = 0;
    this.nextTimeVariable = 0;
    this.nextTimeInList = this.timelist[this.timevariable];
    this.canGoNext = false;
    this.moveDown = true;
    this.hasWentDown = false;
    this.sprite = shipSprite;
  }
  display(){
    imageMode(CENTER);
    image(this.sprite,this.x,this.y,50,50);
    for (let i = this.bulletArray.length-1; i > 0; i--) {
      this.bulletArray[i].show();
      this.bulletArray[i].bulletUpdate();
    }
    if(time > 16800 && phase2 === false){
      ship.y = 50;
      ship.x = 350;
      ship2.y = 50;
      ship2.x = 350;
      phase2 = true;
    }
  }
  movingDown(){
    this.x += this.shipSpeed;
    //console.log(this.moveDown);
    if(this.timevariable === this.nextTimeVariable){
     // console.log (this.nextTimeVariable);
      this.nextTimeVariable += 1;
      this.moveDown = true;
      this.hasWentDown = false;
    }
   // console.log(this.timevariable);
    //console.log(this.nextTimeVariable);
    if(this.timevariable === 16 || this.timevariable === 35){
      //console.log(this.moveDown);
      if(this.moveDown === true && this.hasWentDown === false){
        this.y += 50;
        //console.log(this.y);
        this.hasWentDown = true;
      }
    }
    if(this.hasWentDown === true){
      this.moveDown = false;
    }
  }
  bullet8blast(){
    for (let i = 0; i < 8; i ++) {
      let bullet = new Bullet();
      angleMode(DEGREES);
      bullet.rotation = 360/8 * i + rotation;
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.dx = cos(bullet.rotation) * this.bulletSpeed * 2;
      bullet.dy = sin(bullet.rotation) * this.bulletSpeed * 2;
      // start doing the bullet spray
      this.bulletArray.push(bullet);
      console.log(bullet.x,bullet.y);
      this.spawn = false;
    }
  }
  bulletshotgun3(){
    for (let i = 0; i < 3; i ++) {
      let bullet = new Bullet();
      angleMode(DEGREES);
      rotation += 20;
      bullet.rotation = 10/3 * i + rotation;
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.dx = cos(bullet.rotation) * this.bulletSpeed * 2;
      bullet.dy = sin(bullet.rotation) * this.bulletSpeed * 2;
      // start doing the bullet spray
      this.bulletArray.push(bullet);
      console.log(bullet.x,bullet.y);
      console.log("bulletpushed3");
      this.spawn = false;
    }
  }
  Dropdown1(){
    let bullet = new Bullet();
    bullet.x = this.x;
    bullet.y = this.y;
    bullet.dx = 0;
    bullet.dy = 10;
    bullet.rotation = 0;
    this.spawn = false;
    this.bulletArray.push(bullet);
  }
  // moveShip(i){
  //   let moveAmount = Math.abs(movelist[i] - movelist[i-1]);
  //   imageMode(CENTER);
  //   image(this.sprite,this.x,this.y,50,50);
  //   console.log(moveAmount);
  //   this.x += moveAmount/10;
    

  // }
  moveAndBulletSpawnHandler(){
    if (time > this.nextTimeInList && this.canGoNext === true){
      this.canGoNext = false;
      if(this.timevariable + 1 < this.timelist.length){
        this.timevariable += 1;
        this.spawn = true;
        //console.log(this.timevariable);
        this.canGoNext = false;
      }
      else{
        this.timevariable + 1;
      }
    }
    //console.log(this.spawn + " spawn");
    if (this.spawn === true) {
      this.Dropdown1();
      // for(let i = 0; i < 10;i++){
      //   this.moveShip(timevariable);
      //   this.display();//this doesnt work as intented, also moves bullets.
      // }
      this.x = this.movelist[this.timevariable];
      this.spawn = false;
      console.log(this.timevariable);
    }
    for (let i = this.bulletArray.length-1; i >= 0; i--){
      if(!this.bulletArray[i].OnScreen() || restart === true){
        this.bulletArray.splice(i,1);
      }
      else if(this.bulletArray[i].x > x && this.bulletArray[i].y === y && this.bulletArray[i].x < x+50){
        this.bulletArray.splice(i,1);
        counter ++;
      }
    }
  }
}
class Bullet {
  constructor (){
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 1;
    this.rotation = 0;
  }
  show(){
    stroke(255);
    fill(255);
    rect(this.x,this.y,10,10);
  }
  bulletUpdate() {
    this.y += this.dy;
    this.x += this.dx;

  }
  OnScreen() {
    return this.y <= height && this.y >= 0 && this.x <= width && this.x >= 0;
  }
}

//draws the canvas (the size is meant to be limited)
function setup() {
  createCanvas(700,500);
  millis();
  // noLoop();
  ship = new enemyShip(shipimage,timelist,movelist);
  ship2 = new enemyShip(shipimage,timelist2,movelist2);
  let bullet = new Bullet();
  ship.bulletArray.push(bullet);
  let bullet2 = new Bullet();
  ship2.bulletArray.push(bullet2);
  music.playMode("restart");
  for(let i = 37850; i <= 38500; i+=50){
    templist.push(i);
  }
}

//draw loop where everything gets executed, will be cleaner in future versions
function draw() {
  background (backgroundColor);
  if(startScreen === true){
    push();
    stroke(100,100,100);
    fill(0);
    rect(270,270,150,100);
    rect(295,372,100,50);
    pop();
    push();
    fill(100,100,100);
    textSize(50);
    text("Space Invaders",170,150,600,600);
    pop();
    push();
    fill(100,100,100);
    text("dodge the beat",300,200,400,400);
    text("start",330,315,400,400);
    text("How to play",315,392,100,100);
    pop();
    offset = millis();
  }
  else if (howToPlay === true && startScreen === false){
    push();
    stroke(100,100,100);
    fill(100);
    textSize(15);
    text("use A and D keys to move the platform looking thing below (which is you), holding down the left mouse button will make you move faster while it is held. your goal is to dodge all the bullets from the ship(s) above you.",200,200,300,300);
    pop();
    push();
    stroke(100,100,100);
    fill(0);
    rect(300,350,100,100);
    text("back",340,390,100,100);
    pop();
  }
  else{
    if(play === false){
      music.play(0,1,0.2,0);
      play = true;
    }
    let hitcount = "times hit: " + counter;
    push();
    textSize(10);
    stroke(100,100,100);
    fill(100);
    text(hitcount,600,50,700,50);
    pop();
    displayEntities();
    handleKeys();
    ship.nextTimeInList = ship.timelist[ship.timevariable];
    ship2.nextTimeInList = ship2.timelist[ship2.timevariable];
    if(ship.timevariable < ship.timelist.length){
      ship.canGoNext = true;
    }
    if(ship2.timevariable < ship2.timelist.length){ //ships are seperated since they are going to have different timings.
      ship2.canGoNext = true;
    }
    //time = millis()*0.5 - offset*0.5;    //change this line and next to set playback speed for editing
    time = millis() - offset;
    // console.log(spawn);
    // console.log(lastChanged);
    // console.log(millis());
    console.log(counter);
    ship.movingDown();
    //if the player gets hit, removes all bullets off screen
    if (gotHit === true) {
      gotHit = false;
      this.bulletSpeed = 1;
    }
    console.log(restart);
    ship.moveAndBulletSpawnHandler();
    ship2.moveAndBulletSpawnHandler();
    restart = false;
    if(ship.nextTimeInList === 11000000){
      ship.x = -100;
      ship2.x = -100;
      text("(the end)",height/2,width/2,450,450);
      music.stop();
    }
  }
}

//this is how the player being controlled is handled
function handleKeys() {
  if (mouseIsPressed) {
    speed = 15;
  }
  else {
    speed = 5;
  }
  if (keyIsDown(65)) { //a 
    x -= speed;
    if (x < 50) {
      x = 50;
    }
  }
  if (keyIsDown(68)) { //d
    x += speed;
    if (x > 620) {
      x = 620; 
    }
  }
}
function mousePressed(){
  let canchange = true;
  if(startScreen === true && canchange === true && mouseX < 395 && mouseY < 422 && mouseX > 295 && mouseY > 372){
    howToPlay = true;
    startScreen = false;
    //console.log(mouseX);
    //console.log(mouseY);
    canchange = false;
  }
  if (startScreen === true && canchange === true && mouseX < 420 && mouseY < 370 && mouseX > 270 && mouseY > 270){
    startScreen = false;
    canchange = false;

  }
  if(howToPlay === true && canchange === true && mouseX < 400 && mouseY < 450 && mouseX > 300 && mouseY > 350){
    howToPlay = false;
    startScreen = true;
    canchange = false;
  }
  if(startScreen == false && canchange === true && mouseX < 700 && mouseY < 50 && mouseX > 648 && mouseY > 0){
    offset += time;
    ship.timevariable = 0;
    ship2.timevariable = 0;
    ship.x = movelist[0];
    ship.y = 100;
    ship2.x = movelist2[0];
    counter = 0;
    restart = true;
    play = false;
  }
}
function keyPressed(){
  if(key === "f"){
    noLoop();
  }
  if (key === "g"){
    loop(); 
  }

}
//displays player and ship
function displayEntities() {
  push();
  noStroke();
  fill(50);
  rect(50,y,610,5);
  pop();
  push();
  noStroke();
  fill(200);
  rect(x,y,50,5);
  pop();
  push()
  stroke(100)
  fill(0);
  rect(648,2,50,30);
  pop();
  push();
  noStroke();
  fill(100);
  text("restart",655,10,700,50);
  pop();
  ship.display();
  if(time > 16800){
    ship2.display();
  }
}