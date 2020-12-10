import React, { useState } from 'react';
import Modal from 'react-modal';
import Carousel from 'react-elastic-carousel'
import TravelCalculator from './Modals/TravelCalculator';
import RestaurantRanker from './Modals/RestaurantRanker';
import Card from './Card';
import {suggestions }from './data/Suggestions'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '610px',
        height: '600px',
        borderRadius: "30px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        marginTop: "40px"
    }
};

const SplashPage = () => {

    const [modal, setModal] = useState('')
    const [show, setShow] = useState(false)

    const clickHandler = (e) => {
        setModal(e.target.value)
        setShow("true")
    }

    const handleClose = () => {
        setShow(false);
        setModal('');
    }

    const breakPoints = [
        { width: 500, itemsToShow: 1 },
        { width: 1000, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ]

    return (
        <div>
            <Modal
                isOpen={show}
                onRequestClose={handleClose}
                style={customStyles}
                contentLabel='Modal'>
                {modal === 'restaurant' ? <RestaurantRanker /> : <TravelCalculator />}
            </Modal>
            <div className="introduction-div">
                <h2>Help Our Planet</h2>
                <h3>About Zero-Carbon</h3>
                <p>We are a couple of environmentally concious individuals that had
                no idea where to begin. We created this application so you can see what
                your carbon footprint is and things you can do to counter your own footprint.
            </p>
                <div className="button-div">
                    <button onClick={clickHandler} value="travel">Travel Calculator</button>
                    <button onClick={clickHandler} value="restaurant">Restaurant Ranker</button>
                </div>

                <div className="carousel-div">
                    <Carousel breakPoints={breakPoints}>
                        {suggestions.map((suggestion) => (
                            <Card suggestion={suggestion}/>
                        ))}

                    </Carousel>
                </div>
            </div>
        </div>
    )

}

export default SplashPage;
