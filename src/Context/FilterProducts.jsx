import { createContext, useState } from "react"
export let FilterProducts = createContext(0)
function FilterProductsProvide(props) {
    const [price, setPrice] = useState(0);
    const [wordSearch, setWordSearch] = useState("");
    const [expired, setExpired] = useState(true)
    const [userData, setuserData] = useState(null)
    const [type, settype] = useState("home")
    const [language , setLanguage] = useState('Eng')



    return <FilterProducts.Provider value={{language , setLanguage, price, type, settype, userData, setuserData, expired, setExpired, wordSearch, setPrice, setWordSearch }}>
        {props.children}
    </FilterProducts.Provider>
}
export default FilterProductsProvide;