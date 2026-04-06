import React, { useEffect } from 'react'
import $ from "jquery";
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddSubSubCatagory() {
    const [perent, setpernt] = useState([])
    const [subperent, setsubpernet] = useState([])
    console.log(subperent)
    let apibaseurl = import.meta.env.VITE_APIBASEURL
let navigete = useNavigate()

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

    let addsubsubdta=(e)=>{
        alert()
e.preventDefault()
let subsubdata=new FormData(e.target)

axios.post(`${apibaseurl}subsubcategory/create`,subsubdata)
.then((res)=>res.data)
.then((finalres)=>{
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
    }, []);

    return (
        <>
        <ToastContainer/>
            <div className=' w-5xl mx-auto min-h-[88vh]'>
                <h2 className='ps-3 py-2'>Home/Add Sub Sub catagory</h2>

                <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
                    <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add Sub Sub catagory</h2>  </div>
                    <form action="submit" onSubmit={addsubsubdta}>
                        <div className='grid grid-cols-3'>
                            <div className='col-span-2'>


                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Parent Catagory Name </label>
                                    <select name="_PerentCategory" type="text" placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 text-neutral-950 border border-violet-300 bg-white outline-none rounded  text-neutral-500' onChange={getidforsubcategory} >
                                        <option className='text-neutral-400' value="">Select Parent Catagory</option>

                                        {perent.map((item, i) => (
                                            <option className='text-neutral-400' value={item._id}>{item._CategoryName}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Sub Catagory Name </label>
                                    <select name="_SubCategory" type="text" placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 text-neutral-950 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                                        <option className='text-neutral-400' value="">Select Sub Catagory</option>
                                        {subperent.map((item, i) => {
                                            return (
                                                <option className='text-neutral-700 font-serif' value={item._id}> {item._SubCategoryName
                                                } </option>
                                            )
                                        })}

                                    </select>
                                </div>

                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Sub Sub Catagory Name </label>
                                    <input type="text" name='_SubSubCategoryName' placeholder='Enter Sub Sub Catagory Name ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                                </div>

                                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                                    <label htmlFor="Name" >Sub Sub Catagory  order </label>
                                    <input type="number" name='_SubSubCategoryOrder' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                                </div>



                                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>

                            </div>


                            <div className='col-span-1  pe-5   my-5'>
                                <div>


                                    <input
                                        type="file"
                                        multiple
                                        name='_image'
                                        className="hello "
                                        data-height="300"
                                        data-allowed-file-extensions="jpg png jpeg"


                                    />

                                    {/* <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-400 p-10 text-center rounded-xl cursor-pointer"
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    id="fileInput"
                  />

                  <label htmlFor="fileInput" className="cursor-pointer">
                    Drag & Drop Images Here <br />
                    <span className="text-blue-500">or Click to Upload</span>
                  </label>
                </div> */}

                                    {/* Preview */}
                                    {/* <div className="grid grid-cols-4 gap-4 mt-6">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.preview}
                        alt=""
                        className="w-full h-22 object-fill rounded-lg"
                      />

                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div> */}

                                </div>

                            </div>


                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
