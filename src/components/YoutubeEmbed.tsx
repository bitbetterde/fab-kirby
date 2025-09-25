import clsx from "clsx";
import { useState } from "react";

interface YoutubeEmbedProps {
  rawUrl?: string;
  caption?: string;
  videoId?: string;
  thumbnail: string;
  title?: string;
  embedUrl: string;
  embedId?: string;
  className?: string;
  privacyText?: string;
}

/**
 * This is a YouTube Embed component that shows a thumbnail with a play button. Only when clicked, it loads the YouTube iframe. No connection to YouTube is made before the user interacts with the component.
 */

function YoutubeEmbed({
  caption,
  videoId,
  thumbnail,
  title,
  embedUrl,
  embedId,
  className,
  privacyText,
}: YoutubeEmbedProps) {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  return (
    <div
      className={clsx("relative max-w-full w-full fs-not-prose", className)}
      data-video-id={videoId}
      data-embed-url={embedUrl}
    >
      <div
        className="relative w-full bg-black cursor-pointer overflow-hidden aspect-video focus:outline-2"
        id={embedId}
      >
        {hasBeenClicked ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div
              onClick={() => setHasBeenClicked(true)}
              className="absolute top-1/2 left-1/2 w-[68px] h-[48px] z-10 transform -translate-x-1/2 -translate-y-1/2"
            >
              <svg
                className="drop-shadow-xl"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 68 48"
              >
                <path
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#f00"
                ></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 text-white font-medium px-4 pt-8 pb-4 text-base/6 bg-gradient-to-b from-transparent to-black">
                {title}
              </div>
            )}
            {privacyText && (
              <div className="absolute top-0 left-0 right-0 text-center pt-4 text-white font-medium text-xl bg-gradient-to-b from-black to-transparent">
                {privacyText}
              </div>
            )}
          </div>
        )}
      </div>
      {/* // TODO Style caption */}
      {caption && <div className="">{caption}</div>}
    </div>
  );
}

export default YoutubeEmbed;
