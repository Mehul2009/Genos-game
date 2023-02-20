var start=1
var play=2
var end=0
var gamestate = start

var  genos,genosrun , genospunch,genosincrinate,genosjump,genosdefeat,genosstand,genosfire,genoswallpaper
var enemyGroup,dsk,gs,melzaguard,mq,vaccineman
var bg1,bg2,bg3,invisibleground
var blast1,fire
var rstart,over
var score=0



function preload(){
 genosrun=loadAnimation("genos running.png","genos running 2.png")
 genosdefeat=loadAnimation("genos defeat.png")
 genosfire=loadAnimation("genos fire1.png","genos fire 2.png","genos fire 3.png")
 genosincrinate=loadAnimation("genos incrinate 1.png","genos incrinate 2.png","genos incrinate 3.png")
 genosjump=loadAnimation("genos jump 1.png","genos jump 2.png","genos jump 3.png")
 genospunch=loadAnimation("genos punches 1.png","genos punches 2.png","genos punches 4.png")
 bg1=loadImage("bg1long.png")
 bg2=loadImage("bg2.png")

 blast1=loadAnimation("blast 1.png","blast2.png","blast 3.png","blast4.png")
dsk=loadImage("deep sea king.png")
fire=loadImage("fire.png")
gs=loadImage("gold sperm.png")
melzaguard=loadImage("melzaguard.png")
mq=loadImage("mosquito queen.png")
vaccineman=loadImage("vaccine man.png")
genos=loadAnimation("genos.png")
genoswallpaper=loadAnimation("genos wallpaper.png")
rstart=loadImage("restart.png")
over=loadImage("exterminate.png")
shoot=loadImage("fire.png")
sound=loadSound("genos_fight_theme (2).mp3")
}

function setup() {
   
   
 createCanvas(680,240)
 var message="this is a message"
 console.log(message)
  back=createSprite(340,120,340,120)
 back.addImage("bg1",bg1)
 genos1=createSprite(50,230,20,50)
 genos1.addAnimation("genos",genos)
 genos1.addAnimation("genosjump",genosjump)
 genos1.addAnimation("run",genosrun)
 genos1.addAnimation("punches",genospunch)
 genos1.addAnimation("genosfire",genosfire)
 genos1.addAnimation("incrinate",genosincrinate)
  genos1.addAnimation("genosd",genosdefeat)

 genoswp=createSprite(300,150)
 genoswp.scale=0.7
genoswp.addAnimation("genosw",genoswallpaper)
gameover=createSprite(310,100)
gameover.addImage(over)

restart=createSprite(300,150,20,20)
 restart.addImage(rstart)

invisibleground=createSprite(50,480,190,5)
invisibleground.visible=false

enemyGroup=createGroup()

genos1.setCollider("circle",0,00,35);
//  genos1.debug = true
 fireGroup= new Group();
punchGroup=new Group()
boomGroup=new Group()
}

