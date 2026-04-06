import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoFunnel } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

export default function Viewproduct() {
  const [data, setdata] = useState([])
  const [salectedids, setsalectedids] = useState([])
  const [path, setpath] = useState('')
  console.log(data, path)
  let apibaseurl = import.meta.env.VITE_APIBASEURL




  let Productdata = () => {
    axios.get(`${apibaseurl}product/view`)
      .then((res) => res.data)
      .then((finalres) => {
        setdata(finalres.productres)
        setpath(finalres._Path)
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
      setsalectedids(data.map((item) => item._id))
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
            axios.post(`${apibaseurl}product/change-status`, { _id: salectedids })
              .then((res) => res.data)
              .then((finalres) => {
                toast.success(finalres._massage)
               Productdata()
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


  let Deletedata = () => {

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
            axios.post(`${apibaseurl}product/delete`, { _id: salectedids })
              .then((res) => res.data)
              .then((finalres) => {
                toast.success(finalres._massage)
       Productdata()
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

  useEffect(() => {
    Productdata()
  }, [])

  return (
    <>
      <ToastContainer />
      <div className=' w-6xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Product/ViewProduct</h2>
        <div className='py-2 px-8 flex justify-between p'>
          <button className={`px-5 ${salectedids.length >= 1 ? 'bg-violet-500  text-white font-bold ' : 'bg-violet-300'} duration-200 rounded py-2 text-shadow-white `} >
            <input
              type="checkbox"
              onChange={allcheckids}
              checked={data.length == salectedids.length && data.length >= 1}
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

        <div className='shadow p-2 w-6xl mx-auto bg-neutral-100'>


          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>View Product</h2>  </div>

          <div className=''>

            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border py-2"><input
                    type="checkbox"
                    onChange={allcheckids}
                    checked={data.length == salectedids.length && data.length >= 1}
                  /></th>
                  <th className="border py-2">S.No</th>
                  <th className="border w-50 py-2 px-1">Product Name</th>
                  <th className="border py-2 px-1">Product Category</th>
                  <th className="border py-2 px-1">Sub Category</th>

                  <th className="border py-2 px-1">image</th>
                  <th className="border py-2">Price</th>
                  <th className="border py-2 ">Order</th>
                  <th className="border p-2">  Status</th>
                  <th className="border p-2">  Action</th>
                  <th className="border py-2 ">  Ditail</th>
                </tr>
              </thead>

              <tbody>


                {data.map((item, i) => {
                  return (
                      <tr key={i} className="text-center">
                      <td className="border py-2">
                        <input
                          type="checkbox"
                          onChange={getids}
                          checked={salectedids.includes(item._id)}
                          value={item._id}
                        />
                      </td>
                      <td className="border py-2 "> {i + 1} </td>
                      <td className="border w-50 py-2 px-1"> {item._ProductName} </td>
                      <td className="border py-2 px-1"> {item._PerentCategory._CategoryName}</td>
                      <td className="border py-2 px-1" > {item._SubCategory._SubCategoryName}</td>
                      <td className="border py-2 px-1">

                        <img className='w-25 h-15 flex justify-self-center object-center' src={path + item._image} alt={item._image} />

                      </td>
                      <td className="border py-2 px-1">{'Rs' + item._Product_Original_Price}  </td>
                      <td className="border py-2 "> {item._ProductOrder} </td>

                      <td className="border p-2">
                        {item._ProductStatus ? <button className='bg-green-500 px-2 py-1 rounded-xl text-white font-bold' > Active </button> : <button className='bg-orange-500 px-2 py-1 rounded-xl text-white' > Deactive </button>}
                      </td>

                      <td className="border p-2"> <button className='bg-red-500 px-2 py-1 rounded-xl text-white font-bold' onClick={() => Deletedata(item._id)} > Delate </button> | <Link to={`/product/update_product/${item._id}`} > <button className='bg-blue-500 font-bold px-2 py-1 rounded-xl text-white'> Edit </button></Link>  </td>
                      <td className="border py-2 "> <Link to={`/product/view/productditail/${item._Slug}`}> <button className='bg-blue-500 px-2 py-1 rounded-xl text-white' >  Detail </button></Link> </td>
                    </tr>
                  )
                })}
                   
                          
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </>
  )
}
