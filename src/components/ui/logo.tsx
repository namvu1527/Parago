import React from "react";

interface ParagoLogoProps {
  size?: number;
  color?: string;
  className?: string;
  showText?: boolean;
}

export function ParagoLogo({ size = 40, color = "currentColor", className = "", showText = false }: ParagoLogoProps) {
  const h = size;
  const w = size * 1.2;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={w} height={h} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left person */}
        <circle cx="16" cy="12" r="6" fill={color} />
        <rect x="10" y="20" width="12" height="14" rx="4" fill={color} />
        {/* Right person */}
        <circle cx="44" cy="12" r="6" fill={color} />
        <rect x="38" y="20" width="12" height="14" rx="4" fill={color} />
        {/* Connecting U-path */}
        <path
          d="M14 36 C14 46, 46 46, 46 36"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Connection dots */}
        <circle cx="14" cy="36" r="2.5" fill={color} />
        <circle cx="46" cy="36" r="2.5" fill={color} />
        {/* Small car icon in center */}
        <rect x="25" y="40" width="10" height="5" rx="2" fill={color} opacity="0.6" />
        <circle cx="27" cy="46" r="1.5" fill={color} opacity="0.6" />
        <circle cx="33" cy="46" r="1.5" fill={color} opacity="0.6" />
      </svg>
      {showText && (
        <span className="text-xl font-bold tracking-wide" style={{ color }}>
          parago
        </span>
      )}
    </div>
  );
}
