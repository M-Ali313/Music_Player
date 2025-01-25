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
coverImage = document.querySelector('.cover-image')

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

    // change the cover image
    coverImage.style.backgroundImage = `url(data/${songs[num].img_src})`
}