function draw() {
    
    
    background(0)
     if(gamestate===start){
        fill("red")
        text("Genos(Demon Cyborg)is a cyborg who fights for justice,Help him to finish all the monsters and protect the city",50,20)
        text("Press SPACE to Jump",50,100)
        text("Press RIGHT and LEFT to Move",50,120)
        text("Press ENTER to Fire",50,140)
        text("Press SHIFT to Machine gun blows",50,160)
         text("Press CTRL to play sound",50,180)
        text("press S to Start",50,200)
        text("press ctrl to increnate",50,220)
       
     genos1.visible=false
     genoswp.visible=true
     back.visible=false
    gameover.visible=false
      restart.visible=false
        if(keyDown("s")){
            gamestate=play
        }
     }
    
    if(gamestate===play){
        genoswp.visible=false
        score=0
        genos1.visible=true        
        back.visible=true
       gameover.visible=false
       restart.visible=false
       score.visible=true
   
     if(back.x<150){
        back.x=550
     }
    
        if(keyDown("space")){
        genos1.velocityY=-12
        genos1.changeAnimation("genosjump",genosjump);
        }
       
        genos1.velocityY = genos1.velocityY + 0.8
        spawnenemy()
        if(keyDown("Right")){
           
        genos1.changeAnimation("run",genosrun)
         genos1.velocityX=1
        back.velocityX=-5
        }
        if(keyDown("left")){
            genos1.changeAnimation("run",genosrun)
            genos1.velocityX=-4
            
        }

        if(keyDown("shift")){
            genos1.changeAnimation("punches",genospunch)
            gunblows()
        }

        if(keyDown("enter")){
            genos1.changeAnimation("genosfire",genosfire)
        createArrow();
         }

        if(keyDown("Y")){
         sound.play()

        }
        if(keyDown("CTRL")){
          genos1.changeAnimation("incrinate",genosincrinate)
          incrinate()
        }

        if(boomGroup.isTouching(enemyGroup)){
          enemyGroup.destroyEach()
          score=score+1
              
        }
        
        
                   
        
           
                
                   
                
                   if(keyWentUp("enter")){
                       genos1.changeAnimation("run",genosrun)
                   }
                   
                   if(keyWentUp("space")){
                    genos1.changeAnimation("run",genosrun)
                }
                if(keyWentUp("shift")){
                  genos1.changeAnimation("run",genosrun)
              }
                
                if(enemyGroup.isTouching(genos1)){
                    gamestate=end
                }
                if(keyWentUp("CTRL")){
                  genos1.changeAnimation("run",genosrun)
                }
                
           
      }    
      if(gamestate===end){
        genos1.changeAnimation("genosd",genosdefeat)
        restart.visible=true
     gameover.visible=true
      back.velocityX=0
      score.visible=false
     if(keyDown("R")){
        gamestate=play
        genos1.changeAnimation("genos",genos)
        genos1.x=50
        genos1.velocityX=0
        enemyGroup.visible=false
     }

      }
    
     
      if (fireGroup.isTouching(enemyGroup)) {
        enemyGroup.destroyEach();
        fireGroup.destroyEach()
       score=score+1
      }  
      if (punchGroup.isTouching(enemyGroup)) {
        enemyGroup.destroyEach();
        score=score+2
       
      }  

    genos1.collide(invisibleground)
    edges= createEdgeSprites();
    genos1 .collide(edges);
 drawSprites()
 
 fill("black")
 text("Score: "+ score, 600,20,200,200);
   }

function spawnenemy(){
    if (frameCount % 200 === 0){
        var enemy=createSprite(640,150,20,50)
        enemy.velocityX = -15
        var rand = Math.round(random(1,5));
        switch(rand) {
          case 1: enemy.addImage(dsk);
                  break;
          case 2: enemy.addImage(gs);
                  break;
          case 3: enemy.addImage(mq);
                  break;
          case 4: enemy.addImage(melzaguard);
                  break;
          case 5: enemy.addImage(vaccineman);
                  break;
          
          default: break;
        }
        enemy.lifetime=300
         enemyGroup.add(enemy);
         enemy.setCollider("circle",0,00,30)
        enemy.scale=1
        //  enemy.debug=true
    }




}
function createArrow() {
  var fire= createSprite(100,100, 60, 10);
  fire.addImage(shoot);
  
  fire.y=genos1.y;
  fire.x=genos1.x
  fire.velocityX = 10;
  fire.lifetime = 100;
  fire.scale = 0.3;
  fireGroup.add(fire);}

function gunblows(){
var punch=createSprite(100,100,60,10)
punch.x=genos1.x+30
punch.y=genos1.y-30
punch.velocityX=genos1.velocityX
punch.lifetime=1
punch.visible=false
punchGroup.add(punch)



}


function incrinate(){
  var boom= createSprite(100,100, 60, 10);
  boom.addImage(shoot);
  
  boom.y=genos1.y;
  boom.x=genos1.x
  boom.velocityX = 100;
  boom.lifetime = 15;
  boom.scale = 0.3;
  boomGroup.add(boom);
}

