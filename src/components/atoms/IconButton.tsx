import React from "react";
import Image from "next/image";

interface IconButtonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  src,
  alt,
  width = 24,
  height = 24,
  className = "",
  onPress,
}) => {
  return (
    <button className={className} onClick={onPress}>
      <Image src={src} alt={alt} width={width} height={height} />
    </button>
  );
};

export default IconButton;
