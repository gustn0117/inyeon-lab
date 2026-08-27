import { getImageProps } from "next/image";

type ArtDirectedImageProps = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
  pictureClassName?: string;
  media?: string;
  sizes: string;
  mobileSizes?: string;
  quality?: number;
  priority?: boolean;
  ariaHidden?: boolean;
};

export default function ArtDirectedImage({
  desktopSrc,
  mobileSrc,
  alt,
  className,
  pictureClassName,
  media = "(max-width: 900px) and (orientation: portrait)",
  sizes,
  mobileSizes = sizes,
  quality = 88,
  priority = false,
  ariaHidden = false,
}: ArtDirectedImageProps) {
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    src: mobileSrc,
    alt,
    fill: true,
    sizes: mobileSizes,
    quality,
  });

  const { props: desktopProps } = getImageProps({
    src: desktopSrc,
    alt,
    fill: true,
    sizes,
    quality,
    priority,
  });

  return (
    <picture className={pictureClassName} aria-hidden={ariaHidden || undefined}>
      <source media={media} srcSet={mobileSrcSet} sizes={mobileSizes} />
      <img {...desktopProps} className={className} />
    </picture>
  );
}
