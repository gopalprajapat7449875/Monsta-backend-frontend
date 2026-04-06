import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Updatemeterial() {
const[Meterialdata,setMeterialdata]=useState([])

    let navigete = useNavigate()
    let {_id}=useParams()
    let apibaseurl = import.meta.env.VITE_APIBASEURL
    let UpdateMeterial = (e) => {
        e.preventDefault()
        let obj = {
            _MetarialName: e.target._MetarialName.value,
            _MetarialCode: e.target._MetarialCode.value,
            _MetarialOrder: e.target._MetarialOrder.value,
            _MetarialStatus: e.target._Status.value,
        }
        axios.put(`${apibaseurl}material/update/${_id}`, obj)
            .then((res) => res.data)
            .then((finalres) => {


                if (finalres._status) {



                    toast.success(finalres._Message)
                    setTimeout(() => {
                        navigete('/meterial/view_meterial')
                    }, 3000)

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
        axios.get(`${apibaseurl}material/updateview/${_id}`)
            .then((res) => {
                setMeterialdata((res.data.Materialdata))
            })
    }, [_id])
    return (
        <>
            <ToastContainer />
            <div className=' w-5xl mx-auto min-h-[88vh]'>
                <h2 className='ps-3 py-2'>Home/Meterial/UpdateMeterial</h2>

                <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
                    <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Update Meterial</h2>  </div>
                    <div className=''>


                        <form action="submit" onSubmit={UpdateMeterial}>
                            <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                <label htmlFor="Name" > Meterial Name </label>
                                <input name='_MetarialName' defaultValue={Meterialdata._MetarialName} placeholder='Enter Material Name' type="text" className='w-xl px-2 py-2 border border-violet-300  bg-white outline-none rounded' />

                            </div>
                            <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                <label htmlFor="Name" > Meterial Code </label>
                                <input name='_MetarialCode'defaultValue={Meterialdata._MetarialCode} type="text" placeholder='Enter Code' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                            </div>

                            <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                <label htmlFor="Name" >  order </label>
                                <input name='_MetarialOrder'defaultValue={Meterialdata._MetarialOrder} type="number" placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                            </div>
                            <div className='flex  mx-2 mt-3 gap-5  text-[18px ] font-bold'>
                                <h5>Status : </h5>
                                <p className={`${Meterialdata._MetarialStatus ? 'text-green-700 border-green-700' : 'text-red-700 border-red-700'} border  px-2 bg-white rounded`}>{Meterialdata._MetarialStatus ? 'Active' : 'InActive'}</p>
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

