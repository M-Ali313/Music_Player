const menuBtn = document.querySelector('.menu-btn'),
    container = document.querySelector('.container')

menuBtn.addEventListener('click', ()=>{
    container.classList.toggle('active')
})

let playing = false,
currentSong = 0,
shuffle = false,
repeat = false,
favourite = [],
audio = new Audio();

const songs = [
    { 
    title : "song 1",
    artist : "artist song 1",
    img_src : "1.jpg",
    src:"1.mp3"
    },
    {
        title : "song 2",
        artist : "artist song 2",
        img_src : "2.jpg",
        src:"2.mp3"
        },

]
const playlistContainer = document.querySelector('#playlist'),
infoWrapper = document.querySelector(".info"),
coverImage = document.querySelector('.cover-image'),
currentSongTitle = document.querySelector('.current-song-title'),
currentFavourite = document.querySelector('#current-favourite')

function init(){
    updatePlaylist(songs)
    loadSong(currentSong)
}

init()

function updatePlaylist(songs){
    // remove any existing elemetn 

    playlistContainer.innerHTML = ''

    // use for each on songs array 

    songs.forEach((song, index)=>{
        //extract data from song

        const {title , src} = song

        // check if included in favourites array 
        const isFavourite = favourite.includes(index)

        // create a tr to wrapper song 
    const tr = document.createElement('tr')
    tr.classList.add('song')
    tr.innerHTML = `
         
        <td class="no">
            <h5>${index + 1}</h5>
        </td>
        <td class="title">
            <h6>${title}</h6>
        </td>
        <td class="length">
            <h5>2:03</h5>
        </td>
        <td>
            <i class="fas fa-heart ${isFavourite ? "active" : ""}"></i>
        </td>
       
    `
        playlistContainer.appendChild(tr)


        const audioForDuration = new Audio(`data/${src}`)
        audioForDuration.addEventListener('loadedmetadata', ()=>{
            const duration = audioForDuration.duration

            let songDuration = formatTime(duration)
            tr.querySelector('.length h5').innerHTML = songDuration
        })

    })

}

function formatTime(time){
    // format time like 2:30
    let minutes = Math.floor(time / 60)
    let secondes = Math.floor(time % 60)

    //add traling zero if secondes less then 10
    secondes = secondes < 10 ? `0${secondes}` : secondes
    return `${minutes}: ${secondes}`
}

// lets add audio play functionality 
function loadSong(num){
    // change all the title artist and times to current song
    infoWrapper.innerHTML = `
        <h2>${songs[num].title}</h2>
        <h3>${songs[num].artist}</h3>
    `
    currentSongTitle.innerHTML = songs[num].title

    // change the cover image
    coverImage.style.backgroundImage = `url(data/${songs[num].img_src})`

    // add src of current song to audio variable
    audio.src = `data/${songs[num].src}`

    // if songs is in favourite highlight 
    if(favourite.includes(num)){
        currentFavourite.classList.add('active')
    }else{
        // if not favourite  remove active 
        currentFavourite.classList.remove('active')
    }
}


// lets add play pause next pray functionality 

const playPauseBtn = document.querySelector('#playpause'),
nextBtn = document.querySelector('#next'),
prevBtn = document.querySelector('#prev')

playPauseBtn.addEventListener("click",()=>{
    if(playing){
        // pause if already playing 
        playPauseBtn.classList.replace('fa-pause', 'fa-play')
        playing = false
        audio.pause()

        
    }else{
        // if not playing play
        playPauseBtn.classList.replace('fa-play','fa-pause')
        playing = true
        audio.play()
    }
})

function nextSong(){
    // if current song is not last playing 
    if(currentSong < songs.length -1){
        // load the next song
        currentSong++
    }else{
        // else if its last song then play first
        currentSong =0
    }
    loadSong(currentSong)

    if(playing){
        audio.play()
    }
}

nextBtn.addEventListener('click', nextSong)


function prevSong() {  
    // Check if currentSong is greater than 0  
    if (currentSong > 0) {  
        currentSong--; // Move to the previous song  
    } else {  
        currentSong = songs.length - 1; // Loop to the last song  
    }  
    
    loadSong(currentSong); // Load the new song  

    // If a song is currently playing, continue playing the new song  
    if (playing) {  
        audio.play(); // Ensure audio is set up correctly  
    }  
}  

// Ensure prevBtn is correctly selected  
prevBtn.addEventListener('click', prevSong);