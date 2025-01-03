import React from "react";

interface CircularLoaderProps {
  size?: string;
  color?: string;
  className?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = "24px",
  color = "#000",
  className,
}) => {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={size}
      height={size}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        className="opacity-25"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        className="opacity-75"
        strokeDasharray="126.92"
        strokeDashoffset="32"
      />
    </svg>
  );
};

export { CircularLoader };
