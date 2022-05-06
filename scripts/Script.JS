function ready() {
const layout = document.querySelector(".layout"),
musicName = layout.querySelector(".CurrentTrackName"),
musicImg = layout.querySelector(".DefaultCurrentTrackImg"),
currentAudio = layout.querySelector(".currentAudio"),
musicPlayPause = layout.querySelector(".StartOrPause");
//musicDuration = layout.querySelector(".")

let musicIndex = 0;

window.addEventListener("load", ()=> {
    loadMusic(musicIndex);
})

function loadMusic(indexNumber) {
    musicName.innerText = AllMusic[indexNumber].name;
    musicImg.src = AllMusic[indexNumber].image;
    currentAudio.src = AllMusic[indexNumber].path;
}

function playMusic() {
    layout.classList.add("paused");
    //musicPlayPause.querySelector("i").innerText = "pause";
    currentAudio.play();
}

function pauseMusic() {
    layout.classList.remove("paused");
    //musicPlayPause.querySelector("i").innerText = "play";
    currentAudio.pause();
}

musicPlayPause.addEventListener("click", ()=> {
    const isMusicPaused = layout.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
})
}
document.addEventListener("DOMContentLoaded", ready);