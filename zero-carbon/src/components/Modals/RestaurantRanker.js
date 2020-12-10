import React, { useState, useEffect } from 'react';
import NewCarousel from '../Carousel';
import { options } from '../data/Options'



const RestaurantRanker = (props) => {
    const [count, setCount] = useState(2)
    const [sorted, setSorted] = useState([])
    const [newOptions, setNewOptions] = useState(options)
    const [footprint, setFootprint] = useState(0)


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
            addOption.value = option.name
            addOption.innerHTML = option.name
            addSelect.appendChild(addOption)
        })
        setCount(count + 1)
    }

    useEffect(() => {
        setSorted(options.sort(function (a, b) {
            return a.value - b.value
        }))

    }, [])

    const editOptions = e => {
        const list = document.querySelectorAll('.selection')
        let selected = []
        list.forEach((item) => {
            selected = [...selected, item.value]
        })

        const temp = []
        options.forEach(item => {
            if (!selected.includes(item.name)) {
                temp.push(item)
            }
        })
        setNewOptions(temp)

        let total = 0
        selected.forEach(item => {

            options.forEach((option) => {
                if (option.name == item) {
                    total += option.value
                }
            })

        })
        setFootprint(total)
    }

    return (
        <div className="food-container">
            <button id="close-button" onClick={props.handleClose}>X</button>
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
            <div className="add-item-div">
                {/* <label for='item1'>Item 1</label> */}
                <div className='addSelect'>
                    <select onChange={editOptions} className='selection' name='item1' id='item1'>
                        <option>Add item</option>
                        {options.map((option, idx) => (
                            <option key={idx}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <button className="add-button" onClick={addItem}><h3>+</h3></button>
            </div>
            <div>
                <h3>Carbon Footprint for this meal </h3>
                <input for='emission' value={footprint} />
                <label name='emission'>CO2</label>
            </div>
            <h2>Offset your carbon footprint with these suggestions</h2>
            <div className="carousel-div">
                <NewCarousel />
            </div>
        </div>
    )
}

export default RestaurantRanker;
