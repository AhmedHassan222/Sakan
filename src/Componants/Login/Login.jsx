import axios from "axios";
import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FilterProducts } from './../../Context/FilterProducts';
export default function Login() {
    let {language} = useContext(FilterProducts)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState('')
    const [errorList, setErrorList] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function getUserInfoLogin(e) {
        let _user = { ...user }
        _user[e.target.name] = e.target.value;
        setUser(_user)
    }
    function LoginValidator() {
        let schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
            password: Joi.string().required(),

        })
        return schema.validate(user, { abortEarly: false })
    }
    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/auth/signin`, user).then((response) => {
            localStorage.setItem('user', response.data.token);
            navigate("/");
        }).catch((x) => {
            // setError(error.response.data.Error)
            console.log(x)
            setIsLoading(false);
        })
    }
    function submitLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        let validation = LoginValidator()
        if (validation.error) {
            setIsLoading(false)
            setErrorList(validation.error.details)
            console.log(errorList)
        } else {
            sendData()

        }


    }








    return <>
        <Helmet>
            <title> {language == 'ع' ? "Login Page - Sakan " : " تسجيل الدخول - سكن "} </title>
        </Helmet>
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
            <form onSubmit={submitLogin} action="" className={`  p-4`}>
                <h3 className="mb-3 h4 ">  {language == 'ع' ? "Login " : " تسجيل الدخول"}</h3>
                <div className="form-group my-3">
                    <input onChange={getUserInfoLogin} name="email" type="text" placeholder={language == 'ع' ? "Email " : "البريد الاللكتروني "} className="w-100 p-2 " />
                </div>
                <div className="form-group my-3">
                    <input onChange={getUserInfoLogin} name="password" type="password" placeholder={language == 'ع' ? "Password " : " كلمة المرور"} className="w-100 p-2 " />
                </div>
                <div className=" mt-3">
                    {error ? <p className="text-danger">{error}</p> : ""}
                    <button type="submit" className="btn btn-primary rounded-0 w-100 "> {isLoading ? <div className="spinner-border " role="status">
                        <span className="visually-hidden  ">Loading...</span>
                    </div> : language == 'ع' ? "Login" :"دخول"}</button>
                </div>
                {errorList.length > 0 ? errorList.map((item, index) => <p key={index}>{item.message}</p>) : ""}
                
                {language == 'ع' ? <p className="mt-3">  I have not Accout <Link to={'/register'}> Create Accout</Link>  </p> :<p className="mt-3">ليس لدي حساب <Link to={'/register'}>انشاء حساب</Link>  </p>}
            </form>
        </div>
    </>
}