import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./RecorderIcons";

interface Recording {
  created: number;
  url: string;
  title?: string;
  color?: string;
  lightText?: boolean;
}

interface SoundboxCardProps {
  recording: Recording;
}

export function SoundboxCard({ recording }: SoundboxCardProps) {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const recordingDate = new Date(recording.created * 1000);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (playerRef.current.paused) {
        playerRef.current.play();
        setIsPlaying(true);
      } else {
        playerRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <li
      className="justify-between p-4 fs-bg-grey-200 size-full flex flex-col items-center gap-4"
      {...(recording.color || recording.lightText
        ? {
            style: {
              ...(recording.color ? { backgroundColor: recording.color } : {}),
              ...(recording.lightText ? { color: "white" } : {}),
            },
          }
        : {})}
    >
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold w-full text-center">
          {recording.title || "Unbekannte Aufnahme"}
        </h3>
        <p>
          {recordingDate.toLocaleDateString("de-DE", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            timeZone: "UTC",
          })}
          {" um "}
          {recordingDate.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          })}{" "}
          Uhr
        </p>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        {audioDuration && (
          <p className="text-sm">
            Dauer: {Math.round(audioDuration || 0)} Sekunden
          </p>
        )}
        <audio
          controls
          className="w-full mt-2 hidden"
          ref={playerRef}
          onLoadedMetadata={() => {
            if (playerRef.current) {
              setAudioDuration(playerRef.current.duration);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={recording.url} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>

        <button
          type="button"
          className="aspect-square cursor-pointer relative size-full max-h-32 max-w-32 hover:bg-gray-300 bg-white text-gray-900 rounded-full flex items-center justify-center p-4"
          onClick={togglePlayPause}
          title="Aufnahme abspielen/pausieren"
        >
          {isPlaying ? (
            <PauseIcon className="max-w-16 max-h-16 size-full" />
          ) : (
            <PlayIcon className="max-w-16 max-h-16 size-full" />
          )}
        </button>
      </div>
    </li>
  );
}
