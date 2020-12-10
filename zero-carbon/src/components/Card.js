import React from 'react'


function Card({ suggestion }) {
    return (
        <a className='card' href={suggestion.link}>
            <div className='suggestion'>
                <img src={suggestion.img_url} alt="some suggestion to donate" />
                <div className='info'>
                    <h3>{suggestion.title}</h3>
                    <a className='button' href={suggestion.link}>Learn More</a>
                </div>
                <h3 style={{ margin: "0px" }}>{suggestion.desc}</h3>
            </div>
        </a>
    )
}

export default Card
