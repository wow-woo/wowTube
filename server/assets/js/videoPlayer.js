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

  const timeFormat = (seconds) => {
    const intSeconds = parseInt(seconds, 10);
    let hours = Math.floor(intSeconds / 3600);
    let minutes = Math.floor((intSeconds - hours * 3600) / 60);
    let restSeconds = intSeconds - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      restSeconds = `0${intSeconds}`;
    }
    return `${hours}:${minutes}:${restSeconds}`;
  };

  const timeHandler = () => {
    const totalDuration = timeFormat(videoPlayer.duration);

    let grant = -1;
    const timeChecker = () => {
      if (videoPlayer.ended || videoPlayer.paused) {
        return;
      }

      console.log(grant === parseInt(videoPlayer.currentTime, 10));
      const currentRunTime = timeFormat(videoPlayer.currentTime);

      if (grant !== parseInt(videoPlayer.currentTime, 10)) {
        video_runtime.textContent = `${currentRunTime} / ${totalDuration}`;
        grant = parseInt(videoPlayer.currentTime, 10);
      }

      requestAnimationFrame(() => requestAnimationFrame(timeChecker));
    };
    timeChecker();
  };
  videoPlayer.addEventListener("play", timeHandler);
};

//initiate video play config
if (videoContainer) {
  videoConfig();
}
