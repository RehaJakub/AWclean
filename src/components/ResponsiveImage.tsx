import type { ImgHTMLAttributes } from "react";
import { photoDetails } from "../data/photos";
import { imageVariants } from "../data/imageVariants";
interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}
export function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  loading,
  fetchPriority,
  width,
  height,
  ...props
}: ResponsiveImageProps) {
  const variant = imageVariants[src];
  return (
    <img
      {...props}
      src={src}
      alt={alt === "" || alt.startsWith("Ilustrační") ? alt : (photoDetails[src]?.alt ?? alt)}
      srcSet={variant?.srcSet}
      sizes={variant ? sizes : undefined}
      width={variant?.width ?? width}
      height={variant?.height ?? height}
      loading={loading ?? (fetchPriority === "high" ? "eager" : "lazy")}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
