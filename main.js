const videosData = [
  {
    videoID: 'lLV8NMMzzwk'
  },
  {
    videoID: 'UhBahjhR9tw'
  },
  {
    videoID: '_m89rVfUn5s'
  },
  {
    videoID: 'ZJVsq2Vj6ao'
  },
  {
    videoID: 'yIdKbSeAueY'
  }
];
let videos = videosData.map(video => video.videoID);
let player;
let videoIndex = 0;
let id = videos[videoIndex];
let videosLenght = videos.length;
let form = document.querySelector('#form');

function onYouTubePlayerAPIReady(id, videoIndex) {
  videoIndex = 0;
  id = videos[videoIndex];
  player = new YT.Player(`player`, {
    height: '390',
    width: '640',
    videoId: id,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}
// autoplay video
function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {
  if (event.data === 0 && videoIndex < videosLenght - 1) {
    videoIndex = videoIndex + 1;
    id = videos[videoIndex];
    player.loadVideoById(id);
  }
}

form.addEventListener('change', function(event) {
  value = document.querySelector('#input').value;
  event.preventDefault();
  player.unMute();
  player.setVolume(value); // 0 - 100
});
document.querySelector('#nextVideo').addEventListener('click', function() {
  if (videoIndex < videosLenght - 1) {
    videoIndex = videoIndex + 1;
  } else {
    videoIndex = 0;
  }
  id = videos[videoIndex];
  player.loadVideoById(id);
  console.log(videoIndex);
});

document.querySelector('#previousVideo').addEventListener('click', function() {
  if (videoIndex <= 0) {
    videoIndex = videosLenght - 1;
  } else if (videoIndex <= videosLenght - 1) {
    videoIndex--;
  }
  id = videos[videoIndex];
  player.loadVideoById(id);
  console.log(videoIndex);
});
