"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";

// Define the props type for the component
type ClientComponentProps = {
  accessToken: string;
};

// Main Client Component
export default function ClientComponent({ accessToken }: ClientComponentProps) {
    console.log("ClientComponent")
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}
