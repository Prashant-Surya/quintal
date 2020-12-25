import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

export default function AudioJs(props) {
  const [audio, setAudio] = useState(null);

  const { text } = props;

  useEffect(()=>{
    setAudio(null);
  }, [text]);

  const fetchAudio = () => {
    fetch(
      "https://apis.sentient.io/microservices/voice/ttseng/v0.1/getpredictions",
      {
        method: "POST",
        body: JSON.stringify({
          text: text.replace("_____________", "dash"),
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": "D3B15A49E5F4493D9AF9",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setAudio(response["audioContent"]);
      });
  };

  return (
    <div class="text-center">
      {audio == null ? (
        <button className="btn btn-dark" onClick={fetchAudio}>Play Audio</button>
      ) : (
        <ReactAudioPlayer src={`data:audio/mp3;base64,${audio}`} autoPlay controls />
      )}
    </div>
  );
}
