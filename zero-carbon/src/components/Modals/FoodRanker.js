import React, { useEffect, useState } from 'react';

const FoodRanker = () => {
    const [sorted, setSorted] = useState([])
    const greenHouseGasEmissions = [
        { name: "beef", value: 60 },
        { name: "lamb/mutton", value: 24 },
        { name: "cheese", value: 21 },
        { name: "chocolate", value: 19 },
        { name: "coffee", value: 17 },
        { name: "prawns", value: 12 },
        { name: "palm oil", value: 8 },
        { name: "pig", value: 7 },
        { name: "poultry", value: 6 },
        { name: "olive oil", value: 6 },
        { name: "fish(farmed)", value: 5 },
        { name: "eggs", value: 4.5 },
        { name: "rice", value: 4 },
        { name: "fish(wild)", value: 3 },
        { name: "milk", value: 3 },
        { name: "cane sugar", value: 3 },
        { name: "ground nuts", value: 2.5 },
        { name: "wheat/rye", value: 1.4 },
        { name: "tomatoes", value: 1.4 },
        { name: "corn", value: 1 },
        { name: "nuts", value: .3 },
        { name: "cassava", value: 1 },
        { name: "soymilk", value: .9 },
        { name: "peas", value: .9 },
        { name: "bananas", value: .7 },
        { name: "root vegetable", value: .4 },
        { name: "apples", value: .4 },
        { name: "citrus fruit", value: .3 },



    ]
    console.log("here")
    useEffect(() => {
        setSorted(greenHouseGasEmissions.sort(function (a, b) {
            return a.value - b.value
        }))
        console.log(sorted)
    }, [])
    console.log(sorted)
    return (
        <div className="food-modal">
            <h2>How Does Your Food Rank?</h2>
            <div className="best-worst-div">
                <div className="ranker-div">
                    <h4>Top 3 Foods (Best Greenhouse Gas Emissions per kg of food)</h4>
                    {sorted.length > 0 ?
                        <ol>
                            <li>{sorted[0].name} {sorted[0].value}</li>
                            <li>{sorted[1].name} {sorted[1].value}</li>
                            <li>{sorted[2].name} {sorted[2].value}</li>
                        </ol> :
                        ''}

                </div>
                <div className="ranker-div">
                    <h4>Top 3 Foods (Worst Greenhouse Gas Emissions per kg of food)</h4>
                    {sorted.length > 0 ?
                        <ol>
                            <li>{sorted[sorted.length - 1].name} {sorted[sorted.length - 1].value}</li>
                            <li>{sorted[sorted.length - 2].name} {sorted[sorted.length - 2].value}</li>
                            <li>{sorted[sorted.length - 3].name} {sorted[sorted.length - 3].value}</li>
                        </ol> : ""}
                </div>
            </div>
        </div>
    )
}

export default FoodRanker;