const videoContainer = document.querySelector("#wowPlayer");
import axios from "axios";

const videoConfig = () => {
  const videoPlayer = videoContainer.querySelector("video");
  const video_volume = videoContainer.querySelector(" .video-volume");
  const video_expand = videoContainer.querySelector(".video-expand");
  const video_play_pause = videoContainer.querySelector(".video-play-pause");
  const video_runtime = videoContainer.querySelector(".video-runtime");
  const volumeTrack = videoContainer.querySelector("#volume-track");

  const countView = async (e) => {
    const video_views = document.querySelector(".video-views");

    const ViewURL = window.location.href.split("/videos/");
    await fetch(`${ViewURL[0]}/api/${ViewURL[1]}/view`, { method: "POST" });
    const res = await fetch(`${ViewURL[0]}/api/${ViewURL[1]}/view`);
    const data = await res.json();

    if (video_views) {
      video_views.textContent = `${data} views`;
    }
    console.log("view", data);
  };

  countView();

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

  const volumeVideo = (e) => {
    const ico = document.createElement("i");
    ico.classList.add(`fas`);

    if (videoPlayer.muted) {
      if (videoPlayer.volume >= "0.6") {
        video_volume.firstChild.remove();
        ico.classList.add(`fa-volume-up`);
      } else if (videoPlayer.volume >= "0.3") {
        video_volume.firstChild.remove();
        ico.classList.add(`fa-volume-down`);
      } else {
        video_volume.firstChild.remove();
        ico.classList.add(`fa-volume-off`);
      }

      video_volume.appendChild(ico);

      videoPlayer.muted = false;
      volumeTrack.value = videoPlayer.volume;
    } else {
      video_volume.firstChild.remove();
      ico.classList.add(`fa-volume-mute`);
      video_volume.appendChild(ico);

      videoPlayer.muted = true;
      volumeTrack.value = 0;
    }
  };

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

  const timeHandler = (e) => {
    const totalDuration = timeFormat(videoPlayer.duration);
    let grant = -1;

    const timeChecker = () => {
      const currentRunTime = timeFormat(videoPlayer.currentTime);

      if (grant !== parseInt(videoPlayer.currentTime, 10)) {
        video_runtime.textContent = `${currentRunTime} / ${totalDuration}`;
        grant = parseInt(videoPlayer.currentTime, 10);
      }

      if (videoPlayer.ended) {
        video_play_pause.firstChild.classList.replace(
          "fa-pause-circle",
          "fa-play-circle"
        );
        return;
      }

      if (e.type === "loadedmetadata" || videoPlayer.paused) {
        return;
      }

      requestAnimationFrame(() => requestAnimationFrame(timeChecker));
    };
    timeChecker();
  };

  const volumeHandler = (e) => {
    const val = e.currentTarget.value;
    const ico = document.createElement("i");
    ico.classList.add(`fas`);
    video_volume.firstChild.remove();

    if (val === "0") {
      ico.classList.add(`fa-volume-mute`);
      video_volume.appendChild(ico);

      videoPlayer.muted = true;
    } else if (val >= "0.6") {
      ico.classList.add(`fa-volume-up`);
      video_volume.appendChild(ico);

      videoPlayer.muted = false;
    } else if (val >= "0.3") {
      ico.classList.add(`fa-volume-down`);
      video_volume.appendChild(ico);

      videoPlayer.muted = false;
    } else {
      ico.classList.add(`fa-volume-off`);
      video_volume.appendChild(ico);

      videoPlayer.muted = false;
    }

    videoPlayer.volume = val;
  };

  video_play_pause.addEventListener("click", playVideo);
  video_volume.addEventListener("click", volumeVideo);
  volumeTrack.addEventListener("input", volumeHandler);
  video_expand.addEventListener("click", scaleVideo);
  videoPlayer.addEventListener("loadedmetadata", timeHandler);
  videoPlayer.addEventListener("play", timeHandler);
  videoPlayer.volume = 0;
};

//initiate video play config
if (videoContainer) {
  videoConfig();
}
