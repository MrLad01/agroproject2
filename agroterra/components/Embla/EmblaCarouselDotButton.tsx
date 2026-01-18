import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import Image, { StaticImageData } from 'next/image'

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'> & {
  image?: StaticImageData
  isSelected?: boolean
}

export const DotButton: React.FC<PropType> = (props) => {
  const { children, image, isSelected, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {image ? (
        <div className={`relative w-16 h-13 rounded overflow-hidden transition-all duration-300 shrink-0 ${
          isSelected ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
        }`}>
          <Image 
            src={image} 
            alt="Thumbnail" 
            fill 
            className="object-cover"
          />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

type ScrollingDotsProps = {
  images: StaticImageData[]
  selectedIndex: number
  onDotButtonClick: (index: number) => void
}

export const ScrollingDots: React.FC<ScrollingDotsProps> = ({ 
  images, 
  selectedIndex, 
  onDotButtonClick 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbnailWidth = 64
  const gap = 12
  const paddingX = 8 // 8px on each side
  const maxVisibleDots = 3
  const containerWidth = images.length > maxVisibleDots 
    ? (thumbnailWidth * maxVisibleDots) + (gap * (maxVisibleDots - 1)) + (paddingX * 2)
    : 'auto'

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const buttons = container.querySelectorAll('button')
    
    if (buttons.length === 0 || selectedIndex >= buttons.length) return

    const selectedButton = buttons[selectedIndex]
    const containerWidthNum = container.offsetWidth
    const buttonWidth = selectedButton.offsetWidth

    // Calculate the position to center the selected button
    const buttonLeft = selectedButton.offsetLeft
    const scrollPosition = buttonLeft - (containerWidthNum / 2) + (buttonWidth / 2)

    // Calculate max scroll
    const maxScroll = container.scrollWidth - containerWidthNum
    const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))

    container.scrollTo({
      left: clampedScroll,
      behavior: 'smooth'
    })
  }, [selectedIndex])

  return (
    <div 
      ref={containerRef}
      className="relative overflow-x-auto snap-x snap-mandatory"
      style={{
        width: containerWidth,
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div className="flex flex-nowrap gap-3 px-2 my-2">
        {images.map((image, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            image={image}
            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  )
}