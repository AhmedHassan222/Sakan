import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { FilterProducts } from '../../Context/FilterProducts';

export default function Message() {
    let { userData, setMessages, messages, language } = useContext(FilterProducts)

    async function fetchMessages() {
        try {
            const { data } = await axios.get(
                `https://zunis-node-js.vercel.app/message/messageUser/${userData._id}`
            );
            setMessages(data.messages);
        } catch (error) {
        }
    }
    useEffect(() => {
        fetchMessages()
    }, [messages.length])
    return <>
        <div>
            <div className="container-message  container py-5">

                <section className="page-message p-5  messages">
                    <h3 className='mb-4'>{language === 'ع' ? "Messages box" : "  صندوق الرسائل "}</h3>
                    <div className="banner ">
                        {messages?.length > 0 ? (
                            messages.map((element) => {
                                return (
                                    <div className="card" key={element._id}>
                                        <div className="details">
                                            <p>
                                                {language === 'ع' ? <span>From: Admin</span>  : <span>من : المسؤل</span>}
                                                
                                            </p>
                                            <p>
                                            {language === 'ع' ? <span>contact US: 01123686114</span>  : <span>تواصل معنا : 01123686114</span>}
                                            
                                            </p>
                                            <p>
                                            {language === 'ع' ? <span>Message: {element.body}</span>  : <span>محتوي الرسالة : {element.body}</span>}
                                                
                                            </p>

                                        </div>
                                    </div>
                                );
                            })
                        ) :
                            <h4 className=''> {language === 'ع' ? "No Messages" : "السجل فارغ  "} </h4>
                        }
                    </div>
                </section>
            </div>

        </div>    </>
}
