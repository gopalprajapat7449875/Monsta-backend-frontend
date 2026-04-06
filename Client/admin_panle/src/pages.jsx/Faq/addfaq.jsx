import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addfaq() {
  let navigete = useNavigate()
  let AddFaq = (e) => {

    e.preventDefault()
    let obj = {
      _FaqQuestion: e.target._Question.value,
      _FaqAnswer: e.target._Answer.value,
      _FaqOrder: e.target._Order.value,
      _FaqStatus: e.target._Status.value,

    }
    axios.post(`http://localhost:8000/admin/faq/create`, obj)
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
  return (
    <>
      <ToastContainer />
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Faq/AddFaq</h2>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add New Faq</h2>  </div>
          <div className=''>


            <form action="submit" onSubmit={AddFaq}>
              <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                <label htmlFor="Name" > Question </label>
                <textarea type="text" name='_Question' placeholder='Enter Question ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
              </div>
              <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                <label htmlFor="Name" > Answer </label>
                <textarea type="text" name='_Answer' placeholder='Enter Answer ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
              </div>

              <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                <label htmlFor="Name" >  order </label>
                <input type="number" name='_Order' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
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
