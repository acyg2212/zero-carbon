import React, {useState} from 'react';

const RestaurantRanker = () => {
    const [count, setCount] = useState(2)
    const options = ["Beef", "Chicken", "Pork", "Lamb", "Fish", "Tofu", "Eggs"]
    const [newOptions, setNewOptions] = useState(options)

    const addItem = e => {

        e.preventDefault()
        const addSelect = document.createElement('select');
        addSelect.id = `item${count}`
        addSelect.name = `item${count}`
        addSelect.className = 'selection'
        addSelect.onchange = function(){editOptions()}
        const select = document.getElementsByClassName('addSelect')[0]
        select.appendChild(addSelect)

        newOptions.forEach(option => {
            const addOption = document.createElement("option")
            addOption.value = option
            addOption.innerHTML = option
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
            if (!selected.includes(item)) {
                temp.push(item)
            }
        })
        setNewOptions(temp)
    }

    return (
        <div>
            <form>
                <h3>What's in your meal? </h3>
                <label for='item1'>Item 1</label>
                <div className='addSelect'>
                    <select onChange={editOptions} className='selection' name='item1' id='item1'>
                        {options.map((option, idx) => (
                            <option key={idx}>{option}</option>
                        ))}
                    </select>
                </div>
                <button onClick={addItem}><h3>Add item</h3></button>
            </form>
        </div>
    )
}

export default RestaurantRanker;
