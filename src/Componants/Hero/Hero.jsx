import { useContext, useEffect, useState } from "react"
import heroImage from "../../assets/images/background.jpg"
import style from "./Hero.module.css"
import { useNavigate } from "react-router-dom";
import { FilterProducts } from "../../Context/FilterProducts";
import Joi from 'joi';

export default function Hero() {
    let { price, wordSearch, type, settype, setPrice, setWordSearch, language } = useContext(FilterProducts)
    let navigate = useNavigate();
    const [status, setStatus] = useState('rent')
    const [error, setError] = useState(null);
    const schema = Joi.object().keys({
        wordSearch: Joi.string().required(),
        price: Joi.string().valid('1000000', '2000000', '3000000', '4000000', '5000000', '6000000').required(),
    });
    useEffect(() => {
        setPrice(0)
        setWordSearch("")
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const { error } = schema.validate({ wordSearch, price }, { abortEarly: false });
        if (error === null) // Go 
        {
            setError(null);
            navigate('/filter')
        } else // no
        {
            setError(error.details[0].message);
        }
    };
    return <>
        <header  style={{ backgroundImage: `URL(${heroImage}) ` }}>
            <div className={`${style.layer} vh-100 d-flex align-items-center pt-5 `}>

                <form onSubmit={handleSubmit} className={`  shadow-none     container ${style.customsWidth}  `}>
                    <div className="d-flex mb-3 ">
                        <button onClick={() => { setStatus('rent') }} className={`btn  bg-white ${style.btn1} ${status === 'rent' ? style.btn2 : ''}  py-3 px-5 mb-1 border-0 rounded-0`}>{language === 'ع' ? `Rent` : `إيجار`}</button>
                        <button onClick={() => { setStatus('buy') }} className={`btn  bg-white ${style.btn1} ${status === 'buy' ? style.btn2 : ''} py-3 me-1 px-5 mb-1 border-0 rounded-0`}> {language === 'ع' ? `Buy` : `شراء`}</button>
                    </div>
                    <div className="bg-white row  g-3 p-4 ">
                        <div className="col-sm-12  col-md-6 col-lg-3 ">
                            <div className="form-group     ">
                                <input value={wordSearch} onChange={(e) => { setWordSearch(e.target.value) }} type="text" placeholder={language === 'ع' ? `Search by Location` : `البحث بواسطة العنوان`} className={` w-100 rounded-0 ${style.pad} p-3`} />
                            </div>

                        </div>
                        <div className={`col-sm-12  col-md-6 col-lg-3   `}>
                            <select
                                name="type"
                                className="p-3 w-100 border-1 rounded-0  "
                                onChange={(e) => {
                                    settype(e.target.value);
                                }}
                                value={type}
                            >

                                <option value={"home"}>


                                    {language === 'ع' ? `Homes` : `منازل`}

                                </option>
                                <option value={"appartment"}>


                                    {language === 'ع' ? `Appartments` : `شقق`}

                                </option>
                                <option value={"land"}>


                                    {language === 'ع' ? `Lands` : `اراضي`}

                                </option>
                            </select>
                        </div>
                        <div className={`col-sm-12  col-md-6 col-lg-3  `}>
                            <select
                                name="price"
                                className="p-3 w-100  rounded-0  "
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                value={price}
                            >
                                <option value={"....."}>
                                    {language === 'ع' ? `Price in EGP` : `السعر (ج.م)`}
                                </option>
                                <option value={"1000000"}>
                                    {language === 'ع' ? "less than 1 million " : "  اقل من مليون جنية"}
                                </option>
                                <option value={"2000000"}>
                                    {language === 'ع' ? "less than 2 millions " : "  اقل من 2 مليون جنية"}
                                </option>
                                <option value={"3000000"}>
                                    {language === 'ع' ? "less than 3 millions " : "  اقل من 3 مليون جنية"}
                                </option>
                                <option value={"4000000"}>
                                    {language === 'ع' ? "less than 4 millions " : "  اقل من 4 مليون جنية"}
                                </option>
                                <option value={"5000000"}>
                                    {language === 'ع' ? "less than 5 millions " : "  اقل من 5 مليون جنية"}
                                </option>
                                <option value={"6000000"}>
                                    {language === 'ع' ? "less than 6 millions " : "  اقل من 6 مليون جنية"}
                                </option>
                            </select>
                        </div>
                        <div className="col-sm-12   col-md-6 col-lg-3 ">
                            <button type="submit" className={`border-0 text-white rounded-0 w-100 p-3  ${style.color} ${style.pad}`} >  {language === 'ع' ? "Search Now " : " ابحث الان"}</button>

                        </div>
                        {error !== "" && error === `"wordSearch" is not allowed to be empty` ? <p className="text-danger p-3">  {language === 'ع' ? "You must Enter Location " : "يجب ادخال مكان البحث"}</p> : ""}
                        {error !== "" && error === `"price" must be one of [1000000, 2000000, 3000000, 4000000, 5000000, 6000000]` ? <p className="text-danger py-2">  {language === 'ع' ? "You must select from this price menu" : " يجب اختيار قيمة من القائمة الاسعر"}</p> : ""}

                    </div>



                </form>
            </div>
        </header>
    </>
}