document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

var player, playbutton, timestamp, b, playerContainer;
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
 bgArt = document.getElementById("page");

 timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);

 playerContainer = document.getElementById("player");

 player.onloadedmetadata = function() {
    refreshTimestamp();
}

player.ontimeupdate = function() {
    refreshTimestamp();
}
}

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
  playerContainer.classList.remove("fade-out");
  playerContainer.classList.add("fade-in");
}

function handlePlayButton() {
  if (player.paused) {
    playAudio();
  } else {
    //b.style.background = "black";
    playerContainer.classList.remove("fade-in");
    playerContainer.classList.add("fade-out");
    player.pause();
    shouldUpdate = false;
    playButton.setAttribute("src", "play.png");
    playButton.classList.remove("playing");
  }
}

function refreshTimestamp() {
    timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);
}

function change_vol()
{
 player.volume=document.getElementById("change_vol").value;
}