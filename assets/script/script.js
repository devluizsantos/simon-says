const start = document.getElementById("start");
const buttons = document.querySelectorAll(".btnColor");
const newScore = document.getElementById("newScore");
const highScore = document.getElementById("highScore");

let game = [];
let playerClick = [];
let canPlay = false;
let num = 0;
let highNum = 0;

const score = () => {
    num += 1;
    newScore.textContent = num;

    if (num > highNum) {
        highNum = num;
        highScore.textContent = num;
    }
}

const sounds = {
    red: new Audio("./assets/sounds/red.mp3"),
    green: new Audio("./assets/sounds/green.mp3"),
    blue: new Audio("./assets/sounds/blue.mp3"),
    yellow: new Audio("./assets/sounds/yellow.mp3"),
    gameover: new Audio("./assets/sounds/gameover.mp3")
};

const selectColors = () => {
    const   COLORS = ["red", "green", "blue", "yellow"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function nextRound() {
    playerClick = [];

    const newOrder = selectColors();
    game.push(newOrder);

    console.log("Nova sequência:", game);

    light();
}

start.addEventListener("click", () => {
    start.disabled = true;
    game = [];
    playerClick = [];
    canPlay = false;

    nextRound();
});

buttons.forEach(btnColor => {
    btnColor.addEventListener("click", () => {
        if (!canPlay) return;

        sounds[btnColor.id].currentTime = 0;
        sounds[btnColor.id].play();

        playerClick.push(btnColor.id);

        const currentIndex = playerClick.length - 1;

        if (playerClick[currentIndex] !== game[currentIndex]) {
            sounds.gameover.currentTime = 0;
            sounds.gameover.play();

            console.log("Errou!");

            start.disabled = false;
            game = [];
            playerClick = [];
            canPlay = false;
            num = 0
            newScore.innerHTML = num;
            document.body.classList.add("game-over");

            setTimeout(() => {
                document.body.classList.remove("game-over");
            }, 300);

            return;
        }

        if (playerClick.length === game.length) {
            console.log("Sequência correta!");
            score();

            setTimeout(() => {
                nextRound();
            }, 1000);
        }
    });
});

function light() {
    canPlay = false;

    const sequenceLength = game.length;

    game.forEach((color, index) => {
        setTimeout(() => {
            const button = document.getElementById(color);

            button.classList.add("active");

            sounds[color].currentTime = 0;
            sounds[color].play();

            setTimeout(() => {
                button.classList.remove("active");

                if (index === sequenceLength - 1) {
                    canPlay = true;
                }
            }, 500);

        }, index * 1000);
    });
}