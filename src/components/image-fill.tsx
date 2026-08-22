import Image from "next/image";

/**
 * Fills its parent box with no letterboxing, regardless of the source
 * image's aspect ratio (object-fit: cover). Parent must set a size
 * (e.g. `aspect-[4/3]` or a fixed height) and `relative`/`overflow-hidden`.
 * With no `src`, renders a placeholder so layout work can proceed before
 * real photos exist — swapping in a `src` later needs no other change.
 */
export function ImageFill({
  src,
  alt,
  objectPosition = "center",
  placeholderLabel,
  sizes = "100vw",
}: {
  src?: string;
  alt: string;
  objectPosition?: string;
  placeholderLabel?: string;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/15 via-card to-accent/5 text-sm text-muted">
        {placeholderLabel ?? "이미지 준비 중"}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover", objectPosition }}
      sizes={sizes}
    />
  );
}
