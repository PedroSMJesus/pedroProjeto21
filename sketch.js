var PLAY = 1
var END = 0;
var gameState = PLAY;

var alien, alienImg, alien2img;
var ceu, ceuImg;
var blueBallon2, blueBallonImg;
var greenBallon2, greenBallonImg;
var arrow, arrowImg;
var bow, bowImg;
var checkPointSound;

function preload(){
    //carregar imagens
alienImg = loadImage("alien1.png");
alien2img= loadImage ("alien2.png");    
ceuImg = loadImage("Road.png");   
arrowImg=loadImage("arrow0.png");
bowImg = loadImage("bow0.png");
greenBallonImg = loadImage("green_balloon0.png");
blueBallonImg= loadImage("blue_balloon0.png");

//carregar sons
checkPointSound = loadSound ("checkpoint.mp3");
}

function setup() {
    //createCanvas(windowWidth, windowHeight);

 //tela   
    createCanvas(400,400)
//tela de fundo
ceu = createSprite (200,180,10,10);
ceu.addImage("background",ceuImg);


//personagens principal
alien = createSprite (200,190,20,50);
alien.addImage("flying",alienImg);
alien.addImage("derotado", alien2img);
alien.scale= 0.6;

//arma
bow = createSprite(200,190,20,50);
bow.addImage("gun",bowImg);
bow.scale = 0.5;

 
//grupos
blueB = new Group();

arrowGroup= new Group();
//pontos
score = 0;
}

function draw() {
    background("white");

    
 //pontuação
 textSize(15)
 stroke("gray")
 text("Pontuação:"+score,320,180);
 if (gameState === PLAY) {
    
    //dela infinita
    if (ceu.x>0) {
     ceu.x = ceu.width/2;   
     }
     
     ceu.velocityX = -(3 + 4* score/100);

 //movimento
 alien.x = World.mouseX;
 alien.y = World.mouseY;
 bow.x = World.mouseX;
 bow.y = World.mouseY;

   // soltar arco quando a tecla espaço for pressionada
   if (keyDown("space")) {
    createArrow();
  }
 
  //pontos
  score= score + Math.round(getFrameRate()/60);
  if (score>0 && score%100 === 0) {
    checkPointSound.play()
  }

  

  //criação de objetos
  blueBalloon();

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
  }
 }
if (blueB.isTouching(alien)) {
    gameState = END;
}
 if (gameState === END) {
    blueB.setVelocityXEach(0);
    blueB.setLifetimeEach(-1);
    ceu.velocityX = 0;

    alien.changeAnimation("derotado", alien2img);
    bow.visible = false;
    if (keyDown("up")) {
        reset();
    }
 } 
 
 edges = createEdgeSprites();

 //pontuação
 textSize(15)
stroke("gray")
text("Pontuação:"+score,340,50);

 drawSprites();
}

function createArrow() {
    var arrow= createSprite(100, 100, 60, 10);
    arrow.addImage(arrowImg);
    arrow.x=bow.x;
    arrow.y=bow.y;
    arrow.velocityX = -4;
    arrow.lifetime = 100;
    arrow.scale = 0.2;
    arrowGroup.add(arrow);
  }
  function blueBalloon() {
    if (frameCount % 60 === 0) {
    var blueBallon2 = createSprite(0,Math.round(random(20, 370)), 10, 10);
    blueBallon2.addImage(blueBallonImg);
    blueBallon2.velocityX = 3;
    blueBallon2.lifetime = 500;
    blueBallon2.scale = 0.1;
    //Adicione o grupo
    blueB.add(blueBallon2);
    }
  }
  
 function reset() {
    gameState = PLAY

    blueB.destroyEach();

    alien.changeAnimation("flying",alienImg);
    bow.visible = true;
    score = 0;
 }
  
 