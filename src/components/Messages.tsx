"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
    console.log("Messages")
  const { messages } = useVoice();

  return (
    <div>
      {messages.map((msg, index) => {
        
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          console.log(`msg-${msg.type} ${msg.message.role} ${msg.message.content}   index-${index}`)
          return (
            <div key={msg.type + index}>
              <div>{msg.message.role === "user" ? "User" : "Assistant"}:</div>
              <div>{msg.message.content}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
