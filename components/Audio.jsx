import React, { useEffect, useRef, useState } from "react";

import MicrophoneButton from "./MicrophoneButton";

const Audio = ({ fetchChatGptResponse }) => {
  const recognition = useRef(null);

  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    if (!recognition.current) return;

    if (isRecording) {
      recognition.current.stop();
      setIsRecording(false);
    } else {
      recognition.current.start();
      setIsRecording(true);
    }
  };

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) ||
      !("speechSynthesis" in window)
    ) {
      alert(
        "Web Speech API is not supported by your browser. Try using Chrome."
      );
    } else {
      recognition.current = new webkitSpeechRecognition();
    }

    const synth = window.speechSynthesis;

    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = "en-US";

    recognition.current.onresult = function (event) {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const text = event.results[i][0].transcript;
          recognition.current.stop();
          setIsRecording(false);
          // document.getElementById("output").innerHTML = text;
          fetchChatGptResponse(text)
            .then((response) => {
              console.log("yeah we got it", response);
              speak(response);
            })
            .catch((error) =>
              console.error("Error fetching ChatGPT response:", error)
            );
        } else {
          interimTranscript += event.results[i][0].transcript;
          // document.getElementById("output").innerHTML = interimTranscript;
        }
      }
    };

    recognition.current.onerror = function (event) {
      console.log(event.error);
    };

    function speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      // const selectedVoice = getVoice("en-GB", "Google UK English Male");
      // utterance.voice = selectedVoice;
      utterance.onend = function () {
        // recognition.current.start();
        // setIsRecording(true);
        console.log("speaking ended");
      };
      console.log("speaking", text);
      synth.speak(utterance);
    }

    function getVoice(lang = "en-US", name = null) {
      const voices = speechSynthesis.getVoices();

      let selectedVoice = voices.find((voice) => voice.lang === lang);

      if (name) {
        const voiceByName = voices.find(
          (voice) => voice.name === name && voice.lang === lang
        );
        if (voiceByName) {
          selectedVoice = voiceByName;
        }
      }

      return selectedVoice;
    }

    speechSynthesis.onvoiceschanged = function () {
      const voices = speechSynthesis.getVoices();
      console.log(voices);
    };
  }, []);

  return (
    <>
      {/* <button
          onClick={handleToggleRecording}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {isRecording ? "Stop" : "Start"}
        </button> */}
      <MicrophoneButton
        onClick={handleToggleRecording}
        recording={isRecording}
      />

      {/* <div className="bg-white border p-4 rounded">
        <span id="output" className="text-lg"></span>
      </div> */}
    </>
  );
};

export default Audio;
