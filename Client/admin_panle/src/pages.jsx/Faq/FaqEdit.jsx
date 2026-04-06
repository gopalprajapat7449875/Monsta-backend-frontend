import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Editfaq() {
    let navigete = useNavigate()
    const [faqdata, setfaqdata] = useState([])
    let apibaseurl = import.meta.env.VITE_APIBASEURL
    let { _id } = useParams()
    let EditFaq = (e) => {

        e.preventDefault()
        let obj = {
            _FaqQuestion: e.target._Question.value,
            _FaqAnswer: e.target._Answer.value,
            _FaqOrder: e.target._Order.value,
            _FaqStatus: e.target._Status.value,

        }
        axios.put(`${apibaseurl}faq/update/${_id}`, obj)
            .then((res) => res.data)
            .then((finalres) => {

                if (finalres._status) {

                    toast.success(finalres._Message)
                    setTimeout(() => {
                        navigete('/faq/view_faq')
                    }, 2000)

                    e.target.reset()

                }

                else {
                    if ((finalres.erre)) {
                        finalres.erre.forEach((item) => {
                            Object.values(item).forEach((msg) => {
                                toast.error(msg);
                            });
                        });
                    }


                    else {

                        toast.error(finalres._Message)
                    }
                }
            })
    }

    useEffect(() => {
        axios.get(`${apibaseurl}faq/updateview/${_id}`)
            .then((res) => {
                setfaqdata((res.data.updatedata))
            })
    }, [_id])
    return (
        <>
            <ToastContainer />
            <div className=' w-5xl mx-auto min-h-[88vh]'>
                <h2 className='ps-3 py-2'>Home/Faq/UpdateFaq</h2>

                <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
                    <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Update Faq</h2>  </div>
                    <div className=''>


                        <form action="submit" onSubmit={EditFaq}>
                            <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                <label htmlFor="Name" > Question </label>
                                <textarea type="text" defaultValue={faqdata._FaqQuestion} name='_Question' placeholder='Enter Question ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                            </div>
                            <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                <label htmlFor="Name" > Answer </label>
                                <textarea type="text" defaultValue={faqdata._FaqAnswer} name='_Answer' placeholder='Enter Answer ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                            </div>

                            <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                <label htmlFor="Name" >  order </label>
                                <input type="number" defaultValue={faqdata._FaqOrder} name='_Order' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                            </div>
                            <div className='flex  mx-2 mt-3 gap-5  text-[18px ] font-bold'>
                                <h5>Status : </h5>
                                <p className={`${faqdata._FaqStatus ? 'text-green-700 border-green-700' : 'text-red-700 border-red-700'} border  px-2 bg-white rounded`}>{faqdata._FaqStatus ? 'Active' : 'InActive'}</p>
                            </div>
                            <div className='px-2 py-3 font-bold'>
                                <input type="radio" value={true} name='_Status' /> Active
                                <input className='ml-3' value={false} type="radio" name='_Status' /> Inactive
                            </div>

                            <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Update</button>
                        </form>

                    </div>
                </div>

            </div>
        </>
    )
}
