document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

var player, playbutton;

function startplayer()
{
 player = document.getElementById('music_player');
 playButton = document.getElementById("play_button");
 player.controls = false;
 playButton.addEventListener("click", handlePlayButton, false);
}

async function playAudio() {
  try {
    await player.play();
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
    playButton.setAttribute("src", "play.png");
    playButton.classList.remove("playing");
  }
}
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