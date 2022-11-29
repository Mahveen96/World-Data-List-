import { countries } from "./countries.js"

const subtitle = document.querySelector('.subtitle')
const feedback = document.querySelector('.feedback')
const input = document.querySelector('input')
const wrapper = document.querySelector('.wrapper')
const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const btn3 = document.querySelector('.btn3')

// Setting up the subtitle text
subtitle.innerHTML = `Total Number of countries: ${countries.length}`

// Creating UI for appending Cards 
const countriesCardsUI = (name) => {
     return `    
        <div class="imageWrapper">
        <div class="image">
        <span class="text">${name}</span>
        </div>
        </div>`
}

// Rendering cards to the wrapper
const renderCards = (arr) => {
    let content = ''
    arr.forEach(card => (content += countriesCardsUI(card)))
    wrapper.innerHTML = content
}

// reversing countries array 
const reverseCountries = (arr) => {
    let countries = [...arr]
    let reverse = countries.reverse()
    return reverse
}

// filtering countries based on user input value
const filterCountries = (arr, search) => {
    let value = search.toLowerCase()
    const filteredCountries = arr.filter(country => {
        let name = country
        const nameStartsWithLetter = name.toLowerCase().startsWith(value)
        const nameContainingLetter = name.toLowerCase().includes(value) 
        if(btn1.classList.contains('active')) return nameStartsWithLetter
        if(btn2.classList.contains('active')) return nameContainingLetter
    })
    const resultedSearch = search === '' ? arr : filteredCountries
    return resultedSearch
}

// Setting Feedback content
const textForFeedback = () => {
    let value = input.value
    let count = value !== '' ? `${filterCountries(countries, value).length}` : ''
    let str1 = `Countries starts with <span class="word">${value}</span> are <span class="count">${count}</span>`
    let str2 = `Counrties containing <span class="word">${value}</span> are <span class="count">${count}</span>`
    if(btn1.classList.contains('active')) {
       feedback.innerHTML = str1
    } else if(btn2.classList.contains('active')) {
       feedback.innerHTML = str2
    }
}

// Taking input from the user
input.addEventListener('input', (e) => {
     textForFeedback()
     startingWord(countries)
     anyWord(countries)
     buttonOnActive()
})

// Search on starting word 
const startingWord = (arr) => {
    const searchCountry = arr.filter(country => {
        return country.toUpperCase().startsWith(input.value.toUpperCase(), 0)
    })
    if(btn3.innerHTML.includes('up')) {
        searchCountry.reverse()
    }
    renderCards(reverseCountries(searchCountry))
    renderCards(searchCountry)
   
}

// Search on any word
const anyWord = (arr) => {
    const searchCountry = arr.filter(country => {
        return country.toUpperCase().includes(input.value.toUpperCase())
    })
    if(btn3.innerHTML.includes('up')) {
        searchCountry.reverse()
    }
    renderCards(reverseCountries(searchCountry))
    renderCards(searchCountry)
} 

// setting button activity
const buttonOnActive = () => {
    if(btn1.classList.contains('active')) {
        startingWord(countries)
    } else if(btn2.classList.contains('active')) {
        anyWord(countries)
    }
}

// setting button 3 textContent on display
const showArrowUpOrDown = () => {
    if(btn3.innerHTML.includes('down')) {
        btn3.innerHTML = '<i class="fa-solid fa-arrow-up-a-z"></i>'
        btn3.classList.toggle('active')
        renderCards(reverseCountries(countries))
    } else if(btn3.innerHTML.includes('up')) {
        btn3.innerHTML = '<i class="fa-solid fa-arrow-down-a-z"></i>'
        btn3.classList.toggle('active')
        renderCards(countries)
    } 
}

// Adding activity to button 1 and 2
btn1.addEventListener('click', () => {
    input.value = ''
    feedback.innerHTML = ''
    btn2.classList.remove('active')
    btn3.classList.remove('active')
    btn1.classList.add('active')
    buttonOnActive()
})
btn2.addEventListener('click', () => {
    input.value = ''
    feedback.innerHTML = ''
    btn1.classList.remove('active')
    btn3.classList.remove('active')
    btn2.classList.add('active')
    buttonOnActive()
})

// Adding click event on btn3 to countries UI reverse or revert
btn3.addEventListener('click', () => {
    showArrowUpOrDown()
    if(btn1.classList.contains('active')) return startingWord(countries)
    if(btn2.classList.contains('active')) return anyWord(countries)
})

// On input focus 
input.addEventListener('focus', (e) => {
    input.value = ''
})

// On DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
    renderCards(countries)
    btn3.innerHTML = '<i class="fa-solid fa-arrow-down-a-z"></i>'
    btn1.classList.add('active')
})
