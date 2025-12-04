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
    const thumb = container.children[currentImageIndex] as HTMLElement;

    if (!thumb) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();

    if (thumbRect.left < containerRect.left) {
      container.scrollTo({
        left: container.scrollLeft - (containerRect.left - thumbRect.left + 4),
        behavior: "smooth",
      });
    }

    if (thumbRect.right > containerRect.right) {
      container.scrollTo({
        left:
          container.scrollLeft + (thumbRect.right - containerRect.right + 4),
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  return (
    <section id="image-gallery" className="flex flex-col">
      <div className="relative flex-1 aspect-square overflow-hidden rounded-xl shadow-md border border-gray-100 group bg-white">
        {(!photos || photos.length === 0) && (
          <div className="flex items-center justify-center h-full w-full text-gray-400 text-lg font-medium">
            No photos found
          </div>
        )}

        {photos && photos.length > 0 && (
          <>
            <div
              className="flex h-full w-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {photos.map((photo, index) => (
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

            {photos.length > 1 && (
              <CarouselArrows
                length={photos.length}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
              />
            )}

            {photos.length >= 1 && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium z-20">
                {currentImageIndex + 1} / {photos.length}
              </div>
            )}
          </>
        )}
      </div>
      {photos && photos.length > 1 && (
        <div ref={thumbnailsRef} className="flex gap-2 overflow-x-auto py-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-30 h-30 flex-shrink-0 rounded-lg overflow-hidden border shadow-md
                ${
                  index === currentImageIndex
                    ? "border-emerald-600 border-2"
                    : "border-none"
                }`}
            >
              <Image
                src={photo.absoluteUrl}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
