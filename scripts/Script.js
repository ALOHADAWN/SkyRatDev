function ready() {
const layout = document.querySelector(".layout"),
musicName = layout.querySelector(".CurrentTrackName"),
musicImg = layout.querySelector(".DefaultCurrentTrackImg"),
currentAudio = layout.querySelector(".currentAudio"),
musicPlayPause = layout.querySelector(".StartOrPause"),
prevBtn = layout.querySelector(".PrewTrack"),
nextBtn = layout.querySelector(".NextTrack"),
progressArea = layout.querySelector(".RatAreaProgressBar"),
progressBar = layout.querySelector(".RatProgressBar"),
repeatBtn = layout.querySelector(".RatRepeatButton");
let currentPlayerState = 0;/*
0 = normal
1 = repeat
2 = repeatOne
3 = shuffle
*/


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
    layout.classList.add("playing");
    //musicPlayPause.querySelector("i").innerText = "pause";
    currentAudio.play();
}

function pauseMusic() {
    layout.classList.remove("playing");
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
    const isMusicPaused = layout.classList.contains("playing");
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
/*
repeatBtn.addEventListener("click", ()=>{
    let getState = repeatBtn.getAttribute("playerState");
    //alert(getState);
    switch(getState) {
        case "normal":
            currentPlayerState = 0;
            repeatBtn.setAttribute("title", "Playlist normal queue");
            repeatBtn.setAttribute("playerState", "repeat");
            break;
        case "repeat":
            //repeatBtn.classList.hasClass()
            currentPlayerState = 1;
            repeatBtn.setAttribute("title", "Playlist looped");
            repeatBtn.setAttribute("playerState", "repeat");
            break;
        case "repeatOne":
            //repeatBtn.classList.add("shuffle");
            currentPlayerState = 2;
            repeatBtn.setAttribute("title", "Playlist looped");
            repeatBtn.setAttribute("playerState", "shuffle");
            break;
        case "shuffle":
            //repeatBtn.classList.add("repeatPlaylist");
            currentPlayerState = 3;
            repeatBtn.setAttribute("title", "Playlist shuffle");
            repeatBtn.setAttribute("playerState", "normal");
            break;       
    }
});
*/
repeatBtn.addEventListener("click", ()=>{
    PlayerState = repeatBtn.getAttribute("playerState");
    /**
     * 
     * Мы здесь работаем, переключая сейты в будущее
     * По сути переменная с номером - джля работы плеера
     * Типо 0 - завершаем
     * 1 - повторяем и т.п
     */
    switch(PlayerState) {
        default:
            //repeatBtn.setAttribute("title", "Normal playlist queue");
            repeatBtn.setAttribute("title", "Repeating playlist queue");
            repeatBtn.setAttribute("playerState", "repeat");
            currentPlayerState = 1;
        break;
        // case "":
        // break;
        case "repeat":
            //console.log("repeat");
            repeatBtn.setAttribute("title", "Song looped");
            repeatBtn.setAttribute("playerState", "repeatOne");
            currentPlayerState = 2;
        break;
        case "repeatOne":
            //console.log("repeatOne");
            repeatBtn.setAttribute("title", "Playlist shuffle queue");
            repeatBtn.setAttribute("playerState", "shuffle");
            currentPlayerState = 3;
        break;
        case "shuffle":
            //console.log("shuffle");
            repeatBtn.setAttribute("title", "Normal playlist queue");
            repeatBtn.setAttribute("playerState", "normal");
            currentPlayerState = 0;
        break;
        
    }

    console.log(PlayerState);
    console.log(currentPlayerState);
});
currentAudio.addEventListener("ended", ()=> {
    let getState = repeatBtn.getAttribute("playerState");

    switch(getState) {
        case "repeat":
            //repeatBtn.classList.hasClass()
            nextMusic();
            break;
        case "repeatOne":
            //repeatBtn.classList.add("shuffle");
            currentAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            //repeatBtn.classList.add("repeatPlaylist");
            /*
            do {
                randomIndex = Math.floor((Math.random() * AllMusic.length) + 1);
            }//while(musicIndex == randomIndex);*/
            randomIndex = Math.random() * 100;
            do {
                randomIndex = Math.random() * 100;
                //console.log(randomIndex);
            }while(randomIndex > AllMusic.length)
            musicIndex = Math.floor(randomIndex);
            loadMusic(musicIndex);
            playMusic();
            break;
        default:

            break;
            
    }
});
let RatMusicPlaylist = layout.querySelector(".MusicPlayList");
for (let i = 0; i < AllMusic.length; i++) {
    let AllSoundTracks = `<div class="RatRow">
    <div class="RatRowInfo">
        <span>${AllMusic[i].name}</span>
    </div>
    <audio class="${AllMusic[i].path}" src="${AllMusic[i].path}}"></audio>
    <span class="${AllMusic[i].path}"></span>
    </div>`;
    AllSoundTracks.insertAdjacentHTML("beforeend", AllSoundTracks);

    let TrackAudioDuration = RatMusicPlaylist.querySelector(`.${AllMusic[i].path}`)
}
}
document.addEventListener("DOMContentLoaded", ready);