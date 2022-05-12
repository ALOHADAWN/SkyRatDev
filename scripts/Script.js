function ready() {
const layout = document.querySelector(".layout"),
musicName = layout.querySelector(".CurrentTrackName"),
musicImg = layout.querySelector(".DefaultCurrentTrackImg"),
currentAudio = layout.querySelector(".currentAudio"),
musicPlayPause = layout.querySelector(".StartOrPause"),
prevBtn = layout.querySelector(".PrewTrack"),
nextBtn = layout.querySelector(".NextTrack"),
progressArea = layout.querySelector(".RatAreaProgressBar"),
progressBar = layout.querySelector(".RatProgressBar");


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
function nextMusic() {
    musicIndex++;
    //musicIndex > AllMusic.length ? musicIndex = 0 : musicIndex = musicIndex;
    musicIndex < AllMusic.length ? musicIndex = musicIndex : musicIndex = 0;
    loadMusic(musicIndex);
    playMusic();
}
function prevMusic() {
    musicIndex--;
    musicIndex < 0 ? musicIndex = AllMusic.length - 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    console.log(musicIndex);
}
musicPlayPause.addEventListener("click", ()=> {
    const isMusicPaused = layout.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});
nextBtn.addEventListener("click", ()=> {
    nextMusic();
});
prevBtn.addEventListener("click", ()=> {
    prevMusic();
});
currentAudio.addEventListener("timeupdate", (e)=> {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = layout.querySelector(".CurrentTrackTime"),
    musicDuration = layout.querySelector(".MaxTrackTime");

    currentAudio.addEventListener("loadeddata", ()=> {
        let audioDuration = currentAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });


    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
progressArea.addEventListener("click", (e)=> {
    let progressWidthValue = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = currentAudio.duration;

    currentAudio.currentTime = (clickedOffSetX / progressWidthValue) * songDuration;
    playMusic();
});
}
document.addEventListener("DOMContentLoaded", ready);