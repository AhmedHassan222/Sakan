import { Link } from "react-router-dom"
import style from "../../Componants/GetProduts/GetProducts.module.css"
import { useContext, useEffect, useState } from "react";
import { FilterProducts } from './../../Context/FilterProducts';
import axios from "axios";
import fakeImage from "../../assets/images/Annotation 2024-02-21 205940.png"

export default function MyAd() {

    const [myAdv, setAdv] = useState([]);
    let { setExpired, expired, userData, setuserData, language } = useContext(FilterProducts)
    console.log(userData);

    async function getMyAdv() {
        try {
            let { data } = await axios.get(`https://zunis-node-js.vercel.app/product/?createdBy=${userData._id}`)
            setAdv(data.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyAdv()
        console.log(myAdv);
    }, [])






    return <>




        <div className="container py-5 ">
            {myAdv.length <= 0 ? <h3>  {language == 'ع' ? "No Ads yet" : "لا توج اعلانات مضافة"}</h3> :
                <div className="row py-5">
                    {myAdv?.map((item, index) => <div key={index} className={`col-sm-12 col-md-4 col-lg-4 ${style.box2} p-4`} >
                        <Link to={`/productdetails/${item.categoryId.slug}/${item._id}`}>
                            <div className={`${style.boxImage}`}>
                                <img src={item.Images[0].secure_url} className="  w-100 " alt="" />
                            </div>
                        </Link>
                        <div >
                            <h3 className=" fw-bold mt-4 ">
                                {language == 'ع' ? `${item.price} EGP` : `${item.price} ج.م`}
                            </h3>
                            <p className="fw-bold fs-5">{item.title.slice(0, 55)}  </p>
                            <div className="d-flex">
                                <div className="d-flex">
                                    <i className="fa-solid fa-bed  mx-2"></i>
                                    <p className="fw-bold">{item.propertyDesc.bedrooms} </p>
                                </div>
                                <div className="d-flex">
                                    <i className="fa-solid fa-toilet mx-2 "></i>
                                    <p className="fw-bold">{item.propertyDesc.bathrooms}</p>
                                </div>
                            </div>
                            <p className="">
                                {language == 'ع' ? `Area: ${item.propertyDesc.size} m2` : `المساحة: ${item.propertyDesc.size} متر مربع `}

                            </p>

                            <div className="d-flex ">
                                <i className="fa-solid fa-location-dot ms-2 "></i>
                                <p className="">{item.location}</p>
                            </div>
                            <div className="d-flex">
                                <Link to={`/productdetails/${item.categoryId.slug}/${item._id}`}>
                                    <button className={` px-4 py-2 fw-bold m-2  rounded-1 ${style.contactButton} `}>

                                        {language == 'ع' ? `details` : 'التفاصيل'}
                                    </button>
                                </Link>
                                <button type="button" className={` px-4 py-2 fw-bold m-2  rounded-1 ${style.contactButton} mx-2`} data-bs-toggle="modal" data-bs-target="#exampleModal">

                                    {language == 'ع' ? `Phone` : 'اتصل'}
                                </button>
                                <button type="button" className={` px-4 py-2 fw-bold  m-2 rounded-1 ${style.contactButton} mx-2`} data-bs-toggle="modal" data-bs-target="#exampleModal">

                                    {language == 'ع' ? `Mail` : 'الايميل'}
                                </button>

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>
                                                    {language == 'ع' ? ` Phone : ${item.createdBy.phoneNumber}` : `رقم الهاتف: ${item.createdBy.phoneNumber}`}
                                                </p>
                                                <p>
                                                    {language == 'ع' ? `Email : ${item.createdBy.email}` : `البريد الالكتروني : ${item.createdBy.email}`}


                                                </p>
                                            </div>
                                            <div className="modal-footer">
                                                <a href={`mailto:${item.createdBy.email}?subject=Subject line`}>
                                                    <button type="button" className={` px-4 py-2 fw-bold  rounded-1 ${style.contactButton} mx-2`}>
                                                        {language == 'ع' ? `Send Messange` : `ارسل رسالة`}

                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>)}
                </div>}
        </div>



        <div className=" d-flex justify-content-center my-5">
            <Link className="d-flex justify-content-center nav-link my-4" to={`/myzone/addProduct/65d8c2138bfd8107356010e2`}>
                <button className={` px-4 py-2 fw-bold  rounded-1 ${style.contactButton} mx-2`}>  {language == 'ع' ? "Add Appartment" : "اضف شقة"}</button>
            </Link>
            <Link className="d-flex justify-content-center nav-link my-4 mx-2" to={`/myzone/addProduct/65d8c1c01269fe7a10558011`}>
                <button className={` px-4 py-2 fw-bold  rounded-1 ${style.contactButton} mx-2`}> {language == 'ع' ? "Add Home" : "اضف بيت"}</button>
            </Link>
            <Link className="d-flex justify-content-center nav-link my-4" to={`/myzone/addProduct/65d8c23b1269fe7a1055818b`}>
                <button className={` px-4 py-2 fw-bold  rounded-1 ${style.contactButton} mx-2`}>   {language == 'ع' ? "Add Land" : "اضفة قطعة ارض"}</button>
            </Link>
        </div>
    </>
}