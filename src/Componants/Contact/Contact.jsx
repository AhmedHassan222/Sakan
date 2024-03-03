import React, { useContext } from "react";
import style from "./Contact.module.css"
import contactImage from "../../assets/images/contactImage.jfif"
import { Helmet } from "react-helmet";
import { FilterProducts } from './../../Context/FilterProducts';

function Contacts() {
    let { language } = useContext(FilterProducts)
    return (
        <>
            <Helmet>
                <title>    {language == 'ع' ? "Contact us - sakan" : "تواصل معنا - سكن"}</title>
            </Helmet>
            <div className={`w-100 vh-100 ${style.background} d-flex pt-5 `} style={{ backgroundImage: `URL(${contactImage})` }}>
                <div className="p-5">
                    <h3 className="h1 fw-bold">  {language == 'ع' ? "contact Us" : " تواصل معنا   "}</h3>
                    <p className="h3"> {language == 'ع' ? "For any Question" : "   لاي سؤال   "} </p>
                </div>
            </div>
            <div className={`${style.bgContact} `}>
                <div className="container ">

                    <div className="row ">
                        <div className="col-md-6 py-4">
                            <h3 className="text-light h2 mb-5">
                                {language =='ع'?"Fore more details":"لمزيد من المعلومات"}
                            </h3>
                            <div>
                                <h4 className="text-info">  {language =='ع'?"Email  ":" الالكتروني البريد"}</h4>
                                <h5 className="mb-2 text-light">Sakan@house.com</h5>
                                <h4 className="text-info">  {language =='ع'?"phone  ":" الهاتف "}</h4>
                                <h5 className="text-light">+2011577954437</h5>
                                <h5 className="text-light">+2012788445537</h5>
                                <h4 className="text-info">   {language =='ع'?"Address  ":" العنوان "}</h4>
                                <h5 className="mb-2 text-light">  {language =='ع'?"Tanta, Egypt  ":"   مصر , طنطا"}</h5>
                                <div className="socail-media my-4">
                                    <h3 className="text-light"> {language =='ع'?"Social media  ":" مواقع التواصل الاجتماعي  "}</h3>
                                    <div className="d-flex mt-3 align-items-center justify-content-start ">
                                        <i className="fa-brands fa-facebook text-primary fs-5 text-white "></i>
                                        <i class="fa-brands fa-instagram text-primary fs-5 text-white mx-3"></i>
                                        <i class="fa-brands fa-twitter text-primary fs-5 text-white "></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className={`${style.bgLayer} p-5`}>
                                <form className="bg-white  shadow-none w-100 p-4 pb-5" action="https://formspree.io/f/mleqnbkn" method="POST">
                                    <h3 className="mb-4"> {language == 'ع'?"What do you want?  ":" ماذا تريد ان تساءل؟  "}</h3>
                                    <div className="form-group ">
                                        <input required type="text" placeholder={language == 'ع'?"Full Name  ":"    الاسم بالكامل  "} className={`w-100 p-2 ${style.inputContact}`} name="Name" />
                                    </div>
                                    <div className="form-group my-3">
                                        <input required type="text" placeholder={language == 'ع'?"Email  ":" البريد الالكتروني      "} className={`w-100 p-2 ${style.inputContact}`} name="Email" />

                                    </div>
                                    <div className="form-group ">
                                        <textarea required name="Subject" className={`w-100 p-2 ${style.inputContact}`} placeholder={language == 'ع'?"Message  ":"     رسالة  "} id="" cols="30" rows="5"></textarea>
                                    </div>
                                    <button className={` mt-5 ${style.btnContact} rounded-0  w-100  mb-5 border-0 p-3  text-white`}>  {language == 'ع'?"Send now  ":"   ارسل الان   "}</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <iframe className="border-0 w-100 vh-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.2011195004666!2d31.00483886028718!3d30.796993774659196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c951c828d9a3%3A0x1442acda87525e4f!2z2LfZhti32Kcg2KfZhNi62LHYqNmK2Yc!5e0!3m2!1sar!2seg!4v1708955936387!5m2!1sar!2seg" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </>
    );
}

export default Contacts;
