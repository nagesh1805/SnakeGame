const size_=20;
const RIGHT_ = {x:size_,y:0};
const LEFT_ = {x:-size_,y:0};
const UP_ = {x:0,y:-size_};
const DOWN_ = {x:0,y:size_};
const bugs = ['🦋','🐞','🦀','🦐','🦂','🐛','🐝','🐙','🐡','🦞','🐌','🪲','🪱','🪰'];

let food_loc;
let food;
const W=800;
const H=600;
let game_over = false;
let game_start =false;
const title = "SNAKE GAME";
const score_label ="Score: ";

const speed_label ="Speed: ";
let lbtn,rbtn,ubtn,dbtn;
let S;


function setup() {
  createCanvas(W+300, H);
  S= new Snake(Math.floor(W/2),Math.floor(H/2)+10,size_);
  textSize(size_);
  food_loc = {x:random(size_,W-size_),y:random(60,H-size_)};
  food = bugs[Math.floor(Math.random() * bugs.length)];  
  lbtn=createButton('←');
  rbtn=createButton('→');
  ubtn=createButton('↑');
  dbtn=createButton('↓');
  lbtn.size(70,50);
  rbtn.size(70,50);
  ubtn.size(50,70);
  dbtn.size(50,70);
}

function draw() {
  
  background(0);
  frameRate(S.speed);
  wall_setup();
  
  lbtn.position(W+20,H/2+50);
  rbtn.position(W+200,H/2+50);
  ubtn.position(W+120,H/2-50);
  dbtn.position(W+120,H/2+130);
  lbtn.mousePressed(lbtnhandler);
  rbtn.mousePressed(rbtnhandler);
  ubtn.mousePressed(ubtnhandler);
  dbtn.mousePressed(dbtnhandler);
  
  push()
  
  textSize(30);
  if(!game_start){
    if(mouseX >W+70 && mouseX < W+180 && mouseY >H-100 && mouseY < H - 40 ){
      fill('gold')
    }
    else{
      fill('grey')
    }
    text("START",W+100,H-50);

  }
  else if(game_over){
      push()
      textSize(40);
      textFont('Times New Roman')
      fill('red');
      text("GAME OVER",W/2-130,H/2);
      pop()
      
    push()
    if(mouseX >W+40 && mouseX < W+220 && mouseY >H-100 && mouseY < H - 40 ){
        fill('gold')
    }
    else{
      fill('grey')
    }
    
    text("PLAY AGAIN",W+50,H-50);
    pop();

  }


  pop()
  
  push()
  fill('yellow');
  textSize(18);
  text(score_label,W/10,30);
  fill('green');
  text(S.score,W/5,30);
  
  fill('magenta');
  textSize(22);
  text(title,W/2-title.length/2-60,35);

  
  fill('cyan');
  textSize(18);
  text(speed_label,W-W/5,30);
  fill('orange');
  text(S.speed,W-W/10,30);
  pop()
  S.show();
  if (game_start){
      S.go();
      text(food,food_loc.x,food_loc.y);
  }

  
  if (edist(S.head,food_loc)<(size_)){
     S.body.unshift({x:S.head.x,y:S.head.y});
     S.content.unshift(food);
     food_loc = {x:random(size_,W-size_),y:random(3*size_+10,H-size_)};
     food = bugs[Math.floor(Math.random() * bugs.length)]; 
     S.score+=10
     S.speed+=1;
     
  }
  else if ((S.bit_itself()) || (S.head.x <20) || (S.head.x >W-30) || (S.head.y<70) || (S.head.y>H-10)){
    game_over = true;
    S.stop = true
  }
}

function edist(p1,p2){
  return dist(p1.x+size_/2,p1.y-size_/2,p2.x+size_/2,p2.y-size_/2);
}

function wall_setup(){
   push()
   textSize(10);

   
    for (let i=50;i<H;i=i+8){
        text('▫️',0,i);
        text('▫️',W-10,i);
   }
    for (let i=0;i<W;i=i+8){
        text('▫️',i,50);
        text('▫️',i,H);
   }
      for (let i=0;i<W;i=i+8){
        text('▫️',i,10);
   }
  
    for (let i=10;i<50;i=i+8){
        text('▫️',200,i);
   }
  
    
    for (let i=10;i<50;i=i+8){
        text('▫️',0,i);
   }
  
    for (let i=10;i<50;i=i+8){
        text('▫️',600,i);
   }
    for (let i=10;i<50;i=i+8){
        text('▫️',W-10,i);
   }
  
  for (let i=10;i<H;i=i+8){
        text('▫️',W+290,i);
   }
   for (let i=W;i<W+300;i=i+8){
        text('▫️',i,H);
   }
  
    for (let i=W;i<W+300;i=i+8){
        text('▫️',i,10);
   }
  
 
  
  pop();
}

function lbtnhandler(){
  S.direction=LEFT_;
}

function rbtnhandler(){
  S.direction=RIGHT_;
}
function ubtnhandler(){
  S.direction=UP_;
}

function dbtnhandler(){
  S.direction=DOWN_;
}

function keyPressed(){

      if (keyCode === LEFT_ARROW && S.direction !== RIGHT_) {
        S.direction=LEFT_;
      }
      else if(keyCode === RIGHT_ARROW && S.direction !== LEFT_){
        S.direction=RIGHT_;
      }
      else if(keyCode === DOWN_ARROW && S.direction !== UP_){
        S.direction=DOWN_;
      }
  
      else if(keyCode === UP_ARROW && S.direction !== DOWN_){
        S.direction=UP_;
      }
      // else if (keyCode === ENTER){
      //     game_start=true;
      // }
  
}



function mousePressed(){
     if((mouseX >W+70 && mouseX < W+180 && mouseY >H-100 && mouseY < H - 40 )&& !game_start && !game_over ){
        game_start=true;
       game_over=false;
     }
      if((mouseX >W+40 && mouseX < W+220 && mouseY >H-100 && mouseY < H - 40 ) && game_over ){
        game_over=false;
        //setup();
        S= new Snake(Math.floor(W/2),Math.floor(H/2),size_);
        game_start=false;
        food_loc = {x:random(size_,W-size_),y:random(3*size_+10,H-size_)};
        food = bugs[Math.floor(Math.random() * bugs.length)]; 
    }
}





function Snake(x,y,size){
  this.size=size;
  this.body = [{x:x-size,y:y}];
  this.head={x:x,y:y};
  this.content= ['◻️'];
  this.head={x:x,y:y};
  this.head={x:x,y:y};
  this.direction = RIGHT_
  this.score = 0;
  this.speed = 5;
  this.stop=false;

  
  this.show = function(){
    push();
    textSize(this.size);
    fill('red');
    text('🔴',this.head.x,this.head.y);
    fill('white');
    textSize(this.size);
    let i=0;
    for(let b of this.body){
      text(this.content[i],b.x,b.y);
      i++;
    }
    pop();
    
  }
  
  this.go = function(){
    if (!this.stop){
        const shead = {...this.head};
        this.head.x += this.direction.x;
        this.head.y += this.direction.y;
        this.body.unshift(shead);
        this.body.pop();
    }

  }
  
  this.bit_itself = function(){
     
    for(let b of this.body){
      if(edist(this.head,b)<size_){
        return true;
      }
    }
    return false;
  }
  

};
