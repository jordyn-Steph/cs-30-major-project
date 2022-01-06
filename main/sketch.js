//jordyn
//oct 5th 2021



// global variables
let ship;
let gameover = false;
let x = 300;
let y = 450;
let speed = 4;
let backgroundColor = "black";
let lastChanged = 700;
let time = 100;
let spawn = false;
let gotHit = false;
let shipimage;
let music;
let rotation = 0;
let timelist = [2000,2300,2670,2970,3070,3250,3900,4200,4550,4700,4750,4800,5000,5100,5400,5500,5700,6000,6400,6700,6850,7050,7500,7650,8000,8300,8450,8500,8550,8600,8650,8700,8950,9080,9280,
                9430,9730,10030,10330,10430,10610,11260,11560,11910,12060,12110,12160,1000000]; // 7800 to 9150 //continue with the timings, the last 12 arent right, by a small amount
let movelist = [70,  140, 190, 240, 300, 350, 400, 440, 480, 500, 520, 540, 580, 600, 630, 650, 630, 600, 560, 530, 480, 430, 410, 390, 340, 320, 300, 280, 260, 240, 220, 180, 140, 110, 70, 140, 190, 240, 300, 350, 400, 440, 480, 500, 520, 540, 580, 600, 630, 650, 630, 600, 560, 530, 480, 430, 390, 340, 320, 300, 280, 260, 240, 220, 180, 140, 110, 70];
let timevariable = 0;
let nextTimeVariable = 0;
let nextTimeInList = timelist[timevariable];
let canGoNext = false;
let startScreen = true;
let play = false;
let offset;
let moveDown = true;
let hasWentDown = false;
let stophere = false;
function preload(){
  shipimage = loadImage("assets/ship.png");
  soundFormats("mp3");
  music = loadSound("assets/spaceInvaders.mp3");
}

//sets the class for bullet object with all its information
class enemyShip {
  constructor(shipSprite){
    this.x = 50;
    this.y = 100;
    this.bulletArray = [];
    this.bulletSpeed = 1;
    this.shipSpeed = 0;
    this.sprite = shipSprite;
  }
  display(){
    imageMode(CENTER);
    image(this.sprite,this.x,this.y,50,50);
    for (let i = this.bulletArray.length-1; i > 0; i--) {
      this.bulletArray[i].show();
      this.bulletArray[i].bulletUpdate();
    }
  }
  move(){
    this.x += this.shipSpeed;
    console.log(moveDown);
    if(timevariable === nextTimeVariable){
      console.log (nextTimeVariable);
      nextTimeVariable += 1;
      moveDown = true;
      hasWentDown = false;
    }
    console.log(timevariable);
    console.log(nextTimeVariable);
    if(timevariable === 16 || timevariable === 35){
      console.log(moveDown);
      if(moveDown === true && hasWentDown === false){
        this.y += 50;
        console.log(this.y);
        hasWentDown = true;
      }
    }
    if(hasWentDown === true){
      moveDown = false;
    }
  }
  bullet8blast(){
    for (let i = 0; i < 8; i ++) {
      let bullet = new Bullet();
      angleMode(DEGREES);
      bullet.rotation = 360/8 * i + rotation;
      bullet.x = ship.x;
      bullet.y = ship.y;
      bullet.dx = cos(bullet.rotation) * this.bulletSpeed * 2;
      bullet.dy = sin(bullet.rotation) * this.bulletSpeed * 2;
      // start doing the bullet spray
      this.bulletArray.push(bullet);
      console.log(bullet.x,bullet.y);
      spawn = false;
    }
  }
  bulletshotgun3(){
    for (let i = 0; i < 3; i ++) {
      let bullet = new Bullet();
      angleMode(DEGREES);
      rotation += 20;
      bullet.rotation = 10/3 * i + rotation;
      bullet.x = ship.x;
      bullet.y = ship.y;
      bullet.dx = cos(bullet.rotation) * this.bulletSpeed * 2;
      bullet.dy = sin(bullet.rotation) * this.bulletSpeed * 2;
      // start doing the bullet spray
      this.bulletArray.push(bullet);
      console.log(bullet.x,bullet.y);
      console.log("bulletpushed3");
      spawn = false;
    }
  }
  Dropdown1(){
    let bullet = new Bullet();
    bullet.x = ship.x;
    bullet.y = ship.y;
    bullet.dx = 0;
    bullet.dy = 10;
    bullet.rotation = 0;
    spawn = false;
    this.bulletArray.push(bullet);
  }
  // moveShip(i){
  //   let moveAmount = Math.abs(movelist[i] - movelist[i-1]);
  //   imageMode(CENTER);
  //   image(this.sprite,this.x,this.y,50,50);
  //   console.log(moveAmount);
  //   this.x += moveAmount/10;
    

  // }
  bulletSpawnHandler(){
    if (time > nextTimeInList && canGoNext === true){
      canGoNext = false;
      if(timevariable + 1 < timelist.length){
        timevariable += 1;
        spawn = true;
        console.log(timevariable);
        canGoNext = false;
      }
      else{
        timevariable + 1;
      }
    }
    console.log(spawn + " spawn");
    if (spawn === true) {
      this.Dropdown1();
      // for(let i = 0; i < 10;i++){
      //   this.moveShip(timevariable);
      //   this.display();//this doesnt work as intented, also moves bullets.
      // }
      this.x = movelist[timevariable];
      spawn = false;
      console.log(timevariable);
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
    noFill();
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
  ship = new enemyShip(shipimage);
  let bullet = new Bullet();
  ship.bulletArray.push(bullet);
  music.playMode("restart");
  
}

//draw loop where everything gets executed, will be cleaner in future versions
function draw() {
  if( timevariable === 15){
    stophere === true;
  }
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
    nextTimeInList = timelist[timevariable];
    if(timevariable < timelist.length){
      canGoNext = true;
    }
    time = millis()*0.5 - offset*0.5;    //change this line and next to set playback speed for editing
    //time = millis() - offset;
    // console.log(spawn);
    // console.log(lastChanged);
    // console.log(millis());
    ship.move();
    //if the player gets hit, removes all bullets off screen
    if (gotHit === true) {
    // for (let die = 0; die < Bullets.length + 3; die++) {
    // Bullets.pop();
    //}
      gotHit = false;
      this.bulletSpeed = 1;
    }
    ship.bulletSpawnHandler();
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
}