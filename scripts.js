const _data = {
	gameOn: false,
	timeout: undefined,
	sounds: [],

	strict: false,
	playerCanPlay: false,
	score: 0,
	gameSequence: [],
	playerSequence: []
};

const _gui = {
	counter: document.querySelector(".gui__counter"),
	switch: document.querySelector(".gui__btn-switch"),
	led: document.querySelector(".gui__led"),
	strict: document.querySelector(".gui__btn--strict"),
	start: document.querySelector(".gui__btn--start"),
	pads: document.querySelectorAll(".game__pad")
}

const _soundUrls = [
	"audio/simonSound1.mp3",
	"audio/simonSound2.mp3",
	"audio/simonSound3.mp3",
	"audio/simonSound4.mp3"
];

_soundUrls.forEach(sndPath => {
	const audio = new Audio(sndPath);
	_data.sounds.push(audio);
});

_gui.switch.addEventListener("click", () => {
    _data.gameOn = _gui.switch.classList.toggle("gui__btn-switch-on");

    _gui.counter.classList.toggle("gui__counter--on");
    _gui.counter.innerHTML = "--";

    _data.strict = false;
    _data.playerCanPlay = false;
    _data.score = 0;
    _data.gameSequence = [];
    _data.playerSequence = [];

    disablePads();

    _gui.led.classList.remove("gui__led--active");
});

_gui.strict.addEventListener("click", () => {
    if(!_data.gameOn)
        return;
    ict = _gui.led.classList.toggle("gui__led--active");
});

_gui.start.addEventListener("click", () => {
    startGame();
});

const padListener = (e) => {

}

_gui.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {
    blink("--", () => {
        newColor();
    })
}

const setScore = () => {
    const score = _data.score.toString();
    const display = "00".substring(0, 2 - score.length) + score;
    _gui.counter.innerHTML = display;
}

const newColor = () => {    
    _data.gameSequence.push(Math.floor(Math.random() * 4));
    _data.score++;

    setScore();
}

const playSequence = () => {

}

const blink = (text, callback) => {
    let counter = 0,
    on = true;

    _gui.counter.innerHTML = text;

    const interval = setInterval(() => {
        if(!_data.gameOn){
            clearInterval(interval);
            _gui.counter.classList.remove("gui__counter--on")
            return;
        }
        if(on) {
            _gui.counter.classList.remove("gui__counter--on");
        }
        else {
            _gui.counter.classList.add("gui__counter--on");

            if(++counter === 3){
                clearInterval(interval);
                callback();
            }
        }

        on = !on;
    }, 250);
}

const waitForPlayerClick = () => {

}

const resetOrPlayAgain = () => {

}

const changePadCursor = (cursorType) => {

}

const disablePads = () => {
    _gui.pads.forEach(pad => {
        pad.classList.remove("game__pad--active")
    });
    
}













/***********************
 * ******************** */
/*let order = [];
let clickedOrder = [];
let score = 0;

//0 = verd
//1= vermelho
//2= amarelo
//3 = azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aleatoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
} 

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//chca se os boões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação; ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcão para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);

}

//função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//função para próximo nivel de jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVoc^perdeu o jogo"\nClique em OK para iniciar um novo jogo!`);
    order = [];
    clickedOrder = [];

    playGame();
}

//função de inico do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

/*
green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));
*/

/*/eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();
*/
