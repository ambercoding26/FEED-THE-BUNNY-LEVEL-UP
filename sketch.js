const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope2, rope3,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button1, button2, button3, bubble;
var bunny;
var blink,eat,sad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');


  
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW=displayWidth;
    canH=displayHeight;
    createCanvas(displayWidth+80, displayHeight);
  }
  else{
   canW=windowWidth;
  canH=windowHeight;
  createCanvas(windowWidth,windowHeight);
  }
  frameRate(80);


  engine = Engine.create();
  world = engine.world;
  
  button1 = createImg('cut_btn.png');
  button1.position(100,400);
  button1.size(50,50);
  button1.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(280,300);
  button2.size(50,50);
  button2.mouseClicked(drop2);
  
  bubble = createImg('bubble.png');
  bubble.position(300,450);
  bubble.size(70,70);
  bubble.mouseClicked(airBlow);

  rope = new Rope(5,{x:100,y:400});
  rope2 = new Rope(5,{x:300,y:300});
  
  ground = new Ground(500,canH -500,200,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(420,canH-580,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}






function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

if(collide(fruit,bunny,80)==true)
{
  remove_rope();
  bubble.visible = false;
  World.remove(engine.world, fruit);
  fruit = null;
  bunny.changeAnimation('eating');
}

function airBlow(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0, y:-0.1});
  var airBlower;
}
