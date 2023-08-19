const msgInitial = document.querySelector('.msg-initial');
const containerMsgGameOver = document.querySelector('.container-msg-game-over');
const btnRestart = document.querySelector('.btn');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const msgScore = document.querySelector('.msg-score');
const audioGameOver = document.querySelector('#audio-game-over');
const audioInitial = document.querySelector('#audio-initial');

let startGame = true;
let countScore = 0;
let audioAtual = audioInitial;

const playSound = (audio) => {
    if (audio != null && audio.localName === 'audio') {
        if (audioAtual != null) {
            audioAtual.pause();
        }
        audio.play();
        audioAtual = audio;
    } else {
        console.log('Audio não encontrado ou inválido');
    }
}

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        playSound(audioGameOver);
        clearInterval(score);

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = "./images/game-over.png";
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        containerMsgGameOver.style.display = 'block';
        clearInterval(loop);
    }
}, 10)

const score = setInterval(() => {
    if (startGame === false) {
        countScore++;
        msgScore.innerHTML = `Score: ${countScore}`
    }
}, 1000)

btnRestart.addEventListener('click', () => {
    window.location.reload();
});

document.addEventListener('keydown', () => {

    if (startGame) {
        msgInitial.style.display = 'none';
        msgScore.style.display = 'block';
        pipe.classList.add('move');
        startGame = false;
        audioAtual.pause();
    }

    jump();
});