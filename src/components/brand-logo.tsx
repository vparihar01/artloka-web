import Image from "next/image";

export function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/artloka-logo-tr-w.png"
      alt="ArtLoka"
      width={260}
      height={102}
      priority={priority}
      className={`h-auto w-[138px] object-contain md:w-[158px] ${className}`}
    />
  );
}
