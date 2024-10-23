import React, { useState } from 'react';
import { useVoiceClient, useMicrophone } from '@humeai/voice-react'; // Correct imports from Hume AI
import { Button, Container, Row, Col } from 'react-bootstrap'; // Bootstrap components

const App: React.FC = () => {
  const [transcript, setTranscript] = useState('');  // Stores the real-time transcript from Hume AI
  const [isRecording, setIsRecording] = useState(false);  // Manages the state of recording

  // Initialize the voice client to connect to Hume AI (Configure this with your Hume AI settings)
  const voiceClient = useVoiceClient({
    onFinalTranscript: (finalTranscript) => {
      setTranscript(finalTranscript);  // Update the state with the final transcript from Hume AI
    },
    onError: (error) => {
      console.error("Voice Client Error:", error);  // Handle any errors from Hume AI
    }
  });

  // Initialize the microphone for capturing real-time audio
  const { startRecording, stopRecording } = useMicrophone({
    onData: (audioChunk) => {
      voiceClient.sendAudioChunk(audioChunk);  // Send real-time audio to Hume AI
    },
    onFinalTranscript: (finalTranscript) => {
      setTranscript(finalTranscript);  // Update the state with the final transcript
    },
  });

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();  // Start recording and sending audio to Hume AI
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();  // Stop recording
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Voice Interaction with Hume AI</h1>
          {isRecording ? (
            <Button onClick={handleStopRecording}>Stop Speaking</Button>
          ) : (
            <Button onClick={handleStartRecording}>Start Speaking</Button>
          )}
          <p>Transcript: {transcript || "No transcript available yet"}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
