"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function Marquee({
  items,
  className = "",
  speed = 40,
  reverse = false,
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 sm:gap-10 px-6 sm:px-10"
          >
            <span
              className="font-serif text-[clamp(1.5rem,4vw,3rem)] font-light italic whitespace-nowrap"
              style={{ color: "var(--color-foreground)", opacity: 0.15 }}
            >
              {item}
            </span>
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "var(--color-strong-cyan)", opacity: 0.3 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
