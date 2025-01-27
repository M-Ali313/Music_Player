const menuBtn = document.querySelector('.menu-btn'),
    container = document.querySelector('.container');

const progressBar = document.querySelector(".bar"),
    progressDot = document.querySelector(".dot"),
    currentTimeEl = document.querySelector(".current-time"),
    DurationEl = document.querySelector(".duration")



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

        // lets play song when clicked on playlist songs
        tr.addEventListener("click", (e)=>{

            if(e.target.classList.contains('fa-heart')){
                addToFavorite(index)
                e.target.classList.toggle("active")
                // if heart clicked just add to favorite don't paly 
                return
            }
            currentSong = index
            loadSong(currentSong)
            audio.play()
            container.classList.remove("active")
            playPauseBtn.classList.replace('fa-play' , 'fa-pause')
            playing = true
        })


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
// shuffle when playing next songs
    if(shuffle){
        shufflefunc()
        loadSong(currentSong)
       
     }

    // if current song is not last playing 
    else if(currentSong < songs.length -1){
        // load the next song
        currentSong++
    }else{
        // else if its last song then play first
        currentSong =0
    }
    loadSong(currentSong)

    // we need to play if playing true so instated of return make next if to else if
    if(playing){
        audio.play()
    }
}

nextBtn.addEventListener('click', nextSong)


function prevSong() { 
    
    if(shuffle){
        // some on prev songs
        shufflefunc()
        loadSong(currentSong)
         
        //return  because we want to play next song now
    }
    
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


function addToFavorite(index){
    // check if already in favorite then remove
    if(favourite.includes(index)){
        favourite = favourite.filter((item) => item !== index)

        // fi current playing song is remove also remove currentFavorite
        currentFavourite.classList.remove("active")
    }else{
        // if not already in favorite add it 
        favourite.push(index)

        // if coming from current favorite that is index and current are equals 
        if(index === currentSong){
            currentFavourite.classList.add('active')
        }

    }
    // after adding favorite rerender playing to show favorites 
    updatePlaylist(songs)

}
// also add to favorite current playing song when clicked heart 
currentFavourite.addEventListener("click", ()=>{
    addToFavorite(currentSong)
    currentFavourite.classList.toggle("active")
})


// lets add shuffle functionality 

const shuffleBtn = document.querySelector("#shuffle")

function shuffleSongs(){
    // if shuffle false make ti true or vice versa
    shuffle != shuffle
    shuffleBtn.classList.toggle("active")

}

shuffleBtn.addEventListener("click", shuffleSongs)

// if shuffle true shuffle songs from playlist
function shufflefunc(){
    if(shuffle){
        // select a random song from playlist
        currentSong = Math.floor(Math.round()*songs.length)

    } // if shuffle false do nothing 


} 


const repeatBtn = document.querySelector("#repeat")

function repeatSong(){
    if(repeat === 0){
        // if repeat si off make it 1 that means repeat current song repeat = 1 
        repeatBtn.classList.add("active")

    }else if( repeat=== 1){
        // if repeat is 1 that is only repeat current song make it 2 that means repeat playlist repeat =2 
        repeat = 2
    }else{
        // else turn off repeat
        repeat = 0
        repeatBtn.classList.remove("active")
    }
}

repeatBtn.addEventListener("click", repeatSong)

// on one click its repeat === 1 on second repeat ===2 on third repeat === 0 and revise

// now if repeat on an audio end 
audio.addEventListener("ended", ()=>{
    if(repeat === 1){

        // if repeat current song 
        // again load current song
        loadSong(currentSong)
        audio.play()

    }else if(repeat === 2){
        // if repeat playlist 
        // play next song
        nextSong()
        audio.play()

    }else{
        // if repeat off
        // just play all playlist one item then stop
        if(currentSong === songs.length -1){
            // if its last song in playlist stop playing now
            audio.pause()
            playPauseBtn.classList.replace("fa-pause", "fa-play")
            playing = false
        }else{
            // if not last continue to next
            nextSong()
            audio.play()
        }
    }
    
})

function progress(){
    // get duration and current time from audio
    let { duration , currentTime} = audio
    // if anyone not a number make it 0

    isNaN(duration)?(duration = 0):duration
    isNaN(currentTime)?(currentTime = 0) : currentTime

    // update time elements 

    currentTimeEl.innerHTML = formatTime(currentTime)
    DurationEl.innerHTML = formatTime(duration)

    // lets move the progress dot 
    let progressPercentage = (currentTime / duration) *100
    progressDot.style.left = `${progressPercentage}%`
}

audio.addEventListener("timeupdate", progress)

// change progress when clicked on bar 

function setProgress(e){
    let width = this.clientWidth
    let clickX = e.offsetX
    let duration  = audio.duration
    audio.currentTime = (clickX / width) * duration
}

progressBar.addEventListener("click", setProgress)