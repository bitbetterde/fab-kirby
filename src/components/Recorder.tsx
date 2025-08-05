import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  MailIcon,
  PauseIcon,
  PlayIcon,
  RecordIcon,
  StopIcon,
  TrashIcon,
} from "./RecorderIcons";

export interface RecorderProps {
  className?: string;
  title?: string;
  description?: string;
  showVisualizer?: boolean;
  color?: string;
  successMessage?: string;
  lightText?: boolean;
}

export const Recorder: React.FC<RecorderProps> = ({
  className,
  title,
  description,
  showVisualizer,
  color,
  successMessage,
  lightText
}: RecorderProps) => {
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const player = useRef<HTMLAudioElement | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [progressState, setProgressState] = useState<
    "init" | "recording" | "recorded" | "playing" | "submitted"
  >("init");

  // Add refs for audio context and animation
  const audioCtx = useRef<AudioContext | null>(null);
  const animationId = useRef<number | null>(null);

  const handleUpload = async () => {
    try {
      let file = await fetch(recordedUrl)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], `recording.ogg`, {
              type: "audio/ogg; codecs=opus",
            })
        );

      const formData = new FormData();
      formData.append("file", file);
      if (color) formData.append("color", color);
      if (lightText) formData.append("lightText", String(lightText));

      const createFile = await fetch(`/api/bitbetter/soundbox`, {
        method: "POST",
        body: formData,
      });

      if (!createFile.ok) {
        throw new Error(`Upload failed: ${createFile.statusText}`);
      }

      console.log("Upload successful");
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error state if needed
    } finally {
      setTimeout(() => {
        setProgressState("init");
        setRecordedUrl("");
      }, 5000);
    }
  };

  // This effect initializes the canvas and draws a horizontal line in the middle
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const canvasElement = canvas.current;

    if (!ctx || !canvasElement) {
      return;
    }

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw a horizontal black line in the middle
    ctx.beginPath();
    ctx.moveTo(0, canvasElement.height / 2);
    ctx.lineTo(canvasElement.width, canvasElement.height / 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  // Stopwatch effect
  useEffect(() => {
    let interval: number | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 10);
      }, 10);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setProgressState("recording");
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      if (showVisualizer) visualize(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, {
          type: "audio/ogg; codecs=opus",
        });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }

    // Clean up visualization
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
    if (audioCtx.current) {
      audioCtx.current.close();
      audioCtx.current = null;
    }

    setTimer(0);
    setIsRecording(false);
    setProgressState("recorded");
  };

  function visualize(stream: MediaStream) {
    // Ensure canvas is ready
    const canvasElement = canvas.current;
    if (!canvasElement) {
      console.warn("Canvas not ready for visualization");
      return;
    }

    const canvasCtx = canvasElement.getContext("2d");
    if (!canvasCtx) {
      console.warn("Canvas context not available");
      return;
    }

    // Initialize AudioContext
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
    }

    const source = audioCtx.current.createMediaStreamSource(stream);
    const analyser = audioCtx.current.createAnalyser();

    const bufferLength = 2048;
    analyser.fftSize = bufferLength;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    function draw() {
      // Check if we should continue drawing
      if (!canvasElement || !canvasCtx || !audioCtx.current) {
        return;
      }

      const WIDTH = canvasElement.width;
      const HEIGHT = canvasElement.height;

      animationId.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(228, 228, 229)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(11, 19, 36)";

      canvasCtx.beginPath();

      let sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(WIDTH, HEIGHT / 2);
      canvasCtx.stroke();
    }

    draw();
  }

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      if (audioCtx.current) {
        audioCtx.current.close();
      }
    };
  }, []);

  return (
    <div
      className={
        "flex gap-4 flex-col fs-bg-grey-200 px-5 sm:px-6 py-8 sm:my-8 fs-not-prose " +
        (className || "")
      }
    >
      {title && (
        <h3 className="font-plex text-2xl font-bold text-grey-900">{title}</h3>
      )}
      {description && <p>{description}</p>}
      {showVisualizer && <canvas ref={canvas} height="40px"></canvas>}
      <div className="w-full flex justify-center gap-4">
        {(progressState === "recorded" || progressState === "playing") && (
          <button
            type="button"
            className="size-32 bg-white rounded-full p-8 hover:bg-gray-300"
            onClick={() => {
              setProgressState("init");
              console.log("Resetting");
              if (player.current) {
                player.current.pause();
              }
              setRecordedUrl("");
            }}
            title="Aufnahme löschen"
          >
            <TrashIcon />
          </button>
        )}
        {progressState !== "submitted" && (
          <button
            className="cursor-pointer relative size-32 hover:bg-gray-300 bg-white text-gray-900 rounded-full flex items-center justify-center overflow-hidden"
            title={(() => {
              switch (progressState) {
                case "init":
                  return "Aufnahme starten";
                case "recording":
                  return "Aufnahme stoppen";
                case "recorded":
                  return "Aufnahme abspielen";
                case "playing":
                  return "Wiedergabe pausieren";
                default:
                  return "";
              }
            })()}
            type="button"
            onClick={() => {
              switch (progressState) {
                case "init":
                  startRecording();
                  break;
                case "recording":
                  stopRecording();
                  break;
                case "recorded":
                  // Play recorded audio
                  player.current?.play();
                  setProgressState("playing");
                  break;
                case "playing":
                  // Pause audio playback
                  player.current?.pause();
                  setProgressState("recorded");
                  break;
                default:
                  console.warn("Unhandled progress state:", progressState);
                  break;
              }
            }}
          >
            <>
              {progressState === "init" && <RecordIcon />}
              {progressState === "recording" && (
                <StopIcon className={"!bg-[red]"} />
              )}
              {progressState === "recorded" && <PlayIcon />}
              {progressState === "playing" && <PauseIcon />}
            </>

            {progressState === "recording" && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="">
                  {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
                </span>
                <span className="">
                  {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}
                </span>
              </div>
            )}
          </button>
        )}
        {/* Send button */}
        {(progressState === "recorded" || progressState === "playing") && (
          <button
            type="button"
            className="cursor-pointer size-32 bg-[red] text-white rounded-full p-8 hover:text-gray-300"
            onClick={() => {
              setProgressState("submitted");
              console.log("Uploading");
              handleUpload();
              // Handle submission logic here if needed
              if (player.current) {
                player.current.pause();
              }
            }}
            title="Aufnahme abschicken"
          >
            <MailIcon />
          </button>
        )}
        {progressState === "submitted" && (
          <button className="size-32 bg-white rounded-full p-8" disabled>
            <CheckIcon />
          </button>
        )}
      </div>
      {progressState === "submitted" && (
        <div className="text-center text-sm text-gray-500">
          {successMessage ||
            "Aufnahme erfolgreich hochgeladen. Sie wird nun geprüft und baldmöglich veröffentlicht."}
        </div>
      )}
      {recordedUrl && (
        <audio
          ref={player}
          controls
          src={recordedUrl}
          className="hidden"
          onEnded={() => setProgressState("recorded")}
        />
      )}
    </div>
  );
};
