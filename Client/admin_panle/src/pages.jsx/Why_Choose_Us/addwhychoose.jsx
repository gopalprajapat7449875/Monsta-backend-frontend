import React, { useEffect } from 'react'
import $ from "jquery";
export default function Addwhychoose() {

   useEffect(() => {
    $(".hello").dropify({

      messages: {
        'default': 'file here or click',

      }
    });
  }, []);
  return (
    <>
       <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Addcatagory</h2>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add Addcatagory</h2>  </div>
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
              <form action="submit">
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Tital Name </label>
                  <input type="text" placeholder='Enter Tital Name ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" >  Order </label>
                  <input type="number" placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>



                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>
              </form>
            </div>


            <div className='col-span-1 h-300 pe-5   my-5'>
              <div>
                <input
                  type="file"
                  className="hello "
                  data-height="300"
                  data-allowed-file-extensions="jpg png jpeg"


                />

              </div>

            </div>


          </div>
        </div>

      </div>
    </>
  )
}
