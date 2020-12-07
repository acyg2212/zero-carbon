import React, { useState } from 'react';
const dotenv = require("dotenv");
const env = dotenv.config()
console.log(env)
const TravelCalculator = () => {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [distance, setDistance] = useState(null);

    const REACT_APP_API_KEY = 1

    const successfulLookup = position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
    }

    const failureCallBack = error => {
        console.log(error)
    }

    if (window.navigator.geolocation) {
        window.navigator.geolocation
            .getCurrentPosition(successfulLookup, failureCallBack);

    }

    const searchBarFunction = (e) => {
        e.preventDefault();
        let searchURI = encodeURIComponent(searchValue)

        async function searchIt() {

            const response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?query=${searchURI}&key=${REACT_APP_API_KEY}`)
            const responseData = await response.json();
            if (!response.ok) {
                console.error("ERROR")
            } else {
                // let data = responseData.response
                let info = responseData.resourceSets[0]
                let detailedInfo = info.resources;
                let coordinates = detailedInfo[0].point.coordinates


                const res = await fetch(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${latitude},${longitude}&destinations=${coordinates[0]},${coordinates[1]}&travelMode=driving&key=${REACT_APP_API_KEY}`)
                if (!res.ok) {
                    console.error("ERROR")
                } else {
                    const resData = await res.json();
                    let info = resData.resourceSets[0]
                    let distance = info.resources[0].results[0].travelDistance;
                    setDistance(distance);
                }


            }
        }
        searchIt();
    }
    return (
        <div>
            <form onSubmit={searchBarFunction}>
                <input type='text' placeholder="destination" onChange={(e) => setSearchValue(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div>{distance}</div>
        </div>
    )
}

export default TravelCalculator;