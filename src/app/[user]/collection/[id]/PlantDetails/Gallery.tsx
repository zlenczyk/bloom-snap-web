import CarouselArrows from "@/components/CarouselArrows/CarouselArrows";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const Gallery = () => {
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

  const plantImages = [
    "/assets/spider-plant-1.jpg",
    "/assets/spider-plant-2.webp",
    "/assets/fiddle-leaf-fig-1.webp",
    "/assets/fiddle-leaf-fig-2.jpg",
    "/assets/fiddle-leaf-fig-3.webp",
  ];

  return (
    <section id="image-gallery" className="flex flex-col">
      <div className="relative flex-1 aspect-square overflow-hidden rounded-xl shadow-md border border-gray-100 group bg-white">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {plantImages.map((image, index) => (
            <div
              key={index}
              className="relative h-full w-full flex-shrink-0 p-6"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`Plant image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {plantImages.length > 1 && (
          <CarouselArrows
            length={plantImages.length}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
          />
        )}

        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium z-20">
          {currentImageIndex + 1} / {plantImages.length}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
