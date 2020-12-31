document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

var player, playbutton, timestamp, b, playerContainer, trackList;
var tracks = [];
var shouldUpdate = false;
var doc, songs;
var playingID = 4;

function init() {
  b = document.getElementsByTagName('body')[0];
}

function toggle_track(id) {
  playingID = id;
  if (bgArt.getElementsByClassName('track_title')[0].innerHTML != songs[id].getElementsByClassName('library_track_title')[0].innerHTML) {
    bgArt.getElementsByClassName('track_title')[0].innerHTML = songs[id].getElementsByClassName('library_track_title')[0].innerHTML;
    bgArt.getElementsByClassName('track_artist')[0].innerHTML = songs[id].getElementsByClassName('library_track_artist')[0].innerHTML;
    bgArt.getElementsByClassName('album_title')[0].innerHTML = songs[id].getElementsByClassName('library_album_title')[0].innerHTML;
    player.getElementsByClassName('music_src')[0].setAttribute('src', songs[id].getElementsByClassName('library_track_src')[0].getAttribute('href'));
    timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);
    document.getElementById('album_art').setAttribute('src', songs[id].getElementsByClassName('library_art')[0].getAttribute('src'));
    player.load();
    refreshTimestamp();
    document.getElementById('player_container').style.backgroudImage = songs[id].getElementsByClassName('library_art')[0].getAttribute('src');

    player.onloadedmetadata = function() {
       refreshTimestamp();
   }

   player.ontimeupdate = function() {
       refreshTimestamp();
   }
  }
}

function startplayer()
{
  fetch('/magna_opera.html').then(function (response) {
    return response.text();
  }).then(function (html) {
    var parser = new DOMParser();
  	document.getElementById("track_list").innerHTML = html;
    doc = parser.parseFromString(html, 'text/html');
    songs = doc.getElementsByClassName('library_track');
  }).catch(function (err) {
  	// There was an error
  	console.warn('Something went wrong.', err);
  });

 wrapper = document.getElementById('wrapper');
 player = document.getElementById('music_player');
 playButton = document.getElementById("play_button");
 player.controls = false;
 playButton.addEventListener("click", handlePlayButton, false);
 timestamp = document.getElementById("timestamp");
 bgArt = document.getElementById("player");

 trackList = document.getElementsByClassName("track_list");

 timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);

 playerContainer = document.getElementById("player");

 player.onloadedmetadata = function() {
    refreshTimestamp();
}

player.ontimeupdate = function() {
    refreshTimestamp();
}
}

// convert number of seconds to string mm:ss
function stm(input) {
    var mins = ~~((input % 3600) / 60);
    var secs = ~~input % 60;

    var res = "";
    res = "0" + mins + ":" + (secs < 10 ? "0" : "") + "" + secs + "";
    return res;
}

async function playAudio() {
  //bgArt.style.backgroudImage = 'url(agar_agar_artwork_1.jpg)';
  //console.log(bgArt.style.backgroudImage);
  //b.style.background = "black url('agar_agar_artwork_1.jpg') no-repeat right top";
  try {
    await player.play();
    songs[playingID].getElementsByClassName('library_play_button')[0].setAttribute("src", "pause.png");
    playButton.setAttribute("src", "pause.png");
    playButton.classList.add("playing");
  } catch(err) {
    playButton.classList.remove("playing");
  }
  shouldUpdate = true;
  bgArt.classList.remove("fade-out");
  bgArt.classList.add("fade-in");
}

function handlePlayButton() {
  if (player.paused) {
    playAudio();
    songs[playingID].getElementsByClassName('library_play_button')[0].setAttribute("src", "play.png");
  } else {
    //b.style.background = "black";
    bgArt.classList.remove("fade-in");
    bgArt.classList.add("fade-out");
    player.pause();
    shouldUpdate = false;
    playButton.setAttribute("src", "play.png");
    playButton.classList.remove("playing");
  }
}

function refreshTimestamp() {
    timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);

    var trackProgress = (player.currentTime / player.duration);
    var sliderProgress = document.getElementById('trackSlider').offsetWidth * trackProgress;

    document.getElementById('trackProgress').style.width = Math.round(sliderProgress) + "px";
}

function setLocation(percentage) {
  player.currentTime = player.duration * percentage;
}

function resetTrack() {
  player.currentTime = 0;
}

function setSongPosition(obj,e){
  var songSliderWidth = obj.offsetWidth;
  var evtobj=window.event? event : e;
  clickLocation = e.clientX - obj.offsetLeft;

  var percentage = (clickLocation/songSliderWidth);

  setLocation(percentage);
}

function change_vol()
{
 player.volume=document.getElementById("change_vol").value;
}

function generate_library_track(num, title, artist, album, duration, src, art_src) {
  var new_track = document.createElement('div');
  new_track.id = 'lib_track';
  // TODO: rest of this
  trackList.append(new_track);
  tracks.push(new_track);
}
