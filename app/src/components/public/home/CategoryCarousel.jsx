import React, { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClickableCard from "./ClickableCard";

export default function CategoryCarousel(props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrevRef = useRef(null);
  const scrollNextRef = useRef(null);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      const canScrollPrev = emblaApi.canScrollPrev();
      const canScrollNext = emblaApi.canScrollNext();
      if (scrollPrevRef.current)
        scrollPrevRef.current.style.display = canScrollPrev ? "flex" : "none";
      if (scrollNextRef.current)
        scrollNextRef.current.style.display = canScrollNext ? "flex" : "none";
    };

    emblaApi.on("select", updateButtons);
    updateButtons();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row gap-4">
          {props.categories.map((category, index) => (
            <div key={index} className="flex flex-row">
              <ClickableCard
                imageUrl={category.imageUrl}
                title={category.title}
                navigateTo={category.navigateTo || "/"} // ค่า default ถ้าไม่มี navigateTo
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        ref={scrollPrevRef}
        className="absolute top-1/2 left-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md md:hidden"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        ref={scrollNextRef}
        className="absolute top-1/2 right-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md md:hidden"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
