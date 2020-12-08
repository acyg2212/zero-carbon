import React, { useState, useEffect } from 'react';
import { options } from '../data/Options'

console.log(options)

const RestaurantRanker = () => {
    const [count, setCount] = useState(2)
    const [sorted, setSorted] = useState([])
    const [newOptions, setNewOptions] = useState(options)
    const [footprint, setFootprint] = useState(0)

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

    const addItem = e => {

        e.preventDefault()
        const addSelect = document.createElement('select');
        addSelect.id = `item${count}`
        addSelect.name = `item${count}`
        addSelect.className = 'selection'
        addSelect.onchange = function () { editOptions() }
        const select = document.getElementsByClassName('addSelect')[0]
        const defaultOption = document.createElement('option')
        defaultOption.innerHTML = 'Add Item'
        addSelect.appendChild(defaultOption)
        select.appendChild(addSelect)

        newOptions.forEach(option => {
            const addOption = document.createElement("option")
            addOption.value = option.meat
            addOption.innerHTML = option.meat
            addSelect.appendChild(addOption)
        })
        setCount(count + 1)
    }

    useEffect(() => {
        setSorted(greenHouseGasEmissions.sort(function (a, b) {
            return a.value - b.value
        }))
        console.log(sorted)
    }, [])

    const editOptions = e => {
        const list = document.querySelectorAll('.selection')
        let selected = []
        list.forEach((item) => {
            selected = [...selected, item.value]
        })

        const temp = []
        options.forEach(item => {
            if (!selected.includes(item.meat)) {
                temp.push(item)
            }
        })
        setNewOptions(temp)

        let total = 0
        selected.forEach(item => {

            options.forEach((option) => {
                if (option.meat == item) {
                    total += option.emission
                }
            })

        })
        setFootprint(total)
    }

    return (
        <div>
            <h3>What's in your meal? </h3>
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
            <label for='item1'>Item 1</label>
            <div className='addSelect'>
                <select onChange={editOptions} className='selection' name='item1' id='item1'>
                    <option>Add item</option>
                    {options.map((option, idx) => (
                        <option key={idx}>{option.meat}</option>
                    ))}
                </select>
            </div>
            <button onClick={addItem}><h3>Add item</h3></button>
            <div>
                <h3>Carbon Footprint for this meal </h3>
                <input for='emission' value={footprint} />
                <label name='emission'>CO2</label>
            </div>
        </div>
    )
}

export default RestaurantRanker;
