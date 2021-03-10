var balloon;
var database, balloonposition;

function preload(){
  database = firebase.database();
backgroundImg = loadImage("Hot Air Ballon-01.png");
hotairballoon = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")
balloonImg1 = loadImage("Hot Air Ballon-02.png");
balloonImg2 = loadImage("Hot Air Ballon-03.png");
balloonImg3 = loadImage("Hot Air Ballon-04.png");
var ballposition = database.ref("Balloon/Position");
ballposition.on("value", readPosition, showError);
}

function setup() {
  createCanvas(1000,641);
  balloon = createSprite(400, 300, 50, 50);
  balloon.addAnimation("flying",hotairballoon);
  balloon.scale = 0.7;
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
  writePosition(-10, 0);s
  balloon.addAnimation("hotairballoon", balloonImg1);
  }

  if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
    balloon.addAnimation("hotairballoon", balloonImg2);                                                              
  }

  if(keyDown(UP_ARROW)){
    writePosition(0, -10);
    balloon.addAnimation("hotairballoon", balloonImg3); 
    balloon.scale = balloon.scale-0.02;                                                       
  }

  if(keyDown(DOWN_ARROW)){
    writePosition(0, 10);
    balloon.addAnimation("hotairballoon", balloonImg1);     
    balloon.scale = balloon.scale+0.02;                                                           
  }

  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function writePosition(x, y){
database.ref('Balloon/Position').set({
  'x': balloon.x + x,
  'y': balloon.y + y,
})
}

function showError(){
  console.log("error");
}