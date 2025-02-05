const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const renderSongs = (array) => {
  const songHTML = array
    .map((song) => {
      return `<li id="song-${song.id}" class="playlist-song">
    <button class="playlist-song-info" onclick= onclick="playSong(${song.id})">
      <span class="playlist-song-title">${song.title}</span>
      <span class="playlist-song-artist">${song.artist}</span>
      <span class="playlist-song-duration">${song.duration}</span>
    </button>
    <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      </button>
    `;
    })
    .join("");

  playlistSongs.innerHTML = songHTML;
};

const sortSongs = () => {
  //sort songs base on title
  //sort() methd expect a number to be returned
  //so if returned numbe is negative the first param is returned
  //otherwise the second one is returned
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return userData?.songs;
};
//const zipCode = user.address?.zipCode;
//NOTE: ?. is an optional chaining which
// returns undefined instead of throwing an error
//if the key doesn't exist/is not present in the object

renderSongs(sortSongs());

//create a play function to play a song
//find song by id using find() on userData
//it return the first matched song and assign it to variable
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  console.log(song);
  //set audio.src to song.src :this tells audio where to find the
  //audio data
  audio.src = song.src;
  //diplay the title of audio when playing
  audio.title = song.title;

  //before audio starts playing. make sure
  //it start form the beginning or check if
  //there is not nother audio playing on
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    //resume the current song at point where it was paused
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;

  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

playButton.addEventListener("click", () => {
  //start playing from the first  song
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    //or continue playing the existing/currently playing song
    playSong(userData?.currentSong.id);
  }
});

const pauseSong = () => {
  // to pause a song, set array songcurrent time to audio current time
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");

  //call pause() methd on audio
  audio.pause();
};

pauseButton.addEventListener("click", pauseSong);

//get the index of current song so you can track
//and play the next song
//use .indexOf(id) methd which return index or -1 if not present
const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
};

const playNextSong = () => {
  //check if no song is playing the play the first song in the list
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    //if not get the  index of the one that is playing
    //and add 1 to it. this will go to next song

    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};
nextButton.addEventListener("click", playNextSong);

//to play previous song,
//check if there's no song playing. the exit by return return keyword
const playPreivousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    //if not get the index of the currently playing song
    //and subtract 1 from the index
    //assign the result to a const var whose id we'll pass into
    //playsong funct as param
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};
previousButton.addEventListener("click", playPreivousSong);

//highlight the currently palying song
//access  all the songs  in playlist
//get the id of currently playing song among all the songs in playlist
//sue .removeAttribute('aria-current') mthd on all the playlist songs
//then  check if the id os currently playing song exist\
// use .setAttribute('aria-current', 'true') to the playing song id

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

//function  to display currently
//playing  song's name and title  on the screen
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  const playerDisplSongArt = document.querySelector(
    ".player-display-song-artist"
  );

  console.log(playerDisplSongArt);
  console.log(playingSong);
  console.log(songArtist);
  console.log("tit", currentTitle);
  console.log("ar", currentArtist);

  playingSong.textContent = currentTitle ? currentTitle : "";

  songArtist.textContent = currentArtist ? currentArtist : "";
};

// set aria-label attribute to the current song,
//or to the first song in the playlist.And if the
//playlist is empty, it sets the aria - label to "Play".

const setPlayButtonAccessibleText = () => {
  //get the current playing song or the first song from userData
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

// to shuffle a song or pick up random song,
//we need to call sort()on song array and
//pass Math.random() - 0.5 wich return both
// negative and positive number leading to random number

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  //set currentSong to its init value which is null
  userData.currentSong = null;
  //set songCurrentTime to its initial value which is 0;
  userData.songCurrentTime = 0;
  // need to rerender the songs
  renderSongs(userData?.songs);
  // call pause function to pause the currently playing song
  pauseSong();
  //call display song title and artist function
  setPlayerDisplay();
  //call play button accessible text funct
  setPlayButtonAccessibleText();
};

shuffleButton.addEventListener("click", shuffle);
