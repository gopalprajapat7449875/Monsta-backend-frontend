import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Header() {

  const [open, setopen] = useState(false)
  return (
    <>
      <div className='text-lg py-3 ps-3 border-b flex justify-between'>


        <div className='flex items-center gap-3'>

          <MdDashboard />
          <h2>  Dashbord </h2>
        </div>

        <div className='pe-10 text-3xl font-bold '>
          <FaUserCircle className='hover:cursor-pointer' onClick={() => setopen(!open)} />


          {open && <div className='fixed z-9 bg-white border-2  text-blue-700 px-7 mt-3 py-6 rounded-b-2xl rounded-tl-2xl uppercase hover:cursor-pointer text-[16px] font-normal -translate-x-25  leading-7 ' onClick={()=>setopen(false)}>
            <ul>
              <li className='flex items-center rounded  hover:border-2 hover:border-violet-500 gap-2 items-center'>  <MdDashboard /> <Link to={'/profile'}> Profile  </Link> </li>
                <hr/>
              <li className='flex items-center  rounded hover:border-2 hover:border-violet-500 gap-2'> <IoMdSettings /> <Link to={'/componyprofile'}> Compony  </Link> </li>
              <hr/>
              <li className='flex items-center  rounded  hover:border-2 hover:border-violet-500 gap-2'> <FaUserCircle/> <Link to={'/'} >Logout</Link> </li>
            </ul>
          </div>}

        </div>
      </div>
    </>

  )
}
