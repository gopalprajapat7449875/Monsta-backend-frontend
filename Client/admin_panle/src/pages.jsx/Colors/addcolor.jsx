import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import { CiSearch } from 'react-icons/ci'
import { IoFunnel } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addcolor() {
  const [color, setColor] = useState("")
  const [updatedata, setupdatedata] = useState([])
  let navigete = useNavigate()
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let { _id } = useParams()
  let AddColor = (e) => {
    e.preventDefault()
    let obj = {
      _ColorName: e.target._ColorName.value,
      _ColorCode: e.target._ColorCode.value,
      _ColorOrder: e.target._ColorOrder.value
    }


let url = _id? `color/update/${_id}`:'color/create';
let method =_id? 'put':'post'; 

    axios[method](`${apibaseurl}${url}`, obj)
      .then((res) => res.data)
      .then((finalres) => {


        if (finalres._status) {



          toast.success(finalres._Message)
          setTimeout(() => {
            navigete('/color/view_color')
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
    axios.get(`${apibaseurl}color/updatedata/${_id}`)
      .then((res) => res.data)
      .then((finalres) => {
        setupdatedata(finalres.data)
        console.log(finalres.data)
      })
  }, [_id])

  return (
    <>
      <ToastContainer />
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/{_id?'update':'Add'} color</h2>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>{_id?'Update':'Add New'} Color</h2>  </div>
          <div className='grid grid-cols-3'>
            <div className='col-span-1 p-5'>
              <SketchPicker

                color={color}
                onChange={(e) => setColor(e.hex)} />
            </div>
            <div className='span-cols-2'>
              <form action="submit" onSubmit={AddColor}>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Color Name</label>
                  <input defaultValue={updatedata._ColorName} type="text" placeholder='Enter Color name ' name='_ColorName' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Color Hexa Code</label>
                  <input defaultValue={  _id?updatedata._ColorCode : color} type="text" placeholder='Select Color code ' name='_ColorCode'  className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Color order </label>
                  <input defaultValue={updatedata._ColorOrder} type="number" placeholder='Enter order ' name='_ColorOrder' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>{_id?'Update':'Add'}</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
