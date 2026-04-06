import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addcountry() {




  let navigete = useNavigate()
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let AddCountry = (e) => {
    e.preventDefault()
    let obj = {
      _CountryName: e.target._CountryName.value,
      _CountryCode: e.target._CountryCode.value,
      _CountryOrder: e.target._CountryOrder.value,
      _CountryStatus: e.target._Status.value
     

    }
     console.log(obj)
    axios.post(`${apibaseurl}country/create`, obj)
      .then((res) => res.data)
      .then((finalres) => {


        if (finalres._status) {



          toast.success(finalres._Message)
          setTimeout(() => {
            navigete('/country/view_country')
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
  






  return (
    <>
    <ToastContainer/>
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Faq/AddFaq </h2>
        

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add New Faq</h2>  </div>
          <div className=''>


            <form action="submit" onSubmit={AddCountry}>
              <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                <label htmlFor="Name" > Country Name </label>
                <select
       
                  name='_CountryName'
                  type="text" className='w-xl px-2 py-2 border border-violet-300  bg-white outline-none rounded' >
                  <option >Select Country</option>
                  <option value="Indea">Indea</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="US">US</option>
                  <option value="America">America</option>
                </select>
              </div>
              <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                <label htmlFor="Name" > Country Code </label>
                <input name='_CountryCode' type="text" placeholder='Enter Code' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
              </div>

              <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                <label htmlFor="Name" >  order </label>
                <input type="number" name='_CountryOrder' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
              </div>

              <div className='px-2 py-3 font-bold'>
                <input type="radio" value={true} name='_Status' /> Active
                <input className='ml-3' value={false} type="radio" name='_Status' /> Inactive
              </div>

              <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>
            </form>

          </div>
        </div>

      </div>
    </>
  )
}
