import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const commonButtonClasses = "relative";

export function RecordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-32 text-white hover:text-gray-300", className)}
    >
      <circle cx="50" cy="50" r="25" fill="red" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <polygon points="13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      <polygon points="16.59 20.41 20.17 24 20.17 24 16.58 27.59 18 29 23 24 18 19 16.59 20.41" />
      <polygon points="23.59 20.41 27.17 24 27.17 24 23.58 27.59 25 29 30 24 25 19 23.59 20.41" />
      <path d="M14,23H4V7.91l11.43,7.91a1,1,0,0,0,1.14,0L28,7.91V17h2V7a2,2,0,0,0-2-2H4A2,2,0,0,0,2,7V23a2,2,0,0,0,2,2H14ZM25.8,7,16,13.78,6.2,7Z" />
    </svg>
  );
}

export function StopIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-32 text-white hover:text-gray-300", className)}
    >
      <rect
        width="50"
        height="50"
        x="25"
        y="25"
        rx="10"
        ry="10"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-32", className)}
    >
      <polygon points="35,22 80,50 35,78" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-32", className)}
    >
      <rect x="35" y="25" width="10" height="50" fill="currentColor" />
      <rect x="55" y="25" width="10" height="50" fill="currentColor" />
    </svg>
  );
}

export function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      <rect x="12" y="12" width="2" height="12" />
      <rect x="18" y="12" width="2" height="12" />
      <path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" />
      <rect x="12" y="2" width="8" height="2" />
    </svg>
  );
}
