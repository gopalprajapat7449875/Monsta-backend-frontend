import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoFunnel } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function Viewcolor() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  const [viewcolor, setviewcolor] = useState([])

  const [salectedids, setsalectedids] = useState([])
  console.log(salectedids)
  let viewColor = () => {
    axios.get(`${apibaseurl}color/view`)
      .then((res) => res.data)
      .then((finalres) => {
        setviewcolor(finalres.colorres)
      })
  }

  let getids = ((e) => {
    let checkboxid = e.target.value

    if (e.target.checked) {
      setsalectedids([...salectedids, checkboxid])

    } else {
      setsalectedids(salectedids.filter((ides) => ides != checkboxid))
    }



  })
  let allcheckids = ((e) => {


    if (e.target.checked) {
      setsalectedids(viewcolor.map((item) => item._id))
    }
    else {
      setsalectedids([])
    }

  })

  let ChangeStatus = (() => {

if (salectedids.length >= 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!"
      })


        .then((result) => {


          if (result.isConfirmed) {
            axios.post(`${apibaseurl}color/change-status`, { _id: salectedids })
              .then((res) => res.data)
              .then((finalres) => {
                toast.success(finalres._massage)
                viewColor()
                setsalectedids([])

              })

            Swal.fire({
              title: "Status Changed",
              text: "Your Color status has been changed.",
              icon: "success"
            });

          }
        })
    }

  })


  let Deletedata = (delid) => {

    if (salectedids.length >= 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })


        .then((result) => {


          if (result.isConfirmed) {
            axios.post(`${apibaseurl}color/delete`, { _id: salectedids })
              .then((res) => res.data)
              .then((finalres) => {
                toast.success(finalres._massage)
                viewColor()
                setsalectedids([])

              })

            Swal.fire({
              title: "Deleted!",
              text: "Your Color has been deleted.",
              icon: "success"
            });

          }
        })
    }
  }
  let Updatedata = (delid) => {


    axios.post(`${apibaseurl}color/delete`, { _id: delid })
      .then((res) => res.data)
      .then((finalres) => {
        toast.success(finalres._massage)
      })


  }






  useEffect(() => {


    viewColor()
  }, [])

  return (
    <>
      <div className=' w-5xl  min-h-[88vh] mx-auto '>
        <h2 className='ps-3 py-2'>Home/Viewcolor</h2>
        <div className='py-2 px-8 flex justify-between p'>
          <button className={`px-5 ${salectedids.length >= 1 ? 'bg-violet-500  text-white font-bold ' : 'bg-violet-300'} duration-200 rounded py-2 text-shadow-white `} >
            <input
              type="checkbox"
              onChange={allcheckids}
              checked={viewcolor.length == salectedids.length && viewcolor.length >= 1}
            />
            All Select
          </button>
          <div className='border rounded flex items-center px-2 text-[20px] '><input className='py-2 outline-none px-3' type="Search" /> <CiSearch className='hover:cursor-pointer' /></div>
          <div className='px-4 flex gap-4'>
            <button className='hover:cursor-pointer px-5 bg-violet-300 rounded py-2 duration-200 text-shadow-white  font-bold flex items-center gap-2'> <IoFunnel /> Filter</button>
            <button
              onClick={ChangeStatus}
              className={`px-5 hover:cursor-pointer duration-200 ${salectedids.length >= 1 ? 'bg-lime-700 text-white font-bold ' : 'bg-lime-300'}  rounded py-2 text-shadow-white `}>Change Status </button>
            <button className={`px-5 hover:cursor-pointer duration-200 ${salectedids.length >= 1 ? 'bg-red-700 text-white font-bold' : 'bg-orange-400'}  rounded py-2 text-shadow-white `}
              onClick={Deletedata}
            > Delete </button>
          </div>
        </div>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>


          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>View Color</h2>  </div>

          <div>

            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border py-2"><input
                    type="checkbox"
                    onChange={allcheckids}
                    checked={viewcolor.length == salectedids.length && viewcolor.length >= 1}
                  /></th>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Color Name</th>
                  <th className="border p-2">Color Code</th>
                  <th className="border p-2">Order</th>
                  <th className="border p-2">  Status</th>
                  <th className="border p-2">  Action</th>
                </tr>
              </thead>

              <tbody>

                {
                  viewcolor.length >= 1
                    ? (
                      viewcolor.map((item, i) => (
                        <tr className="text-center">
                          <td className="border py-2">
                            <input
                              type="checkbox"
                              name=""
                              onChange={getids}
                              checked={salectedids.includes(item._id)}
                              value={item._id}
                            />
                          </td>
                          <td className="border p-2"> {i + 1} </td>
                          <td className="border p-2">  {item._ColorName} </td>
                          <td className="border p-2"> {item._ColorCode}</td>

                          <td className="border p-2">{item._ColorOrder} </td>
                          <td className="border p-2">  {item._ColorStatus ? <button className='bg-green-500 px-2 py-1 rounded-xl text-white font-bold' > Active </button> : <button className='bg-orange-500 px-2 py-1 rounded-xl text-white' > Deactive </button>}      </td>
                          <td className="border p-2"> <button className='bg-red-500 px-2 py-1 rounded-xl text-white font-bold' onClick={() => Deletedata(item._id)} > Delate </button> | <Link to={`/color/add_color/${item._id}`} > <button className='bg-blue-500 font-bold px-2 py-1 rounded-xl text-white'> Edit </button></Link>  </td>
                        </tr>
                      ))
                    ) : ''}



              </tbody>
            </table>

          </div>

        </div>

      </div>
    </>
  )
}
