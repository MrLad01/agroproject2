import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
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
        <div className={`relative w-16 h-12 rounded overflow-hidden transition-all duration-300 ${
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