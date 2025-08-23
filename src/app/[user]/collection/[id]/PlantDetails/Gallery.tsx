import CarouselArrows from "@/components/CarouselArrows/CarouselArrows";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!thumbnailsRef.current) return;
    const container = thumbnailsRef.current;
    const button = container.children[currentImageIndex] as HTMLElement;
    if (!button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    if (buttonRect.left < containerRect.left) {
      container.scrollTo({
        left: container.scrollLeft - (containerRect.left - buttonRect.left + 4),
        behavior: "smooth",
      });
    } else if (buttonRect.right > containerRect.right) {
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
      <div className="flex-1 flex flex-col space-y-4">
        <div className="relative flex-1 aspect-square rounded-lg overflow-hidden shadow-lg group">
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {plantImages.map((image, index) => (
              <div key={index} className="relative h-full w-full flex-shrink-0">
                <Image
                  src={image}
                  alt={`Plant image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
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

          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
            {currentImageIndex + 1} / {plantImages.length}
          </div>
        </div>
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto pb-2 scroll-ml-2"
        >
          {plantImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-green-500 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Plant view ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
