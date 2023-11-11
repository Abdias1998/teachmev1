import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const captionsRef = useRef(null);
  const subtitlesRef = useRef(null); // Référence pour le texte du sous-titre
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRateIndex, setPlaybackRateIndex] = useState(0);
  const playbackRates = [1, 1.25, 1.5, 0.25, 1];
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleCaptions = () => {
    setCaptionsEnabled(!captionsEnabled);

    if (captionsRef.current) {
      captionsRef.current.mode = captionsEnabled ? "hidden" : "showing";
    }
  };

  const toggleMiniPlayer = () => {
    // Implémentez ici la logique pour passer en mode lecteur réduit
  };

  const toggleTheaterMode = () => {
    // Implémentez ici la logique pour activer/désactiver le mode cinéma
  };

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const changePlaybackSpeed = () => {
    const newIndex = (playbackRateIndex + 1) % playbackRates.length;
    videoRef.current.playbackRate = playbackRates[newIndex];
    setPlaybackRateIndex(newIndex);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (videoRef.current.duration * percentage) / 100;
    videoRef.current.currentTime = time;
  };

  useEffect(() => {
    // Mise à jour de la progression de la vidéo
    videoRef.current.addEventListener("timeupdate", () => {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    });

    // Mise à jour du texte du sous-titre
    videoRef.current.addEventListener("timeupdate", () => {
      if (subtitlesRef.current) {
        // Obtenez le texte du sous-titre à partir de la piste de sous-titre active
        const activeTrack = Array.from(captionsRef.current.track.activeCues);
        if (activeTrack.length > 0) {
          const subtitleText = activeTrack[0].text;
          subtitlesRef.current.textContent = subtitleText;
        } else {
          subtitlesRef.current.textContent = "";
        }
      }
    });
  }, []);

  return (
    <div className="video-container">
      <video src="./test.mp4" ref={videoRef}>
        <track
          kind="captions"
          src={captionsEnabled ? "./assets/cc.vtt" : ""}
          srcLang="en"
          ref={captionsRef}
          default
          style={{ fontSize: "1.2rem", position: "relative", bottom: "8rem" }}
        />
      </video>
      <div className="video-progress" onClick={handleProgressClick}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls">
        <div className="controls-one">
          <p onClick={togglePlay}>
            {isPaused ? (
              <svg
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </p>

          <p onClick={toggleMute}>
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="currentColor"
                  d="M22 7.1l-6.9 6.9H3v26h14.1L22 40.9V7.1zm3.68 3.68l-2.7 2.68 2.68 2.72-2.68 2.7 2.7 2.7 2.72-2.7 2.68 2.7 2.7-2.7-2.68-2.7 2.68-2.72-2.7-2.68 2.7-2.7-2.7-2.72z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 48 48"
              >
                <path
                  fill="currentColor"
                  d="M24 16.9l-4.8 4.8H7v14.4h11.2l4.8 4.8V16.9zm1.2-5.8L19.4 16 25.2 21.8V11.1z"
                />
              </svg>
            )}
          </p>
        </div>

        <div className="controls-deux">
          <button
            style={{ cursor: "pointer" }}
            onClick={toggleCaptions}
            className={captionsEnabled ? "actived" : ""}
          >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              ></path>
              {captionsEnabled ? (
                <rect x="3" y="18" width="18" height="2.5" fill="red" />
              ) : null}
            </svg>
          </button>

          <button onClick={toggleMiniPlayer}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0-2-.9-2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              ></path>
            </svg>
          </button>

          <button onClick={toggleTheaterMode}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0-2-.9-2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              ></path>
            </svg>
          </button>
          <button onClick={toggleFullScreen}>
            <svg width="24" height="24" class="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              ></path>
            </svg>
          </button>
          <button onClick={changePlaybackSpeed}>
            ({playbackRates[playbackRateIndex]}x)
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
