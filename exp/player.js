const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    //reader.readAsDataURL(blob);
    //console.log(reader.readAsDataURL(blob));
    document.body.backgroundImage = "url(" + reader.readAsDataURL(blob) + ")";
  }));

document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

var player, playbutton, timestamp, b, playerContainer, trackList;
var tracks = [];
var shouldUpdate = false;
var doc, songs;
var playingID = 4;
var bgImage, bg;

function init() {
  b = document.getElementsByTagName('body')[0];
}
/*
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var random = Math.random();
        console.log(this.response, typeof this.response);
        var img = document.getElementsByClassName('player_container')[0];
        var url = window.URL || window.webkitURL;
        console.log(img);
        img.style.background = url.createObjectURL(this.response);
        console.log(img.style.background);
        console.log(url.createObjectURL(this.response));
        img.setAttribute("style: ", "background-image: url(data:image/jpeg," + url.createObjectURL(this.response) + ")"));
    }
}*/
function getImage(fetchURL, bg){
  fetch(fetchURL)
  .then(response => response.blob())
  .then(images => {
      // Then create a local URL for that image and print it
      bg.style.backgroundImage = URL.createObjectURL(images);

  })
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
    //document.body.background = "url(data:image/jpeg;base64," + getBase64Image(songs[id].getElementsByClassName('library_art')[0].getAttribute('src')).then(convertBlobToBase64) + ")";
    //document.body.setAttribute("style", "background-image: url(data:image/jpeg;" + songs[id].getElementsByClassName('library_art')[0].getAttribute('src') + ")");
    //xhr.open('GET', songs[id].getElementsByClassName('library_art')[0].getAttribute('src'));
    //console.log(songs[id].getElementsByClassName('library_art')[0].getAttribute('src'));
    //xhr.responseType = 'blob';
    //xhr.send();

    toDataURL(songs[id].getElementsByClassName('library_art')[0].getAttribute('src'))
      .then(dataUrl => {
        document.body.style.backgroundImage = "url('" + songs[id].getElementsByClassName('library_art')[0].getAttribute('src') + "')";
        document.body.style.backgroundSize = "cover";
      })
    bgArt.getElementsByTagName('a')[0].setAttribute('href', songs[id].getElementsByClassName('library_track_src')[0].getAttribute('href'));

    playAudio();
    refreshTimestamp();
    //getImage(songs[id].getElementsByClassName('library_art')[0].getAttribute('src'), document.getElementsByClassName('player_container')[0]);
    //document.getElementsByClassName('player_container')[0].style.backgroudImage = src;

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
    //playButton.add("playing");
  } catch(err) {
    //playButton.remove("playing");
  }
  shouldUpdate = true;
  document.body.classList.remove("fade-out");
  document.body.classList.add("fade-in");
}

function handlePlayButton() {
  if (player.paused) {
    playAudio();
    songs[playingID].getElementsByClassName('library_play_button')[0].setAttribute("src", "play.png");
  } else {
    //b.style.background = "black";
    document.body.classList.remove("fade-in");
    document.body.classList.add("fade-out");
    player.pause();
    shouldUpdate = false;
    playButton.setAttribute("src", "play.png");
    //playButton.classList.remove("playing");
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
