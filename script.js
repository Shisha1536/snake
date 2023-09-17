const btn_game = document.getElementById('btn_game');
let abcissa;
let ordinate;
let panelScore;
let field;
let gameOver;
let btn_newGame;
let panelRecord
btn_game.addEventListener('click', () => {
    abcissa = Number(document.querySelector('#abcissa').value);
    ordinate = Number(document.querySelector('#ordinate').value);
    if (abcissa >= 5 && abcissa <= 15 && ordinate >= 5 && ordinate <= 15) {
        game();
    } else {
        alert('В ведены некорректные значения ширены или высоты')
    }
});
function game() {
    let speed = 500;
    let score = 0;
    const record = localStorage.getItem(`recordSnake${abcissa}_${ordinate}`);
    const grid_parameters = document.querySelector('.grid_parameters')
    grid_parameters.style.display = 'none';

    panelScore = document.createElement('h2');
    document.body.appendChild(panelScore);
    panelScore.textContent = `Счет: ${score}`;
    panelScore.style.fontSize = '30px';

    field = document.createElement('div');
    document.body.appendChild(field);
    field.classList.add('field');
    field.style.width = `${abcissa*50}px`;
    field.style.height = `${ordinate*50}px`;
    
    if (record > 0) {
        panelRecord = document.createElement('h2');
        document.body.appendChild(panelRecord);
        panelRecord.textContent = `Рекорд: ${record}`;
        panelRecord.style.fontSize = '30px';
    }

    for (let i = 0; i < abcissa*ordinate ; i++)  {
        let cell = document.createElement('div');
        field.appendChild(cell);
        cell.classList.add('cell');         
    }
    
    let cell = document.getElementsByClassName('cell')
    let x = 1;
    let y = ordinate;
    for (let i = 0; i < cell.length; i++) {
        if (x > abcissa) {
            x = 1;
            y--;
        }
        cell[i].setAttribute('posX', x);
        cell[i].setAttribute('posY', y);
        x++;
    }

    let сoordinates = generateSnake(abcissa, ordinate);
    let snakeBody = [document.querySelector(`[posX = "${сoordinates[0]}"][posY = "${сoordinates[1]}"]`), 
    document.querySelector(`[posX = "${сoordinates[0]-1}"][posY = "${сoordinates[1]}"]`)];
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody')
    }
    snakeBody[0].classList.add('head')
    
    let apple;
    function createApple() {
        let appleCoordinates = generateApple(abcissa, ordinate);
        apple = document.querySelector(`[posX = "${appleCoordinates[0]}"][posY = "${appleCoordinates[1]}"]`);
        while(apple.classList.contains('snakeBody')) {
            console.log(apple.classList.contains('snakeBody'));
            let appleCoordinates = generateApple(abcissa, ordinate);
            apple = document.querySelector(`[posX = "${appleCoordinates[0]}"][posY = "${appleCoordinates[1]}"]`); 
        }
        apple.classList.add('apple');
    }
    createApple();

    let direction = 'right';
    let steps = false;
    let speedCounter = 0;
    function move() {
        let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        snakeBody[0].classList.remove('head');
        snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        snakeBody.pop();
        
        if (direction == 'right') {
            if (+snakeCoordinates[0] < abcissa) {
                snakeBody.unshift(document.querySelector(`[posX = "${Number(snakeCoordinates[0])+1}"][posY = "${snakeCoordinates[1]}"]`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = "1"][posY = "${snakeCoordinates[1]}"]`));
            }
        } else if (direction == 'left') {
            if (+snakeCoordinates[0] > 1) {
                snakeBody.unshift(document.querySelector(`[posX = "${Number(snakeCoordinates[0])-1}"][posY = "${snakeCoordinates[1]}"]`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = "${abcissa}"][posY = "${snakeCoordinates[1]}"]`));
            }
        } else if (direction == 'up') {
            if (+snakeCoordinates[1] < abcissa) {
                snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${Number(snakeCoordinates[1])+1}"]`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "1"]`));
            }
        } else if (direction == 'down') {
            if (+snakeCoordinates[1] > 1) {
                snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${Number(snakeCoordinates[1])-1}"]`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${ordinate}"]`));
            }
        }

        if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
            apple.classList.remove('apple');
            let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
            let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
            snakeBody.push(document.querySelector(`[posX = "${a}"][posY = "${b}"]`));
            score++;
            speedCounter++
            panelScore.textContent = `Счет: ${score}`;
            if (speedCounter >= 10) {
                speed = speed - 50;
            }
            createApple();
        }

        if (snakeBody[0].classList.contains('snakeBody')) {
            gameOver = document.createElement('h1');
            document.body.appendChild(gameOver);
            gameOver.textContent = 'Игра окончена!';
            gameOver.style.fontSize = '50px';
            clearInterval(interval);
            snakeBody[0].style.background = 'url(./img/Boom.jpg) center no-repeat';
            if (+record < score) {
                localStorage.setItem(`recordSnake${abcissa}_${ordinate}`, `${score}`);    
            }
            btn_newGame = document.createElement('button');
            document.body.appendChild(btn_newGame);
            btn_newGame.textContent = 'Новая игра';
            btn_newGame.addEventListener('click', () => {
                panelScore.remove();
                field.remove();
                gameOver.remove();
                btn_newGame.remove();
                if (panelRecord != undefined){
                    panelRecord.remove();
                }
                game();
            });
        }
        snakeBody[0].classList.add('head');
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }
        steps = true;
    }
    let interval = setInterval(move, speed);

    window.addEventListener('keydown', function (e) {
        if (steps ==true) {
            if (e.code == 'ArrowLeft' && direction != 'right') {
                direction = 'left';
                steps = false;
            } else if (e.code == 'ArrowUp' && direction != 'down') {
                direction = 'up';
                steps = false;
            } else if (e.code == 'ArrowRight' && direction != 'left') {
                direction = 'right';
                steps = false;
            } else if (e.code == 'ArrowDown' && direction != 'up') {
                direction = 'down';
                steps = false;
            }    
        }
    })
}
function generateSnake(abcissa, ordinate) {
    let posX = Math.round(Math.random() * (abcissa - 2) + 2);
    let posY = Math.round(Math.random() * (ordinate - 1) + 1);
    return [posX, posY]
}
function generateApple(abcissa, ordinate) {
    let posX = Math.round(Math.random() * (abcissa - 1) + 1);
    let posY = Math.round(Math.random() * (ordinate - 1) + 1);
    return [posX, posY]
}
