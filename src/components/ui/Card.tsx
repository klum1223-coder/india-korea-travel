import { clsx } from "@/lib/cn";
import Image from "next/image";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

export default function Card({
  className,
  children,
  image,
  imageAlt = "",
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      {image && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
