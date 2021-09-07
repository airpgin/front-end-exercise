const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = ['bubble.mp3', 'old_boy.mp3', 'rain_flower_stone.mp3', 'wait_one_minute.mp3']

let songIndex = 3

function firstUpper (str) {
  let strArr = str.split('')
  strArr[0] = strArr[0].toUpperCase()
  return strArr.join('')
}


function loadSong (song) {
  title.innerHTML = song.split('.')[0].split('_').map(item => firstUpper(item)).join(' ')
  audio.src = 'audio/' + song
  cover.src = 'images/' + song.split('.')[0] + '.jpg'
}

function pauseSong () {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  audio.pause()
}

function playSong () {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

function prevSong () {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

function setProgress (e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

function nextSong () {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

function updateProgress (e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
  progressContainer.addEventListener('click', setProgress)
}

loadSong(songs[songIndex])

audio.addEventListener('timeupdate', updateProgress)

audio.addEventListener('ended', nextSong)