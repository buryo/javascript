turn = true;

fn = () => {
    alert(turn ? 'hello world' : 'take it easy');
    turn = !turn;
}

setInterval(fn, 1000);
