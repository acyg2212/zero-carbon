import React from 'react'
import { suggestions } from './data/Suggestions'

function Card({suggestion}) {
    return (
        <div className='suggestion'>
            <img src={suggestion.img_url} />
        </div>
    )
}

export default Card
