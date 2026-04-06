import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoFunnel } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function Viewfaq() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  const [viewmeterial, setviewmeterial] = useState([])
  const [salectedids, setsalectedids] = useState([])


  let faqview = () => {
    axios.get(`${apibaseurl}faq/view`)
      .then((res) => res.data)
      .then((finalres) => {
        setviewmeterial(finalres.Faqres)
      })
  }

  let getids = ((e) => {
    let checkboxid = e.target.value

    if (e.target.checked) {
      setsalectedids([...salectedids, checkboxid])

    }
    else {
      setsalectedids(salectedids.filter((ides) => ides != checkboxid))
    }



  })
  let allcheckids = ((e) => {


    if (e.target.checked) {
      setsalectedids(viewmeterial.map((item) => item._id))
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
        confirmButtonText: "Yes, delete it!"
      })


        .then((result) => {


          if (result.isConfirmed) {
            axios.post(`${apibaseurl}faq/change-status`, { _id: salectedids })
              .then((res) => res.data)
              .then((finalres) => {
                toast.success(finalres._massage)
                faqview()
                setsalectedids([])

              })

            Swal.fire({
              title: "Status Changed",
              text: "Your Faq status has been changed.",
              icon: "success"
            });

          }
        })
    }

  })


  let Deletedata = () => {

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
            axios.post(`${apibaseurl}faq/delete`, { _id: salectedids })
              .then((res) => res.data)
              .then((finalres) => {
                toast.success(finalres._Message)
                faqview()
                setsalectedids([])

              })

            Swal.fire({
              title: "Deleted!",
              text: "Your Color has been deleted.",
              icon: "success"
            });

          }
        })
    };
    let Updatedata = () => {


      axios.post(`${apibaseurl}faq/update`, { _id: salectedids })
        .then((res) => res.data)
        .then((finalres) => {
          toast.success(finalres._massage)
        })


    }

  }

  useEffect(() => {
    faqview()
  }, [])

  return (
    <>
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Faq/ViewFaq</h2>
        <div className='py-2 px-8 flex justify-between p'>
          <button className={`px-5 ${salectedids.length >= 1 ? 'bg-violet-500  text-white font-bold ' : 'bg-violet-300'} duration-200 rounded py-2 text-shadow-white `} >
            <input
              type="checkbox"
              onChange={allcheckids}
              checked={viewmeterial.length == salectedids.length && viewmeterial.length >= 1}
            />
            All Select
          </button>
          <div className='border rounded flex items-center px-2 text-[20px] '><input className='py-2 outline-none px-3' type="Search" /> <CiSearch className='hover:cursor-pointer' /></div>
          <div className='px-4 flex gap-4'>
            <button className='hover:cursor-pointer px-5 bg-violet-300 rounded py-2 text-shadow-white  flex items-center gap-2'> <IoFunnel /> Filter</button>
            <button
            onClick={ChangeStatus}
            className={`px-5 hover:cursor-pointer duration-200 ${salectedids.length >= 1 ? 'bg-lime-700 text-white font-bold ' : 'bg-lime-300'}  rounded py-2 text-shadow-white `}>Change Status </button>

            <button className={`px-5 hover:cursor-pointer duration-200 ${salectedids.length >= 1 ? 'bg-red-700 text-white font-bold' : 'bg-orange-400'}  rounded py-2 text-shadow-white `}
              onClick={Deletedata}
            > Delete </button>
          </div>
        </div>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>


          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>View Faq</h2>  </div>

          <div className='py-5'>

            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border py-2"><input
                    type="checkbox"
                    onChange={allcheckids}
                    checked={viewmeterial.length == salectedids.length && viewmeterial.length >= 1}
                  /></th>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Tital</th>
                  <th className="border p-2">Answer</th>

                  <th className="border p-2">Order</th>
                  <th className="border p-2">  Status</th>
                  <th className="border p-2">  Action</th>

                </tr>
              </thead>

              <tbody>
                {
                  viewmeterial.map((item, i) => (
                    <tr className="text-center">
                      <td className="border py-2"> <input
                        type="checkbox"
                        name=""
                        onChange={getids}
                        checked={salectedids.includes(item._id)}
                        value={item._id}
                      /></td>
                      <td className="border p-2"> {i + 1}  </td>
                      <td className="border p-2"> {item._FaqQuestion} </td>
                      <td className="border p-2" > {item._FaqAnswer} </td>
                      <td className="border p-2"> {item._FaqOrder} </td>


                      <td className="border p-2">  {item._FaqStatus ? <button className='bg-green-500 px-2 py-1 rounded-xl text-white font-bold' > Active </button> : <button className='bg-orange-500 px-2 py-1 rounded-xl text-white' > Deactive </button>}      </td>
                      <td className="border p-2"> <button className='bg-red-500 px-2 py-1 rounded-xl text-white font-bold' onClick={() => Deletedata(item._id)}  > Delate </button> | <Link to={`/faq/update/${item._id}`} > <button className='bg-blue-500 font-bold px-2 py-1 rounded-xl text-white' > Edit </button></Link>  </td>
                    </tr>

                  ))
                }


              </tbody>
            </table>

          </div>

        </div>
      </div>
    </>
  )
}

