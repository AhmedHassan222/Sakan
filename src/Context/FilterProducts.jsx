import { createContext, useEffect, useState } from "react"
export let FilterProducts = createContext(0)
function FilterProductsProvide(props) {
    const [price, setPrice] = useState(0);
    const [wordSearch, setWordSearch] = useState("");
    const [expired, setExpired] = useState(true)
    const [userData, setuserData] = useState(null)
    const [type, settype] = useState("home")
    const [element, setElement] = useState(null)

    function typeLanguage(){
        return localStorage.getItem('language') != null ? localStorage.getItem('language') : ('ع')
    }

    const [language , setLanguage] = useState(typeLanguage())

    useEffect(()=>{
        localStorage.setItem('language',language)
    },[language])



    return <FilterProducts.Provider value={{element, setElement , language , setLanguage, price, type, settype, userData, setuserData, expired, setExpired, wordSearch, setPrice, setWordSearch }}>
        {props.children}
    </FilterProducts.Provider>
}
export default FilterProductsProvide;