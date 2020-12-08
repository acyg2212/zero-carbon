import React, {useState} from 'react';
import {options} from '../data/Options'

console.log(options)

const RestaurantRanker = () => {
    const [count, setCount] = useState(2)

    const [newOptions, setNewOptions] = useState(options)
    const [footprint, setFootprint] = useState(0)

    const addItem = e => {

        e.preventDefault()
        const addSelect = document.createElement('select');
        addSelect.id = `item${count}`
        addSelect.name = `item${count}`
        addSelect.className = 'selection'
        addSelect.onchange = function(){editOptions()}
        const select = document.getElementsByClassName('addSelect')[0]
        const defaultOption = document.createElement('option')
        defaultOption.innerHTML ='Add Item'
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
                if(option.meat == item){
                    total += option.emission
                }
            })

        })
        setFootprint(total)
    }

    return (
        <div>
                <h3>What's in your meal? </h3>
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
