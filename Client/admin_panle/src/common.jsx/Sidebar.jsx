import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { Navlist } from './Navlist'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { BiRadioCircleMarked } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function Sidebar() {


  const [yesee, setyesee] = useState('')

  let Toggle = (index) => {
    setyesee(yesee === index ? 'yesee' : index)
  }

  return (
    <>
      <div className='overflow-y-auto h-screen fixed  bg-neutral-200 shadow-red-900'>
        <div className='w-full h-30 mx-auto shadow-md  '>
          <img className='h-full mx-auto  ' src="/public/logo.png" alt="" />

        </div>
        <div className='ps-2 pe-4 pt-2 text-[14px] font-medium'>
          <Link to={'/dashboard'}>
            <div className='flex gap-2 items-center px-1.5'>


              <MdDashboard /><h2>   Dashbord</h2>
            </div>
          </Link>




          {Navlist.map((item, index) => (

            <div>
              <div key={index} className='flex gap-2 items-center px-2 hover:bg-white rounded py-2 justify-between  hover:cursor-pointer' onClick={() => Toggle(index)}>
                <div className='flex gap-3 py-1 items-center ' >
                  <span>{item.Navicon}</span>

                  <h2>{item.Navname}</h2>
                </div >
                {yesee === index ? <FaAngleUp /> : <FaAngleDown />}
              </div>

              {yesee === index && (<div className='ps-2'>

                {item.submenu?.map((v, i) => (
                  <ul >
                    <Link to={v.Link}>

                      <li className='flex gap-3 items-center hover:cursor-pointer py-1 '> <span><BiRadioCircleMarked />

                      </span><p className='hover:text-lime-500 duration-200'>{v.Navname}</p></li>

                    </Link>


                  </ul>

                ))}

              </div>)}

            </div>



          ))}







        </div>


      </div>

    </>
  )
}
