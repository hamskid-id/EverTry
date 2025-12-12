import { useEffect, useState } from "react";

interface UseAvatarProps {
  imageSrc?: string;
  name?: string;
  textCount?: number;
}

export function useAvatar({
  imageSrc,
  name = "",
  textCount = 2,
}: UseAvatarProps) {
  const [validImageSrc, setValidImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!imageSrc) {
      setValidImageSrc(null);
      return;
    }

    // Check if it's a valid URL or static import
    if (imageSrc.startsWith("/") || imageSrc.startsWith("http")) {
      const img = new Image();
      img.onerror = () => {
        setValidImageSrc(null);
      };
      img.onload = () => {
        setValidImageSrc(imageSrc);
      };
      img.src = imageSrc;
    } else {
      // For Next.js static imports
      setValidImageSrc(imageSrc);
    }
  }, [imageSrc]);

  const getInitials = () =>
    name
      .trim()
      .split(" ")
      .slice(0, textCount)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");

  return { validImageSrc, getInitials };
}
