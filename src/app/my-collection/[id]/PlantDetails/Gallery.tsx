import CarouselArrows from "@/components/CarouselArrows";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { PlantAbsolutePhotoUrl } from "../../types";

interface GalleryProps {
  photos?: PlantAbsolutePhotoUrl[];
}

const Gallery = ({ photos }: GalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!thumbnailsRef.current) {
      return;
    }

    const container = thumbnailsRef.current;
    const button = container.children[currentImageIndex] as HTMLElement;

    if (!button) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    if (buttonRect.left < containerRect.left) {
      container.scrollTo({
        left: container.scrollLeft - (containerRect.left - buttonRect.left + 4),
        behavior: "smooth",
      });
    }

    if (buttonRect.right > containerRect.right) {
      container.scrollTo({
        left:
          container.scrollLeft + (buttonRect.right - containerRect.right + 4),
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  return (
    <section id="image-gallery" className="flex flex-col">
      <div className="relative flex-1 aspect-square overflow-hidden rounded-xl shadow-md border border-gray-100 group bg-white">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {photos?.map((photo, index) => (
            <div
              key={index}
              className="relative h-full w-full flex-shrink-0 p-6"
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.absoluteUrl}
                  alt={`Plant image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {photos && photos.length > 1 && (
          <CarouselArrows
            length={photos.length}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
          />
        )}

        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium z-20">
          {currentImageIndex + 1} / {photos?.length}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
