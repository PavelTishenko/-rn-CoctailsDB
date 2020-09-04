import axios from 'axios'

const coctail = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
const categories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
const MFS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake'
const cocoa = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa'

export const getFilterData = async(coctails) => {
    return await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${coctails}`)
}

export const getCategories = async() => {
    return await axios.get(categories)
} 

export const getCocteils = async() => {
    return await axios.get(coctail)
}

export const getMFS = async() => {
    return await axios.get(MFS)
}

export const getCocoa = async() => {
    return await axios.get(cocoa)
}