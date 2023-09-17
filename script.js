const btn_game = document.getElementById('btn_game');
btn_game.addEventListener('click', () => {
    const grid_parameters = document.querySelector('.grid_parameters')
    const abcissa = Number(document.querySelector('#abcissa').value);
    const ordinate = Number(document.querySelector('#ordinate').value);
    grid_parameters.style.display = 'none';

    let field = document.createElement('div');
    document.body.appendChild(field);
    field.classList.add('field');
    field.style.width = `${abcissa*50}px`;
    field.style.height = `${ordinate*50}px`;
    
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
            createApple();
        }

        

        snakeBody[0].classList.add('head');
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }
    }
    let interval = setInterval(move, 300);

    window.addEventListener('keydown', function (e) {
        if (e.code == 'ArrowLeft' && direction != 'right') {
            direction = 'left';
        } else if (e.code == 'ArrowUp' && direction != 'down') {
            direction = 'up';
        } else if (e.code == 'ArrowRight' && direction != 'left') {
            direction = 'right';
        } else if (e.code == 'ArrowDown' && direction != 'up') {
            direction = 'down';
        }
    })
});
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