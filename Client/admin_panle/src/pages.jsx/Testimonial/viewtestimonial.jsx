import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoFunnel } from 'react-icons/io5'

export default function Viewtestimonial() {
  return (
    <>
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Testimonial/ViewTestimonial</h2>
        <div className='py-2 px-8 flex justify-between p'>
          <button className='px-5 bg-violet-300 rounded py-2 text-shadow-white '>
            <input type="checkbox" />
            All Select
          </button>
          <div className='border rounded flex items-center px-2 text-[20px] '><input className='py-2 outline-none px-3' type="Search" /> <CiSearch className='hover:cursor-pointer' /></div>
          <div className='px-4 flex gap-4'>
            <button className='hover:cursor-pointer px-5 bg-violet-300 rounded py-2 text-shadow-white  flex items-center gap-2'> <IoFunnel /> Filter</button>
            <button className='px-5 hover:cursor-pointer bg-green-300 rounded py-2 text-shadow-white '> Active </button>
          </div>
        </div>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>


          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>ViewTestimonial</h2>  </div>

          <div className='py-5'>

            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border py-2"><input type="checkbox" name="" id="" /></th>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Tital</th>
                  <th className="border p-2">Rating</th>
                  <th className="border p-2">Order</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">  Edit</th>
                  <th className="border p-2">  Delete</th>
                </tr>
              </thead>

              <tbody>

                <tr className="text-center">
                  <td className="border py-2"><input type="checkbox" name="" id="" /></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>


                  <td className="border p-2"><button className='bg-violet-500 px-2 py-1 rounded-xl text-white' > Active </button></td>
                  <td className="border p-2"><button className='bg-violet-500 px-2 py-1 rounded-xl text-white' > Edit </button></td>
                  <td className="border p-2"><button className='bg-red-500 px-2 py-1 rounded-xl text-white' > Delate </button></td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>
      </div>
    </>
  )
}
