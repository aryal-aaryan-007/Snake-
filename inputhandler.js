/*
addEventListener("keydown", function (e) {
    if (e.code == 'KeyD') vxr = 5;
    if (e.code == 'KeyA') vxl = -5;
    if (e.code == 'KeyW') vy = -5;
    if (e.code == 'KeyS') vy = 5;

})
addEventListener("keyup", function (e) {//kati khera key bat hat uthish note garxa
x
})
*/
//score
let score = 0;

//snake image

//board
var blocksize = 25;//euta box ko size k tyo dekhya xas ni 25*25 ko board vanera tei ho
var rows = 20;
var cols = 20;
var board;
var context;

var gameover = false;

//speed of snake
let velocityX = 0;
let velocityY = 0;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

let snakebody = []

//food
let foodX;
let foodY;




window.onload = function () {
    board = document.getElementById('canvas');
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 1000 / 10);//every 100 milllisecond
}
function update() {
    if (gameover) {
        return;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize)

    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize)

    if (snakeX == foodX && snakeY == foodY) {
        snakebody.push([foodX, foodY])
        placefood();
        increment()
    }

    for (let j = snakebody.length - 1; j > 0; j--) {//yo line le k garxa bujya xainas,yo video kko 25 min m hernu bujna
        snakebody[j] = snakebody[j - 1];
    }

    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize)
    }
    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY];
    }
    //game over condition
    if (snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize) {
        gameover = true;
        alert('Game Over');
        //highest score
        if (localStorage.getItem('highscore') < score) {
            localStorage.setItem('highscore', score);
        }
    }
    //game over condition
    /*
        for (let k = 0; k < snakebody.length; k++) {
            if (snakeX === snakebody[k][0] && snakeY === snakebody[k][1]) {
                gameover = true;
                alert('You fucked up mate')
            }
        }
    */

}

//score

function increment() {
    score += 1;
    document.getElementById('score').innerText = score;

}
function placefood() {
    //*blocksize le size determine garxa khana kko
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;

}
function changeDirection(e) {
    if (e.code == 'KeyW' && velocityY != 1) { velocityX = 0; velocityY = -1; }
    if (e.code == 'KeyS' && velocityY != -1) { velocityX = 0; velocityY = 1; }
    if (e.code == 'KeyD' && velocityX != -1) { velocityX = 1; velocityY = 0; }
    if (e.code == 'KeyA' && velocityX != 1) { velocityX = -1; velocityY = 0; }

    if (e.code == 'ArrowUp' && velocityY != 1) { velocityX = 0; velocityY = -1; }
    if (e.code == 'ArrowDown' && velocityY != -1) { velocityX = 0; velocityY = 1; }
    if (e.code == 'ArrowRight' && velocityX != -1) { velocityX = 1; velocityY = 0; }
    if (e.code == 'ArrowLeft' && velocityY != 1) { velocityX = -1; velocityY = 0; }
}
function replay() {
    location.reload();
}
//highscore count
function count() {
    if (localStorage.getItem('highscore') != null) {
        alert('highscore is: ' + localStorage.getItem('highscore'))
    }
    else {
        alert('highscore is: 0')
    }
}
