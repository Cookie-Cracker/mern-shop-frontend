import React, { useState } from 'react'
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap'

const items = [
    {
        src: require("../../../assets/img/slider/slider-1.jpg"),
        altText: 'Slide 1',
        caption: 'Slide 1',
        key: 1,
    },
    {
        src: require("../../../assets/img/slider/slider-2.jpg"),

        altText: 'Slide 2',
        caption: 'Slide 2',
        key: 2,
    },
    {
        src: require("../../../assets/img/slider/slider-3.jpg"),

        altText: 'Slide 3',
        caption: 'Slide 3',
        key: 3,
    },
];
const CarouselSlider = props => {
    const [activeIndex, setactiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
        setactiveIndex(nextIndex)

    }
    const previous = () => {
        if (animating) return
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
        setactiveIndex(nextIndex)
    }
    const goToIndex = (newIndex) => {
        if (animating) return
        setactiveIndex(newIndex)
    }
    const slides = items.map(item => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption
                    captionHeader={item.caption}
                    captionText={item.caption}
                />
            </CarouselItem>
        )
    })
    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
                direction='prev'
                directionText='Previous'
                onClickHandler={previous}
            />
            <CarouselControl
                direction='next'
                directionText='Next'
                onClickHandler={next}
            />

        </Carousel>
    )
}


export default CarouselSlider