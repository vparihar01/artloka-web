import Image from "next/image";

export function EtsyMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <Image
      src="/images/etsy-logo.png"
      alt=""
      aria-hidden="true"
      width={148}
      height={148}
      className={`${className} shrink-0 rounded-[3px] object-contain`}
    />
  );
}
