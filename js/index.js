const cvs = document.getElementById('myCanvas');
const ctx = cvs.getContext('2d');

// create the unit
const box = 32;

// food image
const foodImage = new Image();
foodImage.src = "img/food.png";

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "sound/dead.mp3";
eat.src = "sound/eat.mp3";
up.src = "sound/up.mp3";
right.src = "sound/right.mp3";
left.src = "sound/left.mp3";
down.src = "sound/down.mp3";

// Snake
let snake = [];

snake[0] = { 
    x: 9 * box,
    y: 10 * box
};

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let score = 0;

// direction
let d;
document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 65 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 87 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 68 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 83 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}




function draw(){
    // load map image
    const ground = new Image();
    ground.src = "img/ground.png";
    ground.onload = function (e){
        
    }
    ctx.drawImage(ground, 0, 0);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = ( i == 0 ) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImage, food.x, food.y);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa One";
    ctx.fillText(score, 2*box, 1.6*box);

    // snake movement

// snake old position
let snakeX = snake[0].x;
let snakeY = snake[0].y;



// which direction
if ( d == "LEFT") snakeX -= box;
if ( d == "UP") snakeY -= box;
if ( d == "RIGHT") snakeX += box;
if ( d == "DOWN") snakeY += box;

// eating
if (snakeX == food.x && snakeY == food.y){
    score++;
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
    };
}else{
    // remove the tail
    snake.pop();
}

//  check collision function
function collision (head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
}

// add new head

let newHead = {
    x: snakeX,
    y: snakeY
}

// gameover 
if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
    clearInterval(game);
}

snake.unshift(newHead);
}

// 
let game = setInterval(draw, 200);


