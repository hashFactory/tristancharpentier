document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

var player, playbutton, timestamp, b, playerContainer, trackList;
var tracks = [];
var shouldUpdate = false;

function init() {
  b = document.getElementsByTagName('body')[0];
}

function startplayer()
{
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