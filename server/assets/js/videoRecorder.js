const recorderContainer = document.querySelector("#recorderContainer");

const recordConfig = () => {
  let videoRecorder = {};
  let stream = {};
  let videoScreen = document.createElement("video");

  const video_preview = document.querySelector("#video_preview");
  const btn_record = document.querySelector("#btn_record");
  const btn_pause_resume = document.querySelector("#btn_pause_resume ");

  const getBlob = (event) => {
    const a_link = document.createElement("a");

    a_link.href = URL.createObjectURL(event.data);
    a_link.download = "recorded.webm";
    a_link.click();

    videoRecorder.removeEventListener("dataavailable", getBlob);
  };

  const pauseResume = () => {
    if (videoRecorder.state === "recording") {
      btn_pause_resume.textContent = "Pause";

      videoScreen.pause();
      videoRecorder.pause();
    } else if (videoRecorder.state === "paused") {
      btn_pause_resume.textContent = "Resume";

      videoScreen.play();
      videoRecorder.resume();
    } else {
      return;
    }
  };

  const stopRecorder = () => {
    videoRecorder.stop();
    videoScreen.remove();

    btn_record.textContent = "Complete";
    btn_pause_resume.style = "display:none";

    btn_record.removeEventListener("click", stopRecorder);

    btn_record.addEventListener("click", setRecorder);
  };

  const setPreview = (e) => {
    videoScreen.srcObject = stream;
    videoScreen.muted = true;
    videoScreen.autoplay = true;
    video_preview.appendChild(videoScreen);
  };

  const setRecorder = () => {
    setPreview();

    videoRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    videoRecorder.start();

    btn_record.textContent = "Recording...";
    btn_pause_resume.style = "display:block";

    btn_record.removeEventListener("click", setRecorder);

    videoRecorder.addEventListener("dataavailable", getBlob);
    btn_pause_resume.addEventListener("click", pauseResume);
    btn_record.addEventListener("click", stopRecorder);
  };

  const accessDevice = async (e) => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: "100%", height: "auto" },
      });

      setRecorder();

      btn_record.removeEventListener("click", accessDevice);
    } catch (error) {
      console.log(error);
      btn_record.textContent = "No permission";
    }
  };
  btn_record.addEventListener("click", accessDevice);
};

if (recorderContainer) {
  recordConfig();
}
