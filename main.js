const carForm = document.querySelector('.input-form')
const outputForm = document.querySelector('.output-form')

const resetButton = document.querySelector('#reset')
const fullResetButton = document.querySelector('#fullReset')

const searchButton = document.querySelector('#search-button')
const addButton = document.querySelector('#add-button')


const outputTable = document.querySelector('#output-table')
const licenceInput = carForm['licence']
const makerInput = carForm['maker']
const modelInput = carForm['model']
const ownerInput = carForm['owner']
const priceInput = carForm['price']
const colorInput = carForm['color']


const cars = JSON.parse(localStorage.getItem('cars')) || []

function addCar(licence, maker, model, owner, price, color) {

    cars.push({
        licence,
        maker,
        model,
        owner,
        price,
        color
    })

    localStorage.setItem('cars', JSON.stringify(cars))

    return { licence, maker, model, owner, price, color }
}



function createCarRow({ licence, maker, model, owner, price, color }) {

    let row = 1

    let newRow = outputTable.insertRow(row)

    let cell1 = newRow.insertCell(0)
    let cell2 = newRow.insertCell(1)
    let cell3 = newRow.insertCell(2)
    let cell4 = newRow.insertCell(3)
    let cell5 = newRow.insertCell(4)
    let cell6 = newRow.insertCell(5)
    let cell7 = newRow.insertCell(6)
    let cell8 = newRow.insertCell(6)
    let cell9 = newRow.insertCell(6)


    let carDiscount = {
        discountPercentage() {
            if (price > 20000) {
                percentage = 25
            }
            else if (price >= 5000 && price <= 20000) {
                percentage = 15
            }
            else if (price < 5000) {
                percentage = 10
            }

            return percentage
        }
    }

    let carDiscountAmount = {
        discountAmount() {
            if (price > 20000) {
                amount = (price * 0.25).toFixed(2)
            }
            else if (price >= 5000 && price <= 20000) {
                amount = (price * 0.15).toFixed(2)
            }
            else if (price < 5000) {
                amount = (price * 0.10).toFixed(2)
            }

            return amount
        }
    }

    let carDiscountedPrice = {
        discountedPrice() {
            if (price > 20000) {
                newPrice = (price * 0.75).toFixed(2)
            }
            else if (price >= 5000 && price <= 20000) {
                newPrice = (price * 0.85).toFixed(2)
            }
            else if (price < 5000) {
                newPrice = (price * 0.9).toFixed(2)
            }

            return newPrice
        }
    }

    cell1.innerText = licence
    cell2.innerText = maker
    cell3.innerText = model
    cell4.innerText = owner
    cell5.innerText = `${price} €`
    cell6.innerText = color
    cell9.innerText = `${carDiscount.discountPercentage()} %`
    cell8.innerText = `-${carDiscountAmount.discountAmount()} €`
    cell7.innerText = `${carDiscountedPrice.discountedPrice()} €`

}

cars.forEach(createCarRow)


carForm.onsubmit = (e) => {
    e.preventDefault()

    let newCar = addCar(
        licenceInput.value,
        makerInput.value,
        modelInput.value,
        ownerInput.value,
        priceInput.value,
        colorInput.value
    )

    createCarRow(newCar)

    licenceInput.value = ''
    makerInput.value = ''
    modelInput.value = ''
    ownerInput.value = ''
    priceInput.value = ''
    colorInput.value = ''
}


resetButton.addEventListener('click', () => {
    window.location.reload()
})

fullResetButton.addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()
})



outputForm.onsubmit = (e) => {
    e.preventDefault()

    let filter = document.getElementById('search-box').value.toUpperCase()

    let tr = document.getElementsByTagName('tr')

    for (let i = 0; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName('td')[0]
        if (td) {

            let textvalue = td.textContent || td.innerHTML
            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                tr[0].style.display = ''
                tr[i].style.display = ''
            }

            else {
                tr[0].style.display = ''
                tr[i].style.display = 'none'
            }

        }

    }

}

const inputValues = [];

function checkInput(event) {
    const inputValue = event.target.value;
    if (inputValues.includes(inputValue)) {
        event.target.value = "";
        alert("You already regitered this licence");
    } else {
        inputValues.push(inputValue);
    }
}
