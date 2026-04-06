import React, { useEffect, useState } from 'react'
import $ from "jquery";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
export default function Updatesubsubcatagory() {

    let { _id } = useParams('')

    const [perent, setpernt] = useState([])
    const [subperent, setsubpernet] = useState([])
    const [subsubcategorydata, setsubsubcategorydata] = useState([])
    
    const[pid,setpid]=useState('')
    const[subpid,setsubpid]=useState('')
    
    
    const [path, setpath] = useState('')
    const [sle, setsle] = useState(false)


    let apibaseurl = import.meta.env.VITE_APIBASEURL


    let getpernetcat = () => {
        axios.get(`${apibaseurl}subsubcategory/parent`)
            .then((res) => res.data)
            .then((finaleres) => {
                setpernt(finaleres.Categoryres)
            })



    }
    let getidforsubcategory = (e) => {
        let pernetid = e.target.value
        axios.get(`${apibaseurl}subsubcategory/subcategory/${pernetid}`)
            .then((res) => res.data)
            .then((finaleres) => {
                setsubpernet(finaleres.Categoryres)
            })


    }
    let navigete = useNavigate()
    let Addsubsubcategory = (e) => {
        e.preventDefault()
        let data = new FormData(e.target)

        axios.put(`${apibaseurl}subsubcategory/update/${_id}`, data)
            .then((res) => res.data)
            .then((finalres) => {


                if (finalres._status) {



                    toast.success(finalres._Message)
                    setTimeout(() => {
                        navigete('/sub_sub_category/view_sub_sub_catagory')
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
        $(".hello").dropify({

            messages: {
                'default': 'file here or click',

            }
        });
        getpernetcat()



        axios.get(`${apibaseurl}subsubcategory/updatedata/${_id}`)
            .then((res) => {
                setsubsubcategorydata(res.data.data)
                setpath(res.data._path)
                setpid(res.data.data._PerentCategory._id)
                setsubpid(res.data.data._SubCategory._id)
                
            })

    }, [_id]);
    return (
        <>
            <ToastContainer />

            <div className=' w-5xl mx-auto min-h-[88vh]'>
                <h2 className='ps-3 py-2'>Home/Update sub subcatagory</h2>

                <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
                    <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Update sub Subcatagory</h2>  </div>
                    <form action="submit" onSubmit={Addsubsubcategory}>
                        <div className='grid grid-cols-3'>
                            <div className='col-span-2'>


                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Parent Catagory Name </label>
                                    <select name="_PerentCategory" type="text"  placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 text-neutral-950 border border-violet-300 bg-white outline-none rounded  text-neutral-500' onChange={getidforsubcategory} >
                                        <option className='text-neutral-400'    > Select Pernet Category </option>

                                        {perent.map((item, i) => (
                                            <option key={i} className='text-neutral-400' selected={item._id===pid} value={item._id}>{item._CategoryName}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Sub Catagory Name </label>
                                    <select name="_SubCategory" type="text" placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 text-neutral-950 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                                        <option className='text-neutral-400' value="">Select Sub Catagory</option>
                                        {subperent.map((item, i) => {
                                            return (
                                                <option key={i} className='text-neutral-700 font-serif'selected={item._id===subpid}  value={item._id || subpid}> {item._SubCategoryName
                                                } </option>
                                            )
                                        })}

                                    </select>
                                </div>
                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Sub Sub Catagory Name </label>
                                    <input type="text" defaultValue={subsubcategorydata._SubSubCategoryName} name='_SubSubCategoryName' placeholder='Enter Sub Sub Catagory Name ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                                </div>

                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Sub Sub Catagory  order </label>
                                    <input type="number"  defaultValue={subsubcategorydata._SubSubCategoryOrder}  name='_SubSubCategoryOrder' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                                </div>


                                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Update</button>

                            </div>


                            <div className='col-span-1  pe-5   my-5'>
                                <div>


                                    {sle ? <input
                                        type="file"
                                        multiple

                                        name='_image'
                                        className="hello "
                                        data-height="300"
                                        data-allowed-file-extensions="jpg png jpeg"


                                    /> : <img
                                        className='w-full h-65'
                                        src={path + subsubcategorydata._image}
                                        alt="category"

                                    />}

                                </div>


                            </div>


                        </div>
                    </form>
                    <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer' onClick={() => setsle(!sle)} > Update image </button>
                </div>

            </div></>
    )
}
