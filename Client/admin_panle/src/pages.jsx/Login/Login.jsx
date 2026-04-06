
import React, { useContext, useEffect, useState } from 'react'
import { CartApi } from '../../common.jsx/comancontesxt'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Login() {
    const { Login, setlogin } = useContext(CartApi)

    let navigation = useNavigate()



    let LoginDone = (e) => {
        e.preventDefault()


        if (e.target.userEmil.value === `gopalprajapat7449895@gmail.com` && e.target.Password.value === '123456789') {
            navigation("/dashboard")
        }
        else {
            toast.error('please type right mail & password',
                {
                    position: "top-center",
                    theme: "colored",
                   
                   
                }
            )
        }


        // setlogin(true)


        // if (Login) {
        //     navigat('/checkout')
        // } else {
        //     toast('Plese login First')
        // }
    }


    return (
        <>
            <ToastContainer />

            <div className="w-full h-screen  bg-linear-to-t from-sky-500 to-indigo-500 ">

                <div className=" flex py-30  justify-self-center  w-180 h-90 grid grid-cols-2 ">

                    <div className="flex bg-white rounded-2xl justify-self-center py-3 my-4  shadow-xl">

                        <form className='w-70 px-3 pt-3' onSubmit={LoginDone} >
                            <div className="flex flex-col  ">
                                <label htmlFor="" className='text-[18px] text-center font-semibold font-serif italic text-shadow-3xl text-shadow-amber-900'>Email</label>
                                <input type="Email" className='border-1 outline-none rounded-2xl py-1 mt-3 px-3 ' name='userEmil' />

                            </div>
                            <div className="flex flex-col py-3 ">
                                <label htmlFor="" className='text-[18px] text-center font-semibold font-serif italic text-shadow-3xl text-shadow-amber-900'>Password</label>
                                <input type="password" className='border-1 outline-none rounded-2xl py-1 mt-3 px-3 ' name='Password' />

                            </div>
                            <div className="flex flex-col py-6 px-15 ">
                                <button className='text-[18px] py-1 rounded-2xl cursor-pointer hover:bg-neutral-800 duration-100  bg-blue-500 text-white  text-center font-semibold font-serif italic text-shadow-3xl text-shadow-amber-900' type='submit' >Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full h-full">
                        <div className="flex justify-center items-center h-full ">

                            {/* Developer Container */}
                            <div className="relative">

                                {/* Laptop */}
                                <div className="w-70 h-50 mx-auto bg-gray-800 rounded-xl shadow-2xl border-4 border-gray-700">

                                    {/* Screen */}
                                    <div className="bg-black h-full rounded-lg p-2 overflow-hidden">

                                        {/* Fake Code */}
                                        <div className="text-green-400 font-mono text-sm">

                                            <p className="animate-pulse">
                                                const developer = "Working...";
                                                console.log("Coding...");
                                                <span className='text-red-700  text-[20px] font-bold text-center '> Warninig... </span>
                                              
                                            </p>

                                            <p className="typing mt-2">
                                                
                                                 Dot not enter without permition
                                            </p>

                                            <p className="mt-2 animate-pulse">
                                                npm start
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Laptop Base */}
                                <div className="w-85 h-6 bg-gray-700 rounded-b-xl mx-auto shadow-lg"></div>







                            </div>


                            {/* Custom CSS */}
                            <style jsx>{`

        .typing {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid green;
          width: 0;
          animation: typing 3s steps(20) infinite,
                     blink 0.8s infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 200px }
        }

        @keyframes blink {
          50% { border-color: transparent }
        }

      `}</style>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
