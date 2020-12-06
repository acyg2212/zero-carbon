import React from 'react';

const TravelCalculator = () => {

    return (
        <div className='calculator'>
            <form>
                <div className='field'>
                    <label for='distance'>Trip Distance </label>
                    <input name='distance' id='distance' type='number' />
                </div>
                <div className='field'>
                    <label for='vehicle'>Vehicle Type </label>
                    <select id='vehicle' name='vehicle'>
                        <option>Car type 1</option>
                        <option>Car type 2</option>
                        <option>Car type 3</option>
                    </select>
                </div>
                <div className='field multi-field'>
                    <label for='efficiency'>Efficiency</label>
                    <input name='efficiency' type='number' />
                    <select name='efficiency'>
                        <option>m/gallon</option>
                        <option>L/100km</option>
                    </select>
                    <select name='efficiency' id='fuel-type'>
                        <option>Petrol</option>
                        <option>Diesel</option>
                    </select>
                </div>
                <span>Or Search Vehicle Efficiency</span>
                <div className='field multi-field'>
                    <label for='make'>Make </label>
                    <select name='make' id='make'>
                        <option>Audi</option>
                        <option>Acura</option>
                        <option>Aston Martin</option>
                        <option>Bentley</option>
                        <option>BMW</option>
                        <option>Buick</option>
                        <option>Cadillac</option>
                        <option>Chevrolet</option>
                        <option>Chrysler</option>
                        <option>Dodge</option>
                        <option>Ferrari</option>
                        <option>Ford</option>
                        <option>GMC</option>
                        <option>Honda</option>
                        <option>Hyundai</option>
                        <option>Infiniti</option>
                        <option>Isuzu</option>
                        <option>Jaguar</option>
                        <option>Jeep</option>
                        <option>Kia</option>
                        <option>Lamborghini</option>
                        <option>Land Rover</option>
                        <option>Lexus</option>
                        <option>Lincoln</option>
                        <option>Lotus</option>
                        <option>Maserati</option>
                        <option>Mazda</option>
                        <option>Mecedes-Benz</option>
                    </select>
                    <label for='model'>Model </label>
                    <select name='model' id='model' >
                        <option>Model 1</option>
                        <option>Model 2</option>
                        <option>Model 3</option>
                    </select>
                    <label for='year'>Year </label>
                    <select name='year' id='name'>
                        <option>2005</option>
                        <option>2006</option>
                        <option>2007</option>
                        <option>2008</option>
                        <option>2009</option>
                    </select>
                </div>
            </form>
            <button>Calculate Footprint</button>
        </div>
    )
}

export default TravelCalculator;
