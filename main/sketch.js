//jordyn
//oct 5th 2021



// global variables
let ship;
let ship2;
let gameover = false;
let x = 300;
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
            17000,17300,17700,17850,18000,18250,18350,18400,18450,18550,18600,18650,18750,18900,19200,19500,19550,19600,19650,19700,19850,20000,20250,20300,20500,20800,21000,21350,21450,21550,21650,21750,21850,21950,22050,22100,22150,22200,22250,22300,22350,22400,22450,22500, 11000000];//last 5 burst time is right, inbetween the burst before is wrong.
let movelist = [70,  140, 190, 240, 300, 350, 400, 440, 480, 500, 520, 540, 580, 600, 630, 650, 630, 600, 560, 530, 480, 430, 410, 390, 340, 320, 300, 280, 260, 240, 220, 180, 140, 110, 70, 140, 190, 240, 300, 350, 400, 440, 480, 500, 520, 540, 580, 600, 630, 650, 630, 600, 560, 530, 480, 430, 390, 340, 320, 300, 280, 260, 240, 220, 180, 150, 130, 110, 80, 60,
  350,450,600,500,450,350,600,570,540,350,380,410,460,600,650,390,420,450,480,510,350,600,550,520,350,500,450,375,425,475,650,600,550,525,500,475,450,425,410,395,390];
let timelist2 = [17000,17300,17700,17850,18000,18250,18350,18400,18450,18550,18600,18650,18750,18900,19200,19500,19550,19600,19650,19700,19850,20000,20250,20300,20500,20800,21000,21350,21450,21550,21650,21750,21850,21950,22050,22100,22150,22200,22250,22300,22350,22400,22450,22500, 11000000];
let movelist2 = [350,250,100,200,250,350,100,130,160,350,320,290,240,100,50,310,280,250,220,190,350,100,150,180,350,200,250,325,275,225,50,100,150,175,200,225,250,275,290,305,310];
//let timevariable = 0;//                                                                                                                                                                                                          52 (13950)            
//let nextTimeVariable = 0;
//let nextTimeInList = timelist[timevariable];
//let canGoNext = false;
let startScreen = true;
let play = false;
let offset;
//let moveDown = true;
//let hasWentDown = false;
let stophere = false;
let phase2 = false;
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
    console.log(this.moveDown);
    if(this.timevariable === this.nextTimeVariable){
      console.log (this.nextTimeVariable);
      this.nextTimeVariable += 1;
      this.moveDown = true;
      this.hasWentDown = false;
    }
    console.log(this.timevariable);
    console.log(this.nextTimeVariable);
    if(this.timevariable === 16 || this.timevariable === 35){
      console.log(this.moveDown);
      if(this.moveDown === true && this.hasWentDown === false){
        this.y += 50;
        console.log(this.y);
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
        console.log(this.timevariable);
        this.canGoNext = false;
      }
      else{
        this.timevariable + 1;
      }
    }
    console.log(this.spawn + " spawn");
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
      if(!this.bulletArray[i].OnScreen()){
        this.bulletArray.splice(i,1);
      }
    }
  }
}
class Bullet {
  constructor (){
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.rotation = 0;
  }
  show(){
    stroke(255);
    fill(255);
    // push();
    // translate(this.x, this.y);
    // rotate(this.angle-90);  //is this needed anymore?
    rect(this.x,this.y,10,10);
    // pop();
  }
  bulletUpdate() {
    this.y += this.dy;
    this.x += this.dx;
    let hit = collideRectRect(this.x,this.y,10,10,x,y,80,5);
    if (hit) {
      gotHit = true;
    }

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
  music.playMode("restart");
  
}

//draw loop where everything gets executed, will be cleaner in future versions
function draw() {
  background (backgroundColor);
  if(startScreen === true){
    push();
    stroke(100,100,100);
    fill(0);
    rect(270,270,150,100);
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
    pop();
    offset = millis();
  }
  else{
    if(play === false){
      music.play(0,0.5,0.2,0);
      play = true;
    }
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
    time = millis()*0.5 - offset*0.5;    //change this line and next to set playback speed for editing
    //time = millis() - offset;
    // console.log(spawn);
    // console.log(lastChanged);
    // console.log(millis());
    ship.movingDown();
    //if the player gets hit, removes all bullets off screen
    if (gotHit === true) {
      gotHit = false;
      this.bulletSpeed = 1;
    }
    ship.moveAndBulletSpawnHandler();
    ship2.moveAndBulletSpawnHandler();
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
    if (x < 0) {
      x = 2;
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
  if (startScreen === true && mouseX < 420 && mouseY < 370 && mouseX > 270 && mouseY > 270){
    startScreen = false;
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
// rect(x,y,80,5);
  ship.display();
  if(time > 16800){
    ship2.display();
  }
}