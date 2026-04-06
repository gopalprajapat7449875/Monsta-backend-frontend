import React, { useEffect } from 'react'
import $ from "jquery";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
export default function Addslider() {

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let navigete = useNavigate()

  let slideradd = (e) => {

    e.preventDefault()
    let data = new FormData(e.target)

    axios.post(`${apibaseurl}slider/create`, data)
      .then((res) => res.data)
      .then((finalres) => {


        if (finalres._status) {



          toast.success(finalres._Message)
          setTimeout(() => {
            navigete('/slider/view_slider')
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
  }, []);
  return (
    <>
      <ToastContainer />
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Slider/AddSlider</h2>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>AddSlider</h2>  </div>
          <form action="submit" onSubmit={slideradd}>
            <div className='grid grid-cols-3'>
              <div className='col-span-2'>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Tital </label>
                  <input type="text" name='_SliderTitle' placeholder='Enter Tital ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" >  Slider Order </label>
                  <input type="number" name='_SliderOrder' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <div className='px-2 py-3 font-bold'>
                  <input type="radio" value={true}name='_SliderStatus' /> Active
                  <input className='ml-3' value={false}  type="radio" name='_SliderStatus'/> Inactive
                </div>
                {/* <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Meta Tital </label>
                  <input type="text" placeholder='Enter Meta Tital ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" >  Meta Tag </label>
                  <input type="text" placeholder='Enter Meta Tag ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
 */}

                <button type='submit' className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>

              </div>


              <div className='col-span-1  pe-5   my-5'>
                <div>
                  <input
                    type="file"
                    name='_image'
                    className="hello "
                    data-height="300"
                    data-allowed-file-extensions="jpg png jpeg"


                  />

                </div>

              </div>


            </div>
            </form>
        </div>

      </div>
    </>
  )
}
