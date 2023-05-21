(function () {
  let player;
  let windowWidth = $(window).width();
  const player__elem = $(".player__elem");

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
      height: '400',
      width: '670',
      videoId: 'q2a-wN6kKl4',
      events: {
        //   'onReady': onPlayerReady,
        //   'onStateChange': onPlayerStateChange
      },
      playerVars: {
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
      }
    });
  }

  if (windowWidth <= 768) {

    player__elem.css("width", "480px");
    player__elem.css("height", "350px");

  }

  if (windowWidth <= 480) {
    player__elem.css("width", "320px");
    player__elem.css("height", "200px");
  }
})()