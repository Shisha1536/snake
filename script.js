const btn_game = document.getElementById('btn_game');
btn_game.addEventListener('click', () => {
    const grid_parameters = document.querySelector('.grid_parameters')
    const abcissa = Number(document.querySelector('#abcissa').value);
    const ordinate = Number(document.querySelector('#ordinate').value);
    let field = document.createElement('div');
    document.body.appendChild(field);
    field.classList.add('field');
    field.style.width = `${abcissa*50}px`;
    field.style.height = `${ordinate*50}px`;
    grid_parameters.style.display = 'none';
    for (let i=0; i<abcissa*ordinate ; i++)  {
        let cell = document.createElement('div');
        field.appendChild(cell);
        cell.classList.add('cell');         
    }
});
