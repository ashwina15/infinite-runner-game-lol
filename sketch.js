var alien_Image, coin_Image, space_Image, water_Image, ufo_Image, man_Image, ground, score, gameState;
var m, a;
function preload() {
  alien_Image=loadAnimation("invader.png", "invader1.png", "invader2.png");
  coin_Image=loadImage("coin.png");
  space_Image=loadImage("spacebg.jpg");
  ufo_Image=loadImage("ufo.png");
  man_Image=loadAnimation("man.png", "man1.png", "man2.png", "man3.png");
  ground_Image=loadImage("snow.png");
  m=loadAnimation("man2.png");
  a=loadAnimation("invader.png");
}

function setup() {
  createCanvas(800, 600);

//ground=createSprite(600, 580);
//ground.addImage("snowground",space_Image)
//ground.scale=1.8
//ground.x=ground.width/2
//ground.velocityX=-3;

gameState="play"

invisibleGround=createSprite(400, 550, 800, 50);
//invisibleGround.visible=false;
invisibleGround.scale=1.8


invisibleGround.addImage("snow", ground_Image)
invisibleGround1=createSprite(400, 590, 800, 50);
invisibleGround1.visible=false;
invisibleGround.velocityX=-1;

alien=createSprite(100, 450, 20, 50);
alien.addAnimation("alien",alien_Image);
alien.scale=0.6;
alien.addAnimation("collide", a);

man=createSprite(240, 445, 20, 50);
man.addAnimation("man",man_Image);
man.scale=0.4;
man.addAnimation("collided", m);
//man.debug=true;
man.setCollider("rectangle", 100, 200, 100, 400);

coinGroup=createGroup()

ufoGroup=createGroup()

score=0;

}

function draw() {
  background(space_Image);  
  fill("white")
  text("score: "+ score, 500, 50);

  if(gameState==="play"){
    /*if(ground.x<0){
      ground.x=ground.width/2; 
      }*/
    
      if(invisibleGround.x<400){
        invisibleGround.x=invisibleGround.width/2;
        }
    
      if(keyDown("Up_Arrow")&&man.y>250){
        man.velocityY=-10;
      }
    
      if(coinGroup.isTouching(man)){
        score=score+1;
        coinGroup.destroyEach();
      }
    
      if(ufoGroup.isTouching(man)){
        gameState="end";
        //ufoGroup.lifetime=0
      }
    
      man.velocityY=man.velocityY+1;
      man.collide(invisibleGround1);
        
    
      SpawnCoins();
      SpawnUfo();
  
  }
  else if(gameState==="end"){
    //ground.velocityX=0;
    invisibleGround.velocityX=0;
    man.velocityY=0;
    ufoGroup.setVelocityXEach(0);
    ufoGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    man.changeAnimation("collided", m);
    alien.changeAnimation("collide", a);
  }
  drawSprites();
}

function SpawnCoins() {

if(frameCount%120===0){
 var coin=createSprite(400, 500, 40, 40);
 coin.velocityX=-2;
 coin.addImage("coin",coin_Image);
 coin.scale=0.01;
 coin.lifeTime=20;
 coin.y=Math.round(random(450, 500));
 coinGroup.add(coin);
 //coin.setCollider("circle", 0,0,20);
 //coin.debug=true;
}
}

function SpawnUfo() {

  if(frameCount%60===0){
    ufo=createSprite(800,300,20,50);
    ufo.addImage("ufo",ufo_Image);
    ufo.scale=0.05;
    ufo.lifeTime=200;
    ufoGroup.add(ufo);
    ufo.y=Math.round(random(100, 250));
    ufo.velocityX=-4;
    ufo.depth=man.depth;
    man.depth=man.depth+1;
    //ufo.setCollider("circle", 0,3,2);
    //ufo.debug=true;
  }
  }