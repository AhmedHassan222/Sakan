import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FilterProducts } from './../../Context/FilterProducts';
import Joi from "joi"
import axios from "axios";

function Contacts() {
    let { language } = useContext(FilterProducts)
    let [errorList, setErrorList] = useState([])
    const [error, setError] = useState('')
    const [reMessage, setmessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const [messageData, setmessageData] = useState(
        {
            fullName: "",
            email: "",
            phone: "",
            message: "",
        }
    )
    // set interval 
    useEffect(() => {
        if (reMessage) {
            const timeoutId = setTimeout(() => {
                setmessage('');
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [reMessage]);

    function getmessageData(e) {
        let _messageData = { ...messageData }
        _messageData[e.target.name] = e.target.value;
        setmessageData(_messageData)
        console.log(messageData)
    }
    function validateRegister() {
        let schema = Joi.object({
            fullName: Joi.string().required().min(3).max(50),
            message: Joi.string().required().min(10).max(50),

            email: Joi
                .string()
                .email({ tlds: { allow: ["com", "net"] } })
                .required(),
            phone: Joi.string().regex(/^(?:\+?20|0)(?:1\d{9}|7\d{8}|8\d{8}|9\d{8})$/),

        })
        return (schema.validate(messageData, { abortEarly: false }))
    }
    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/message/messageToAdmin`, messageData,

            {
                "Content-Type": "application/json",
            },
        ).then((response) => {
            console.log(response.data)
            setmessage(response.data?.message)
            setIsLoading(false)
            setmessageData({
                fullName: "",
                email: "",
                phone: "",
                message: "",
            })
        }).catch((error) => {
            console.log(error.response.data.Error);
            setError(error.response.data?.Error);
            setIsLoading(false)

        });
    }
    function submitForm(e) {
        e.preventDefault()
        setIsLoading(true)
        setmessage("")
        setError("");


        let validation = validateRegister()
        if (validation.error) {
            setIsLoading(false)
            setmessage("")
            setError("");


            setErrorList(validation.error.details)
        } else {
            console.log('true')
            sendData()
        }
    }

    return (
        <>
            <Helmet>
                <title>    {language === 'ع' ? "Contact us - sakan" : "تواصل معنا - سكن"}</title>
            </Helmet>
            <div className="py-5">
                <div className="container py-5 ">

                    <div className="row justify-content-center ">
                        <div className="col-md-6    ">
                            <form onSubmit={submitForm} action="" className=" w-100 px-3 py-5">
                                {errorList.length > 0 ? <ul>
                                    {errorList.map((item, index) => <li className="text-danger" key={index}>{item.message}</li>)}

                                </ul> : ""}
                                <div className={` px-md-5 pt-3   px-sm-2  `}>

                                    <h3 className="mb-4"> {language === 'ع' ? "Send Message  " : " ارسال رسالة  "}</h3>
                                    <div className="form-group ">
                                        <input onChange={getmessageData} value={messageData.fullName} name="fullName" required type="text" placeholder={language === 'ع' ? "Full Name  " : "    الاسم بالكامل  "} className={`w-100 p-2 `} />
                                    </div>
                                    <div className="form-group my-3">
                                        <input onChange={getmessageData} value={messageData.email} name="email" required type="email" placeholder={language === 'ع' ? "Email  " : " البريد الالكتروني      "} className={`w-100 p-2 `} />

                                    </div>
                                    <div className="form-group my-3">
                                        <input onChange={getmessageData} value={messageData.phone} name="phone" required type="Number" placeholder={language === 'ع' ? "Phone  " : " رقم الهاتف     "} className={`w-100 p-2 `} />
                                    </div>
                                    <div className="form-group ">
                                        <textarea onChange={getmessageData} value={messageData.message} name="message" required className={`w-100 p-2 `} placeholder={language === 'ع' ? "Message  " : "     رسالة  "} id="" cols="30" rows="5"></textarea>
                                    </div>
                                    {error ? <p className="text-danger">{error}</p> : ""}
                                    {reMessage ? <p className="text-success h4 fw-bolder  ">{reMessage}</p> : ""}

                                    <button className={` w-100 mt-3 p-2  btn btn-outline-primary`}> {isLoading ? <div className="spinner-border " role="status">
                                        <span className="visually-hidden  ">Loading...</span>
                                    </div> : language === 'ع' ? "Send now  " : "   ارسل الان   "}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contacts;
