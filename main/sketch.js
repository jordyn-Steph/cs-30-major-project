//jordyn
//oct 5th 2021



// global variables
let Bullets = [];
let ship;
let gameover = false;
let x = 300;
let y = 450;
let speed = 4;
let bulletSpeed = 1;
let backgroundColor = "black";
let ball;
let lastChanged = 700;
let time = 100;
let spawn = true;
let gotHit = false;
let shipimage;
let rotation = 0;
function preload(){
  shipimage = loadImage("assets/ship.png");
}

//sets the class for bullet object with all its information
class enemyShip {
  constructor(shipSprite){
    this.x = 300;
    this.y = 100;
    this.sprite = shipSprite;
  }
  display(){
    imageMode(CENTER);
    image(this.sprite,this.x,this.y,50,50);
  }
  move(){
    this.x += 0;
  }
}
class Bullet {
  constructor (dx,dy){
    this.x = 0;
    this.y = 0;
    this.dx = dx;
    this.dy - dy;
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
  moveAndHitDet() {
    this.y += this.dy;
    this.x += this.dx;
    let hit = collideRectRect(this.x,this.y,10,10,x,y,80,5);
    if (hit) {
      gotHit = true;
    }
  }

}

//draws the canvas (the size is meant to be limited)
function setup() {
  createCanvas(700,500);
  millis();
  ship = new enemyShip(shipimage);
}

//draw loop where everything gets executed, will be cleaner in future versions
function draw() {
  background (backgroundColor);
  displayEntities();
  handleKeys();
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
    bulletSpeed = 1;
  }
  bulletSpawnHandler();

  //loops the bullets moving
  for (let i = 0; i < Bullets.length; i++) {
    Bullets[i].moveAndHitDet();
    Bullets[i].show();
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

//handles bullets being spawned at reasonable rates unless the player lasts a while
function bulletSpawnHandler() {
  if (spawn === true) {
    spawnBullets();
    rotation += 60;
    spawn = false;
  }
  if (millis() > 1000){
    //   spawnBullets();
    spawn = true;
  }
  //if (millis() > lastChanged){
  //   lastChanged += 100 - bulletSpeed * 4;
  //   spawn = true;
  // console.log(lastChanged);
  //}
}

//adds bullets to the array so they exist
function spawnBullets(){
  bullet8blast();
  if(millis() > 1000){
    bulletshotgun3();
  }
}
function bullet8blast(){
  for (let i = 0; i < 8; i ++) {
    let bullet = new Bullet();
    angleMode(DEGREES);
    bullet.rotation = 360/8 * i + rotation;
    bullet.x = ship.x;
    bullet.y = ship.y;
    bullet.dx = cos(bullet.rotation) * bulletSpeed * 2;
    bullet.dy = sin(bullet.rotation) * bulletSpeed * 2;
    // start doing the bullet spray
    Bullets.push(bullet);
    console.log(bullet.x,bullet.y);
  }
}
function bulletshotgun3(){
  for (let i = 0; i < 3; i ++) {
    let bullet = new Bullet();
    angleMode(DEGREES);
    rotation += 20;
    bullet.rotation = 10/3 * i + rotation;
    bullet.x = ship.x;
    bullet.y = ship.y;
    bullet.dx = cos(bullet.rotation) * bulletSpeed * 2;
    bullet.dy = sin(bullet.rotation) * bulletSpeed * 2;
    // start doing the bullet spray
    Bullets.push(bullet);
    console.log(bullet.x,bullet.y);
    console.log("bulletpushed3");
  }
}
//displays player and my shape
function displayEntities() {
  rect(x,y,80,5);
  ship.display();
}