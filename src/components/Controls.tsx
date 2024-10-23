"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
    console.log("Controls")
  const { connect, disconnect, readyState } = useVoice();

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button
        onClick={() => {
          disconnect();
        }}
      >
        End Session
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        connect()
          .then(() => {
            console.log("Session started successfully");
          })
          .catch((err) => {
            console.error("Error starting session:", err);
          });
      }}
    >
      Start Session
    </button>
  );
}
