
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(700,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  score=0;
  
  ground=createSprite(400,350,1500,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(225);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y>161){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.9;
  
  monkey.collide(ground);
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score=score+1;
  }
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
      
  spawnFood();
  spawnObstacles();
  drawSprites();
  textFont("Comic Sans MS");
  textSize(25);
  fill("black");  
  text("Score = "+score, 500, 50)
  
  textFont("Comic Sans MS");
  textSize(25);
  fill("blue");  
  stroke("red")
  strokeWeight(15);
  text("MONKEY GO HAPPY RUN" , 180, 25)
}

function spawnFood(){
  
  if(frameCount % 150===0){
  banana=createSprite(700,300,900,10)
  banana.y=random(120,200)
  banana.velocityX=-5;
    
  banana.lifetime=300;
  monkey.depth=banana.depth+1;
    
  banana.addImage(bananaImage);
  banana.scale=0.07;
    
  foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(700,305,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.20;
    obstacle.velocityX=-4;
    
    obstacle.lifetime=300;
    monkey.depth=obstacle.depth
    
    obstaclesGroup.add(obstacle);
  }
}