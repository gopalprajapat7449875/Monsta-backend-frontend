import React, { useEffect, useState } from 'react'
import $ from "jquery";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
export default function Addsubcatagory() {



  const [data, setdata] = useState([])

  let apibaseurl = import.meta.env.VITE_APIBASEURL


  let categorydata = () => {
    axios.get(`${apibaseurl}subcategory/parent`)
      .then((res) => res.data)
      .then((finalres) => {
        setdata(finalres.Categoryres)
    console.log(finalres.Categoryres[0]._id)
      })
  }



  let navigete = useNavigate()
  let Addsubcategory = (e) => {
    e.preventDefault()
    let data = new FormData(e.target)

    axios.post(`${apibaseurl}subcategory/create`, data)
      .then((res) => res.data)
      .then((finalres) => {


        if (finalres._status) {



          toast.success(finalres._Message)
          setTimeout(() => {
            navigete('/subcategory/view_sub_catagory')
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

    categorydata()

  }, []);
  return (

    <>
    <ToastContainer/>
      
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Addsubcatagory</h2>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add Addsubcatagory</h2>  </div>
          <form action="submit" onSubmit={Addsubcategory}>
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
             

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" >Parent Catagory Name </label>
                  <select name="_PerentCategory" type="text" placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 text-neutral-950 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                    <option className='text-neutral-400' value="">Select Parent Catagory</option>
                    {/* {data.map((item, i) => (
                  
                      <option name="_PerentCategory" value={item._id}> {item._CategoryName} </option>
                    ))} */}

                    {
                      data.map((item , i )=>{
                        console.log(item)
                        return(
                            <option className='text-neutral-700 font-serif'  value={item._id}> {item._CategoryName} </option>
                        )
                      })
                    }



                  </select>
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Catagory Name </label>
                  <input type="text" name='_SubCategoryName' placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Catagory  order </label>
                  <input type="number" name='_SubCategoryOrder' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>



                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>
              
            </div>


            <div className='col-span-1  pe-5   my-5'>
              <div>
                <input
                  type="file"
                  className="hello "
                  name='_image'
                  data-height="300"
                  data-allowed-file-extensions="jpg png jpeg"


                />

              </div>

            </div>


          </div>
          </form>
        </div>

      </div></>
  )
}
