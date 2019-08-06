var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var colspeed = 3;


function rollGap() {
    num = Math.random() * canvas.height
    if(num > canvas.height/10 && num < canvas.height*9/10){
        return num;
    }
    else{
        return rollGap();
    }
    // return num
}

function column(){
    this.height =  rollGap();
    this.position = canvas.width;

    this.drawColumns = function(height){
        context.beginPath();
        context.rect(this.position,0,60, this.height);
        context.rect(this.position,this.height + gap ,colwidth, canvas.height );
        context.fillStyle = "blue";
        context.fill();
    }
};



var gap = 260;
var distance = 320;
var flopsize = 50;
var colwidth = 60;
var flopx = canvas.width/2 - flopsize/2;
var flopy = canvas.height/2 - flopsize/2;
var flopspeed = 1;
var bgColor = "aqua";
var flopColor = "green";
var theFirstCol = new column();
var collist = [theFirstCol];
var up = false;
var oldstamp = 0;
var newstamp = performance.now();
var score = 0;
var crossed = false;


document.addEventListener( 'keydown', (event) => {
    if(event.keyCode == 32){
        up = true;
    }
});

document.addEventListener('click', event => {
    up = true;
  });
    
function gravity(){
    newstamp = 10000 + performance.now();
    dif = (newstamp - oldstamp)/10000;
    if(flopspeed < 5 ){
        flopspeed += 5;
    }
    else{
        flopspeed += dif/10;
    }
    flopy += flopspeed
}

function flop(){
    if(up){
        flopspeed = -flopsize*0.8;
        oldstamp = 10000 + performance.now();
        up = false;
    }
}

function animation(){
    if(collist[0].position < canvas.width - distance) {
        var col = new column();
        col.position = canvas.width;
        score++;
        collist.unshift(col);
    }    
    collist.forEach(element => {
        if(element.position < -100) {
            collist. pop()
        }
        element.position -= colspeed;
        element.drawColumns();
    });

    context.font = "30px Arial";
    context.fillText("Score " + score, 10, 50); 
}

function drawFloppy() {
    context.beginPath();
    context.rect(flopx, flopy, flopsize, flopsize);
    context.fillStyle = flopColor;
    context.fill();
    context.stroke();
}

function drawBG() {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = bgColor;
    context.fill();
    context.stroke();
}

function collisiondetection() {
    for(var i = 0; i < collist.length; i++){
        
        if(flopx > collist[i].position && flopx < collist[i].position + colwidth){
            if(flopy < collist[i].height || flopy > collist[i].height + gap){
                return true;
            }
        }
    }
}

function draw() {
    drawBG();
    gravity();
    flop();
    if(collisiondetection()){
        location.reload();
    }
    drawFloppy();
    animation();
    requestAnimationFrame(draw);
}


requestAnimationFrame(draw);
