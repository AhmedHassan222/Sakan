import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FilterProducts } from './../../Context/FilterProducts';
export default function Myzone() {
    //V A R I A B L E S >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let { language, element } = useContext(FilterProducts)
    let { status, id } = useParams();
    const [error, setError] = useState(null)
    const [propertyDesc, SetPropertyDesc] = useState({ size: 0, view: "", yearOfConstruction: 0, bathrooms: 0, bedrooms: 0, finishingType: "", shahrAqary: "", floor: 0 })
    const [item, setItem] = useState({ title: "", caption: " ", section: "", location: "", descLocation: "", PaymentMethod: "", image: [] })
    const [letters, setLetters] = useState(0)
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('')
    const [success, setSuccess] = useState(false)
    const [Faild, setFaild] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let [errorList, setErrorList] = useState([])
    const formDataToSend = new FormData();

    // formData.append('image', imageData, 'image.jpg');
    let navigate = useNavigate();
    // F U N C T I O N  TO   GET   OBJECT   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    function getItemSpecial(e) {
        let _propertyDesc = { ...propertyDesc };
        _propertyDesc[e.target.name] = e.target.value;

        SetPropertyDesc(_propertyDesc)
        console.log(_propertyDesc);
    }
    // handel images 
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };
    function getItem(e) {
        let _item = { ...item }
        if (e.target.name == 'title') {
            if (e.target.value.length <= 55) {
                setLetters(e.target.value.length)
                setValue(e.target.value.slice(0, e.target.value.length))
                _item[e.target.name] = e.target.value.slice(0, e.target.value.length)
            } else {
                setLetters(55)
                setValue(e.target.value.slice(0, 55))
                _item[e.target.name] = e.target.value.slice(0, 55)
            }
        } else {
            _item[e.target.name] = e.target.value;

        }
        setItem(_item)
        console.log(item)


    }
    function validateAddProduct() {
        let schema = Joi.object({
            image: Joi.array(),
            title: Joi.string().required(),
            caption: Joi.string().required(),
            price: Joi.number().required(),
            section: Joi.string().valid("rent", "sale").required(),
            location: Joi.string().required(),
            youtubeURL: Joi.string().optional(),
            descLocation: Joi.string().required(),
            rentDeatils: Joi.object({}).optional(),
            propertyDesc: Joi.object({
                size: Joi.number().positive().min(20).required(),
                view: Joi.string(),
                bedrooms: Joi.number().positive(),
                bathrooms: Joi.number().positive(),
                finishingType: Joi
                    .string()
                    .valid("super lux", "lux", "without finished", "Garden", "other"),
                yearOfConstruction: Joi.number().positive(),
                shahrAqary: Joi
                    .string()
                    .valid("registered", "eligible", "not sure")
                    .required(),
                floor: Joi.number().positive(),
            }),
            PaymentMethod: Joi
                .string()
                .valid("cash", "installments", "both")
                .required(),
        })
        return (schema.validate(item, propertyDesc, { abortEarly: false }))
    }
    async function sendData() {

        let response = await axios.post(`https://zunis-node-js.vercel.app/product/create?categoryId=${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": `Ahmed__${localStorage.getItem("user")}`
            },
        }).then((response) => {
            window.scroll(0, 0)
            setSuccess(true)
            navigate("/myad")
            console.log(response.data)
        }).catch((error) => {
            setError(error.message);
            setIsLoading(false)
            console.log(error.response.data);
        });
    }
    function submitForm(e) {
        e.preventDefault()
        setIsLoading(true)
        let validation = validateAddProduct()
        if (validation.error) {
            setIsLoading(false)
            setErrorList(validation.error.details)
        } else {
            setIsLoading(false)
            images.forEach((image, index) => {
                // console.log(image);
                formDataToSend.append(`image`, image);
            });
            formDataToSend.append('title', item.title);
            formDataToSend.append('caption', item.caption);
            formDataToSend.append('price', item.price);
            formDataToSend.append('section', item.section);
            formDataToSend.append('location', item.location);
            formDataToSend.append('descLocation', item.descLocation);
            formDataToSend.append('PaymentMethod', item.PaymentMethod);
            images.forEach((image, index) => {
                formDataToSend.append(`image`, image);
            });
            for (const key in propertyDesc) {
                formDataToSend.append(`propertyDesc[${key}]`, propertyDesc[key]);
            }

            console.log(formDataToSend);
            console.log((typeof item.image));


            sendData();

        }
    }
    useEffect(() => {
        if (element != null) {
            console.log(element)
            setItem({ title: element.title, caption: element.caption, section: element.section, location: element.location, descLocation: element.desLocation, PaymentMethod: element.PaymentMethod, image: element.Images[0].secure_url })
            SetPropertyDesc({ size: element.propertyDesc.size, view: element.propertyDesc.view, yearOfConstruction: element.propertyDesc.yearOfConstruction, bathrooms: element.propertyDesc.bathrooms, bedrooms: element.propertyDesc.bedrooms, finishingType: element.propertyDesc.finishingType, shahrAqary: element.propertyDesc.shahrAqary, floor: element.propertyDesc.floor })
        } else {
            SetPropertyDesc(propertyDesc)
            setItem(item)
        }
    }, [])

    // function Update 
    async function Update(){
        // code for update here
    }
    // R E N D E R     C O D E   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return <>
        <Helmet>
            {language == 'ع' ? "My zone - Sakan " : "منطقتي - سكن"}

        </Helmet>
        <div className="container py-5">

            <div className={`  my-5  `}>
                <div className=" ">
                    <form onSubmit={submitForm} className={`w-100 p-5 border-0`} action="" encType='multibart/form-data'>
                        <div className="form-group my-4">
                            <label htmlFor="file" className="mb-3"> {language == 'ع' ? "Select images" : "اختر مجموعة صور"}</label>
                            <input multiple onChange={handleImageChange} id="file" type="file" className="w-100 p-2 " name='image' />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="section" className="mb-3">  {language == 'ع' ? "Select Process*" : "اختار العملية *"} </label>
                            <select onChange={getItem} name="section" id="section" className=" w-100 p-2 " value={item.section}>
                                <option value="">...</option>
                                <option value="rent">  {language == 'ع' ? "For Rent" : "للايجار"}</option>
                                <option value="sale"> {language == 'ع' ? "For Sale" : "للبيع"}</option>
                            </select>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="title" className="mb-3"> {language == 'ع' ? "Add Title*" : "اضف عنوانا للاعلان *"}</label>
                            <input onChange={getItem} id="title" type="text" className="w-100 p-2  " value={item.title} name='title'/>
                            <div className="text-start pt-2">{language == 'ع' ? `${letters}/55 letters ` : `${letters} / 55 حرف `}</div>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="price" className="mb-3"> {language == 'ع' ? "Add price in EGP*" : "اضف السعر بالجنية المصري *"}</label>
                            <input onChange={getItem} id="price" type="text" className="w-100 p-2  " name='price' value={propertyDesc.price}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="caption" className="mb-3">   {language == 'ع' ? "Describe property*" : " وصف العقار *"}</label>
                            <textarea rows={5} onChange={getItem} id="caption" type="text" className="w-100 p-2  " name='caption' value={item.caption} />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="city" className="mb-3">  {language == 'ع' ? "City*" : "المحافظة *"}</label>
                            <input onChange={getItem} id="city" type="text" className="w-100 p-2  " name='location' value={item.location} />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="desLocation" className="mb-3">   {language == 'ع' ? "Address in details*" : "العنوان بالتفاصيل  *"}</label>
                            <input onChange={getItem} id="desLocation" type="text" className="w-100 p-2  " name='descLocation' />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="size" className="mb-3">   {language == 'ع' ? "Size of property*" : " مساحة العقار بالمتر المربع *"}</label>
                            <input onChange={getItemSpecial} id="size" type="number" className="w-100 p-2  " name='size' value={propertyDesc.size} />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="view" className="mb-3">    {language == 'ع' ? "View" : " الاطلالة (علي ماذا يطل العقار؟)"}  </label>
                            <input onChange={getItemSpecial} id="view" type="text" className="w-100 p-2  " name='view' value={propertyDesc.view} />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="yearsOfConstruction" className="mb-3">      {language == 'ع' ? "Year of Property" : "مباني سنة "} </label>
                            <input onChange={getItemSpecial} id="yearsOfConstruction" type="number" placeholder="مثال : 2002" className="w-100 p-2  " name='yearOfConstruction' value={propertyDesc.yearOfConstruction}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="bathroom" className="mb-3">{language == 'ع' ? "Numbers of Bathrooms" : " عدد الحمامات "}</label>
                            <input onChange={getItemSpecial} id="bathroom" type="number" min={1} className="w-100 p-2  " name='bathrooms' value={propertyDesc.bathrooms}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="bedroom" className="mb-3">  {language == 'ع' ? "Numbers of Bedrooms" : "عدد الغرف "}</label>
                            <input onChange={getItemSpecial} id="bedroom" type="number" min={1} className="w-100 p-2  " name='bedrooms' value={propertyDesc.bedrooms}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="floor" className="mb-3">  {language == 'ع' ? "Floor" : "الدور"} </label>
                            <input onChange={getItemSpecial} id="floor" type="number" min={1} className="w-100 p-2  " name='floor' value={propertyDesc.floor}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="finishingType" className="mb-3"> {language == 'ع' ? "Type of Finishing" : "نوع التشطيب "}</label>
                            <select onChange={getItemSpecial} name="finishingType" id="finishingType" className=" w-100 p-2 " value={propertyDesc.finishingType}>
                                <option value="">...</option>
                                <option value="super lux"> {language == 'ع' ? "Super Lux" : "سوبر لوكس "}</option>
                                <option value="lux"> {language == 'ع' ? "Lux" : "لوكس"}</option>
                                <option value="without finished"> {language == 'ع' ? "Witout finished" : "لم ينتهي بعد "}</option>
                                <option value="Garden"> {language == 'ع' ? "Garden" : "حدايق"}</option>
                            </select>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="shahrAqary" className="mb-3">   {language == 'ع' ? "Sharh Aqary*" : "التسجيل في الشهر العقاري *"}</label>
                            <select onChange={getItemSpecial} name="shahrAqary" id="shahrAqary" className=" w-100 p-2 " value={propertyDesc.shahrAqary}>
                                <option value="">...</option>
                                <option value="registered"> {language == 'ع' ? "Registered" : "مسجلة"}</option>
                                <option value="eligible"> {language == 'ع' ? "Eligible" : "صالحة"}</option>
                                <option value="not sure">  {language == 'ع' ? "Not Sure" : "غير متأكد "}</option>
                            </select>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="PaymentMethod" className="mb-3">   {language == 'ع' ? "Payment Method*" : "طرق الدفع *"}</label>
                            <select onChange={getItem} name="PaymentMethod" id="PaymentMethod" className=" w-100 p-2" value={item.PaymentMethod}>
                                <option value="">...</option>
                                <option value="cash">{language == 'ع' ? "Cash" : "الدفع نقدا "}</option>
                                <option value="installments">{language == 'ع' ? "Installments" : "الدفع بالتقسيط "}</option>
                                <option value="both">  {language == 'ع' ? "Both" : "كلاهما"}</option>
                            </select>
                        </div>
                        <div className=" p-2 d-flex justify-content-end">
                            {element != null ? <button type="submit" className="btn btn-primary ">  {isLoading ? <div className="spinner-border " role="status">
                                <span className="visually-hidden  ">Loading...</span>
                            </div> : language == 'ع' ? "Update" : "تعديل"} </button> : <button type="submit" className="btn btn-primary ">  {isLoading ? <div className="spinner-border " role="status">
                                <span className="visually-hidden  ">Loading...</span>
                            </div> : language == 'ع' ? "Add" : "اضف"} </button>}
                        </div>

                        <h3 className="h5 text-danger py-4 ">{error}</h3>

                        {errorList.length > 0 ? <ul>
                            {errorList.map((item, index) => <li className="text-danger" key={index}>{item.message}</li>)}
                        </ul> : ""}
                        {error ? <h3 className="text-danger">{error}</h3> : ''}
                    </form>
                </div>

            </div>
            <div className="my-3">
                <h3> {language == 'ع' ? "Advices for your ads will be accepted" : "نصائح لقبول اعلانك "}</h3>
                <ul className="py-3">
                    <li className="py-1"> {language == 'ع' ? "Add clear Title." : "اضف عنوانا واضحا."}</li>
                    <li className="py-1"> {language == 'ع' ? "Add at least 3 images with good resolution" : "اضف علي الاقل 3 صور ذات جودات مرتفعة و واضحة."}</li>
                    <li className="py-1">  {language == 'ع' ? "Fill all Inputs with fact data." : "املء جميع الحقول ببيانات حقيقة."} </li>
                </ul>
            </div>
        </div>



    </>
}