import React, { useEffect, useState } from 'react';
import NewCarousel from '../Carousel';
const dotenv = require("dotenv");
const env = dotenv.config()

const TravelCalculator = (props) => {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [distance, setDistance] = useState(null);
    const [footprint, setFoorprint] = useState('')
    const [efficiency, setEfficiency] = useState('')
    const [fuel, setFuel] = useState('petrol')
    const [emission, setEmission] = useState(2.3)
    const [year, setYear] = useState(2006);
    const [make, setMake] = useState("Audi");
    const [models, setModels] = useState([]);
    const [model, setModel] = useState(null)

    useEffect(() => {
        async function getModel() {
            const response = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`)
            const responseData = await response.text()
            if (!response.ok) {
                console.error(response)
            } else {
                let data = new window.DOMParser().parseFromString(responseData, "text/xml")
                let first = data.getElementsByTagName("menuItems")[0].childNodes
                let newArray = Array.prototype.map.call(first, (function (node) {
                    return node
                }))
                let models = newArray.map(node => {
                    return node.childNodes[0].innerHTML
                })
                setModels(models)

            }
        }
        getModel();
    }, [make])

    useEffect(() => {
        if (model) {
            async function getModel() {
                const response = await fetch(`https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=${make}&model=${model}`)
                const responseData = await response.text()
                if (!response.ok) {
                    console.error(response)
                } else {
                    let data = new window.DOMParser().parseFromString(responseData, "text/xml")
                    try {
                        let first = data.getElementsByTagName("vehicles")[0].childNodes[0].childNodes[42].innerHTML
                        setEfficiency(first)
                    } catch (e) {
                        console.error(e)
                    }

                    // let newArray = Array.prototype.map.call(first, (function (node) {
                    //     return node
                    // }))
                    // console.log(newArray)
                    // let models = newArray.map(node => {
                    //     return node.childNodes[0].innerHTML
                    // })
                    // setModels(models)
                    // console.log(newArray[0].childNodes[0].innerHTML)
                }

            }
            getModel();
        }
    }, [model])

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

            const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?query=${searchURI}&key=${process.env.REACT_APP_API_KEY}`)
            const responseData = await response.json();
            if (!response.ok) {
                console.error("ERROR")
            } else {
                // let data = responseData.response
                let info = responseData.resourceSets[0]
                let detailedInfo = info.resources;
                let coordinates = detailedInfo[0].point.coordinates


                const res = await fetch(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${latitude},${longitude}&destinations=${coordinates[0]},${coordinates[1]}&travelMode=driving&key=${process.env.REACT_APP_API_KEY}`)
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


    const getFuel = e => {
        setFuel(e.target.value)
        switch (e.target.value) {
            case 'petrol':
                setEmission(2.3);
                break;
            case 'diesel':
                setEmission(2.6);
                break;
            case 'lpg':
                setEmission(1.6);
                break;
            case 'cpg':
                setEmission(2.2);
                break;
            default:
                setEmission(2.3)
        }
    }
    const measurement = e => {
        console.log('hi')
    }

    const getEfficiency = e => {
        setEfficiency(e.target.value)
    }

    const getDistance = e => {
        setDistance(e.target.value)
    }

    const calculate_footprint = e => {
        e.preventDefault()
        const carbon = (parseInt(distance) / parseInt(efficiency) * emission)
        setFoorprint(carbon.toFixed(2))
        const carousel = document.getElementsByClassName('hide')[0];
        carousel.classList.remove("hide")
        carousel.classList.add("show")
    }
    return (
        <div className="travel-container">
            <button id="close-button" onClick={props.handleClose}>X</button>
            <h1>Carbon Travel Calculator</h1>
            {/* <div className="step-1-div">
                <div>
                    <h3 className="travel-steps">Step 1</h3>
                    <p className="travel-calculator-instructions">(enter travel distance)</p>
                </div> */}
            {/* <form onSubmit={searchBarFunction}>
                    <div className="search-bar-div">
                        <input type='text' name="search" className="search-input" placeholder="🔍 Destination" onChange={(e) => setSearchValue(e.target.value)} />
                        <button className="form-button" type="submit">Search</button>
                    </div>
                </form> */}
            {/* </div> */}

            {/* <div className='calculator'> */}

            <div className="form-container">
                <form>
                    <div className="step-1-div">
                        <div className="step-div">
                            <h3 className="travel-steps">Step 1</h3>
                            <p className="travel-calculator-instructions">(enter travel distance)</p>
                        </div>
                        <div className='field'>
                            <label for='distance'>Trip Distance </label>
                            <input name='distance' id='distance' type='number' value={distance} onChange={getDistance} />
                         Miles
                        </div>
                    </div>
                    <div className="step-2-div">
                        <div className="step-div">
                            <h3 className="travel-steps">Step 2</h3>
                            <p className="travel-calculator-instructions">(enter fuel efficiency or search for your car)</p>
                        </div>

                        <div className='field'>
                            <div className='field multi-field'>
                                <label for='efficiency'>Efficiency</label>
                                <input name='efficiency' type='number' onChange={getEfficiency} value={efficiency} />
                                <select name='efficiency' onChange={measurement}>
                                    <option value='mgallon'>m/gallon</option>
                                </select>
                                <select name='efficiency' id='fuel-type' onChange={getFuel} value={fuel} >
                                    <option value='petrol'>Petrol</option>
                                    <option value='diesel'>Diesel</option>
                                    <option value='lpg'>LPG</option>
                                    <option value='cpg'>CPG</option>
                                </select>
                            </div>
                            <div className="travel-calculator-span">Or Search Vehicle Efficiency:</div>
                            <div className='field multi-field three-field'>
                                <label for='year'>Year </label>
                                <select name='year' id='name' onChange={e => setYear(e.target.value)}>
                                    <option>2006</option>
                                    <option>2007</option>
                                    <option>2008</option>
                                    <option>2009</option>
                                    <option>2010</option>
                                    <option>2011</option>
                                    <option>2012</option>
                                    <option>2013</option>
                                    <option>2014</option>
                                    <option>2015</option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                </select>
                                <label for='make'>Make </label>
                                <select name='make' id='make' onChange={e => setMake(e.target.value)}>
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
                                    <option>Mercedes-Benz</option>
                                </select>
                                <label for='model'>Model </label>
                                <select name='model' id='model' onChange={e => setModel(e.target.value)}>
                                    {models.length > 0 ? models.map(model => {
                                        return <option>{model}</option>
                                    }) : ""}
                                </select>
                            </div>

                        </div>
                    </div>
                    <button className="form-button" onClick={calculate_footprint}>Calculate Footprint</button>
                </form>

                <div className="div3-container">
                    <div className="step-3-div">
                        <div className="step-div">
                            <h3 className="travel-steps">Step 3</h3>
                        </div>
                        <div className="carbon-footprint-container">
                            <h3>Your Carbon footprint </h3>
                            <input name='footprint' value={footprint} />
                            <label> Litres per Km</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-div hide">
                <h2 style={{ textAlign: "center" }}>Offset your carbon footprint with these suggestions</h2>
                <NewCarousel />
            </div>
            {/* <div>{distance}</div> */}

            {/* </div> */}
        </div >
    )
}

export default TravelCalculator;
