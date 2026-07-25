"use client";

interface AsteriskSvgProps {
  className?: string;
  size?: number;
}

export function AsteriskSvg({ className = "nav-asterisk", size = 24 }: AsteriskSvgProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="asteriskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9edf1" />
          <stop offset="100%" stopColor="#63c9a8" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C12 2 12 12 12 22"
        stroke="url(#asteriskGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 2C12 2 3.5 7 2 12C3.5 17 12 22 12 22"
        stroke="url(#asteriskGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 2C12 2 20.5 7 22 12C20.5 17 12 22 12 22"
        stroke="url(#asteriskGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
