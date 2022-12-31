console.log("welcome to spotify")

let songs = [
    { songName: "Let me love you", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "The invisible", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "This ones for you", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Aazabad Barbaad", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Tum hi ho", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Aaj din chadheya", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Ho na ho tum hi ho", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Tere naina", filePath: "song/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Makaskali - Salam-e-Ishq", filePath: "song/10.mp3", coverPath: "covers/10.jpg" },
]

let songNumber = 1;
let audioElement = new Audio(`/songs/${songNumber}.mp3`);
let input = document.querySelector(".bottom input");
let masterPlay = document.querySelector(".masterPlay");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let gif = document.querySelector(".songInfo img");
let allSongPlayButtons = Array.from(document.querySelectorAll(".songItem i"));
const fun=function(){
    if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        allSongPlayButtons.forEach((i) => {
            i.classList.add("fa-circle-play");
            i.classList.remove("fa-circle-pause");
        })
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
    document.querySelector("#songName").innerHTML = songs[songNumber - 1].songName;
}

allSongPlayButtons.forEach((item) => {
    item.addEventListener("click", (event) => {
        if(!audioElement.paused && songNumber==event.target.parentNode.previousSibling.previousSibling.id){
        fun();
        return ;}
        let x = +event.target.parentNode.previousSibling.previousSibling.id;
        songNumber = x;
        audioElement.src = `/songs/${songNumber}.mp3`;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        allSongPlayButtons.forEach((i) => {
            i.classList.add("fa-circle-play");
            i.classList.remove("fa-circle-pause");
        });
        event.target.classList.add("fa-circle-pause");
        audioElement.play();
        gif.style.opacity = 1;
        document.querySelector("#songName").innerHTML = songs[songNumber - 1].songName;
    })
})

masterPlay.addEventListener("click", fun);

next.addEventListener("click", () => {
    songNumber++;
    if (songNumber > 10)
        songNumber = 1;
    audioElement.src = `/songs/${songNumber}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add("fa-circle-pause");
    document.querySelector("#songName").innerHTML = songs[songNumber - 1].songName;
})
prev.addEventListener("click", () => {
    songNumber--;
    if (songNumber < 1)
        songNumber = 10;
    audioElement.src = `/songs/${songNumber}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add("fa-circle-pause");
    document.querySelector("#songName").innerHTML = songs[songNumber - 1].songName;
})


input.addEventListener("input", () => {
    audioElement.currentTime = input.value * audioElement.duration / 100;
})

setInterval(() => {
    if (!audioElement.paused) {
        let x = audioElement.currentTime / audioElement.duration * 100;
        input.value = x;
        let min=parseInt(audioElement.currentTime/60);
        let sec=parseInt(audioElement.currentTime%60);
        document.querySelector(".min").innerHTML=(min<10)?`0${min}`:min;
        document.querySelector(".sec").innerHTML=(sec<10)?"0"+sec:sec;
    }
}, 10);