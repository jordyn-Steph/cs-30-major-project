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
let timelist = [2000,2250,2570,2650,2750,2850,3000]; //continue with the timings, the first two are right
let movelist = [50,20,20,20,20,50,100];
let timevariable = 0;
let nextTimeInList = timelist[timevariable];
let canGoNext = false;
let startScreen = true;
let play = false;
let offset;
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
    bullet.dy = 2;
    bullet.rotation = 0;
    spawn = false;
    this.bulletArray.push(bullet);
  }
  bulletSpawnHandler(){
    console.log(canGoNext + "cangonext");
    if (time > nextTimeInList && canGoNext === true){
      canGoNext = false;
      if(timevariable + 1 < timelist.length){
        timevariable += 1;
        spawn = true;
        console.log(spawn);
        canGoNext = false;
      }
      else{
        timevariable + 1;
      }
    }
    console.log(spawn + " thing");
    if (spawn === true) {
      this.Dropdown1();
      this.x += movelist[timevariable];
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
    // rotate(this.angle-90);  //rotation isnt working, problem for another day
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
      music.play();
      play = true;
    }
    displayEntities();
    handleKeys();
    nextTimeInList = timelist[timevariable];
    if(timevariable < timelist.length){
      canGoNext = true;
    }
    time = millis() - offset;
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
  if (startScreen === true && mouseX < 420 && mouseY < 370 && mouseX > 270 && mouseY > 270){//add numbers
    startScreen = false;
  }
}
function keyPressed(){
  if(key === "f"){
    noLoop();
  }
  if (key === "g"){
    loop(); //find out whats going on with variables
  }

}
//displays player and ship
function displayEntities() {
// rect(x,y,80,5);
  ship.display();
}