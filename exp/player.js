document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

var player, playbutton, timestamp;
var shouldUpdate = false;

function startplayer()
{
 player = document.getElementById('music_player');
 playButton = document.getElementById("play_button");
 player.controls = false;
 playButton.addEventListener("click", handlePlayButton, false);
 timestamp = document.getElementById("timestamp");
 //timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);

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
  try {
    await player.play();
    shouldUpdate = true;
    playButton.setAttribute("src", "pause.png");
    playButton.classList.add("playing");
  } catch(err) {
    playButton.classList.remove("playing");
  }
}

function handlePlayButton() {
  if (player.paused) {
    playAudio();
  } else {
    player.pause();
    shouldUpdate = false;
    playButton.setAttribute("src", "play.png");
    playButton.classList.remove("playing");
  }
}

function refreshTimestamp() {
    timestamp.innerHTML = "" + stm(player.currentTime) + " / " + stm(player.duration);
}

//setTimeout(refreshTimestamp, 1000);

/*
function play_aud()
{
 player.play();
}
function pause_aud()
{
 player.pause();
}
function stop_aud()
{
 player.pause();
 player.currentTime = 0;
}*/
function change_vol()
{
 player.volume=document.getElementById("change_vol").value;
}