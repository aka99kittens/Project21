var PLAY = 1;
var END = 0;
var gameState = PLAY;


var character_running, running_dude;

var  ground, backgroundImg, invisibleGround;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var gameOver, gameOverImg;

var score;


function preload(){
 character_running = loadImage("dude.png");
backgroundImg = loadImage("desert_BG.png");

obstacle1 = loadImage("rock1.png");
obstacle2 = loadImage("rock2.png");
obstacle3 = loadImage("rock3.png");
obstacle4 = loadImage("rock4.png");
obstacle5 = loadImage("rock5.png");

gameOverImg = loadImage("gameover.jpg");
}

function setup() {
 createCanvas(400, 350);

 running_dude = createSprite(100,195,20,50);
 running_dude.addAnimation("dude",character_running);
 running_dude.scale = 0.5;

 ground = createSprite(200,180,400,20);
 ground.addImage("ground", backgroundImg);
 ground.x = ground.width/2;

 gameOver = createSprite(200,150);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.01;

 invisibleGround = createSprite(200,400,400,10);
 invisibleGround.visible = false;

  //create Obstacle Group
 obstaclesGroup = createGroup();

 score = 0;

 running_dude.setCollider("rectangle", 0,0,running_dude.width, running_dude.height);
 running_dude.debug = true
}

function draw() {
 background (180);
   //displaying score
   text("Score: "+ score, 500,50);

   running_dude.velocityX = 0
  running_dude.depth = obstaclesGroup.depth;

   if(gameState === PLAY){
    gameOver.visible = false
   //move the ground
   ground.velocityX = -4;
   //scoring
   score = score + Math.round(frameCount/60);
   
   if (ground.x < 0){
     ground.x = ground.width/2;
   }
   
   //jump when the space key is pressed
   if(keyDown("space")&& running_dude.y >= 100) {
       running_dude.velocityY = -13;
   }
   
   //add gravity
   running_dude.velocityY = running_dude.velocityY + 0.8
 
 
   //spawn obstacles on the ground
   spawnObstacles();
   
   if(obstaclesGroup.isTouching(running_dude)){
       gameState = END;
   }
 }

 //prevent running dude from falling out of the canvas
 running_dude.collide(invisibleGround);
 drawSprites();
}

 function spawnObstacles(){
    if (frameCount % 100 === 0){
      var obstacle = createSprite(400,300,10,40);
      obstacle.velocityX = -4;
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         case 4: obstacle.addImage(obstacle4);
                 break;
         case 5: obstacle.addImage(obstacle5);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }