var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ghostsound;


function preload(){

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostsound = loadSound("spooky.wav");
  
}


function setup(){
  
  createCanvas(600,600);
  
tower = createSprite(300,300);
tower.addImage("tower",towerImg);
tower.velocityY = 1;
  
 ghostsound.loop();
  
  ghost = createSprite(200,200,50,50);
ghost.scale = 0.3;
ghost.addImage("ghost", ghostImg);
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
  
  background("black");
  
  if(gameState == PLAY){
    
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  } 
if(keyDown("right_arrow")){
  ghost.x = ghost.x + 3; 
} 
  
 if(keyDown("space")){
   ghost.velocityY = -10; 
 }
  
ghost.velocityY = ghost.velocityY + 0.8;
                  
  
  if(climbersGroup.isTouching(ghost)){ 
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){  
    ghost.destroy();
    gameState = END;
}
  
  spawnDoors();
    

  
  
}
  
  drawSprites();

if(gameState === END){
 stroke("yellow");
  fill("yellow");
  textSize(30);
  text("GAME OVER",230,250);
  }
}

function spawnDoors() {
  
if (frameCount % 240 === 0) {
door = createSprite(200, -50);
door.x = Math.round(random(120,400));
door.addImage(doorImg);
door.velocityY = 1;
door.lifetime = 800;
doorsGroup.add(door); 
climber = createSprite(200,10);
climber.x = door.x;
climber.addImage(climberImg);
climber.velocityY = 1;
climber.lifetime = 800;
climbersGroup.add(climber); 
  
invisibleBlock = createSprite(240,10,10,100);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.x = door.x; 
invisibleBlock.velocityY = 1;
invisibleBlock.lifetime = 800;
invisibleBlockGroup.add(invisibleBlock);
invisibleBlock.visible = false;

  
ghost.depth = door.depth;
  ghost.depth +=1;
}
}











