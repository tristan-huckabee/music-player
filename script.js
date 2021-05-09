const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play-pause');
const prevBtn = document.querySelector('#previous-song');
const nextBtn = document.querySelector('#next-song');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const cover = document.querySelector('#cover');
const title = document.querySelector('.song-title');
const musician = document.querySelector('.artist');
const aside = document.querySelector('aside');
const runtime = document.querySelector('.timer');

//Song Titles and Artists
const songs = [
    'Black Sheep', 
    'Cabin Fever',
    'Caroling Hellwalker',
    'High Hopes',
    'iSpy',
    'Plastic Love'];
const artists = [
    'Metric',
    'Corpse Husband',
    "World's End Girlfriend",
    'Panic at the Disco',
    'Kyle (feat. Lil Yachty)',
    'Mariya Takeuchi']
//Track songs
let songIndex = 4;
//Init Song Load
loadSong(songs[songIndex], artists[songIndex]);
function loadSong(song, artist) {
    title.innerText = song;
    musician.innerText = artist;
    
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.png`;
}
//Functions
function playSong() {
    aside.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    
    audio.play();
}
function pauseSong() {
    aside.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    
    audio.pause();
}
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex], artists[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex], artists[songIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    const currentMin = Math.floor(currentTime / 60);
    const currentSec = Math.floor(currentTime % 60);
    const totalMin = Math.floor(duration / 60);
    const totalSec = Math.floor(duration % 60);
    
    progress.style.width = `${progressPercent}%`;
    runtime.innerText = `${currentMin}:${currentSec} / ${totalMin}:${totalSec}`;
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}
//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = aside.classList.contains('play');
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
