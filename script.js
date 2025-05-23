
const jsonConfig = {
    "gameTitle": "Spot the Difference",
    "images": {
        "image1": "Images/Spot-the-Difference-1.jpg",
        "image2": "Images/Spot-the-Difference-2.jpg"
    },
    "differences": [
        { "x": 124, "y": 235, "width": 50, "height": 50 },
        { "x": 280, "y": 120, "width": 60, "height": 40 },
        { "x": 30, "y": 325, "width": 30, "height": 100 },
        { "x": 70, "y": 110, "width": 50, "height": 50 },
        { "x": 0, "y": 110, "width": 50, "height": 50 },
    ]
};

const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
document.getElementById('score').innerText = jsonConfig.differences.length;
var audio = document.createElement('audio');

let popup = document.getElementById('popup');
let msg = document.getElementById('msg');
let msgContainer = document.querySelector('.msg-container');
let newBtn = document.getElementById('new-btn');

let score = 0;
let found = [];
let startTime = Date.now();

document.getElementById('game-title').innerText = jsonConfig.gameTitle;
document.getElementById('img1').src = jsonConfig.images.image1;
document.getElementById('img2').src = jsonConfig.images.image2;


function checkError(e, wrapper) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let correctClick = false;

    jsonConfig.differences.forEach((diff, index) => {
        if (found.includes(index)) return;
        if (
            x >= diff.x &&
            x <= diff.x + diff.width &&
            y >= diff.y &&
            y <= diff.y + diff.height
        ) {
            found.push(index);
            score++;
            document.getElementById('score').innerText = jsonConfig.differences.length - score;
            showDifferences(container1, diff);
            showDifferences(container2, diff);
            correctClick = true;
            playAudio2();

            if (score === jsonConfig.differences.length) {
                playAudio3();
                showWinner();
            }
        }
    });

    if (!correctClick) {
        playAudio();
        alert("Chosen Difference is wrong!");
    }
}

function showDifferences(wrapper, diff) {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${diff.x}px`;
    marker.style.top = `${diff.y}px`;
    marker.style.width = `${diff.width}px`;
    marker.style.height = `${diff.height}px`;
    wrapper.appendChild(marker);
}


function showWinner() {

    audio.pause();
    audio.currentTime = 0;

    audio1.pause();
    audio1.currentTime = 0;

    audio2.pause();
    audio2.currentTime = 0;

    finalAudio.pause();
    finalAudio.currentTime = 0;

    audio.src = 'Images/FinalBgm.wav';
    audio.loop = true;
    audio.play();

    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    msg.innerText = `Congratulations! You found all the differences in ${minutes}m ${seconds}s`;
    msgContainer.classList.remove("hide");

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function resetGame() {
    score = 0;
    found = [];
    startTime = Date.now();

    document.getElementById('timer').innerText = 0;
    document.querySelectorAll('.marker').forEach(marker => marker.remove());
    msgContainer.classList.add("hide");
    document.getElementById('img1').src = jsonConfig.images.image1;
    document.getElementById('img2').src = jsonConfig.images.image2;
    document.getElementById('score').innerText = jsonConfig.differences.length;
    audio.src = 'Images/Bgm2.wav'
    audio.play();
}

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

window.onload = function () {
    audio.src = 'Images/Bgm2.wav';
    audio.loop = true;
    document.body.appendChild(audio);

    function enableAudio() {
        audio.play().catch(error => {
            console.log('Playback failed:', error);
        });

        document.removeEventListener('click', enableAudio);
    }
    document.addEventListener('click', enableAudio);
};

var audio1 = new Audio('Images/Bgm3.wav');

function playAudio() {
    audio1.currentTime = 0;
    audio1.play();
}

var audio2 = new Audio('Images/Bgm4.wav');

function playAudio2() {
    audio2.currentTime = 0;
    audio2.play();
}

var finalAudio = new Audio('Images/Bgm2.wav');

function playAudio3() {
    finalAudio.currentTime = 0;
    finalAudio.play();
}



container1.addEventListener('click', e => checkError(e, container1));
container2.addEventListener('click', e => checkError(e, container2));

setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').innerText = `${minutes}m ${seconds}s`;
}, 1000);

newBtn.addEventListener("click", resetGame);

