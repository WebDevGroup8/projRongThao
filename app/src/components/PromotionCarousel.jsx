import React, { useState, useCallback, useEffect } from "react"
//import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const promotions = [
  {
    image:
      "https://png.pngtree.com/template/20220330/ourmid/pngtree-new-shoes-promotion-in-simple-winter-2018-image_908218.jpg",
    alt: "Buy More Save More",
  },
  {
    image: "https://png.pngtree.com/template/20220331/ourlarge/pngtree-new-sports-shoes-promotion-rotation-banner-image_909903.jpg",
    alt: "New Arrivals - Shop Now",
  },
  {
    image: "https://png.pngtree.com/template/20220330/ourmid/pngtree-national-day-sports-shoes-promotion-rotation-banner-image_907554.jpg",
    alt: "Free Shipping on Orders Over $50",
  },
]

export default function PromotionCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 8000)

    return () => {
      emblaApi.off("select", onSelect)
      clearInterval(autoplay)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {promotions.map((promo, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <img
                src={promo.image || "/placeholder.svg"}
                alt={promo.alt}
                width={1200}
                height={250}
                className="w-full h-auto object-cover"
              //priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === selectedIndex ? "bg-white" : "bg-white/60"}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

