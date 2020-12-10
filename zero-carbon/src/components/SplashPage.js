import React, { useState } from 'react';
import Modal from 'react-modal';
import TravelCalculator from './Modals/TravelCalculator';
import RestaurantRanker from './Modals/RestaurantRanker';
import NewCarousel from './Carousel';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
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

        setModal(e.target.id)
        setShow("true")
    }

    const handleClose = () => {
        setShow(false);
        setModal('');
    }


    return (
        <div>
            <Modal
                isOpen={show}
                onRequestClose={handleClose}
                style={customStyles}
                contentLabel='Modal'>
                {modal === 'food' ? <RestaurantRanker handleClose={handleClose} /> : <TravelCalculator handleClose={handleClose} />}
            </Modal>
            <div className="introduction-div">
                <div className="header-div">
                    <h2 className="splash-page-h2-div">Help Our Planet</h2>
                    <h3 className="splash-page-h3-div">How big of a footprint are you leaving behind?</h3>
                </div>
                <h3 className="about-header">About Zero Carbon</h3>
                <p className="splash-page-p">Climate change can be overwhelming. The science is complex,
                and when it comes to future impacts, there are still a lot
                of unknowns. While real solutions will require action on a
                global scale, there are choices you can make in your day-to-day
                    life to lessen your personal impact on the environment.</p>
                <p className="splash-page-p">We are a couple of environmentally concious individuals that had
                no idea where to begin. We created this application so you can see what
                your carbon footprint is and things you can do to counter your own footprint.
            </p>
                <div className="button-div">
                    <div>
                        <button className="splash-page-button" onClick={clickHandler} id="travel"> <i class="fas fa-smog"></i> <p>Travel Calculator</p></button>
                    </div>
                    <div>
                        <button className="splash-page-button" onClick={clickHandler} id="food"> <i id="food" class="fas fa-hamburger"></i><p id="food">Food Ranker</p></button>
                    </div>
                </div>
                <h2>There's still time to save the planet. Here's what you can do ...</h2>
                <div className="carousel-div">
                    <NewCarousel />
                </div>
            </div>
        </div >
    )

}

export default SplashPage;
