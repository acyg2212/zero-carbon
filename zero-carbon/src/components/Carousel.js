import Carousel from 'react-elastic-carousel';
import React from 'react';
import Card from './Card';
import {suggestions }from './data/Suggestions'

const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 1000, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
]

function NewCarousel() {
    return (
            <Carousel breakPoints={breakPoints}>
                {suggestions.map((suggestion) => (
                    <Card suggestion={suggestion}/>
                ))}

            </Carousel>
    )
}

export default NewCarousel
