const videoContainer = document.querySelector("#wowPlayer");

const videoConfig = () => {
  const videoPlayer = videoContainer.querySelector("video");
  const video_volume = videoContainer.querySelector(" .video-volume");
  const video_expand = videoContainer.querySelector(".video-expand");
  const video_play_pause = videoContainer.querySelector(".video-play-pause");
  const video_runtime = videoContainer.querySelector(".video-runtime");
  const testC = videoContainer.querySelector(".test-click");

  const playVideo = (e) => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      video_play_pause.firstChild.classList.replace(
        "fa-play-circle",
        "fa-pause-circle"
      );
    } else {
      video_play_pause.firstChild.classList.replace(
        "fa-pause-circle",
        "fa-play-circle"
      );
      videoPlayer.pause();
    }
  };
  video_play_pause.addEventListener("click", playVideo);

  const volumeVideo = (e) => {
    if (videoPlayer.muted) {
      video_volume.firstChild.classList.replace(
        "fa-volume-up",
        "fa-volume-mute"
      );
      videoPlayer.muted = false;
    } else {
      video_volume.firstChild.classList.replace(
        "fa-volume-mute",
        "fa-volume-up"
      );
      videoPlayer.muted = true;
    }
  };
  video_volume.addEventListener("click", volumeVideo);

  const scaleVideo = async (e) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();

      video_expand.firstChild.classList.replace("fa-compress-alt", "fa-expand");
    } else {
      try {
        await videoContainer.requestFullscreen();

        video_expand.firstChild.classList.replace(
          "fa-expand",
          "fa-compress-alt"
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  video_expand.addEventListener("click", scaleVideo);

  const timer = () => {
    if (videoPlayer.ended) {
      return;
    }

    const dT = parseInt(videoPlayer.duration, 10);
    const cT = parseInt(videoPlayer.currentTime, 10);

    video_runtime.textContent = `${cT} / ${dT}`;

    requestAnimationFrame(() => requestAnimationFrame(timer));
  };
  videoPlayer.addEventListener("play", timer);

  const clickhandler = (e) => {
    videoPlayer.currentTime = 7;
  };
  testC.addEventListener("click", clickhandler);
};

if (videoContainer) {
  videoConfig();
}
