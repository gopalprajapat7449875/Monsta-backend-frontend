import React from 'react'
import { AiFillProduct } from 'react-icons/ai';
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from 'react-icons/fa6';
import { MdProductionQuantityLimits } from 'react-icons/md';

export default function Dashbord() {
    return (

        <>
            <div className='ps-3'>
<h2 className='ps-3 py-2'>Home/Dashbord</h2>
                <div className='grid grid-cols-3 gap-5 p-8 h-[78vh]' >

                    <div className='bg-violet-600 h-45 rounded shadow-lg text-white p-3 text-2xl font-medium flex justify-between '>

                        <div>
                            <p>
                                23
                            </p>
                            <p>
                                User
                            </p>
                        </div>
                        <div >
                            <FaRegUserCircle />

                        </div>
                    </div>
                    <div className='bg-blue-400 h-45 rounded shadow-lg text-white p-5 text-2xl font-medium flex justify-between '>
                        <div>
                            <p>
                                20
                            </p>
                            <p>
                                Product
                            </p>
                        </div>
                        <div>
                            <MdProductionQuantityLimits />


                        </div>
                    </div>
                    <div className='bg-yellow-400 h-45 rounded shadow-lg text-white p-5 text-2xl font-medium flex justify-between '>

                        <div>
                            <p>
                                15
                            </p>
                            <p>
                               Catagory
                            </p>
                        </div>
                        <div>
                            <AiFillProduct />



                        </div>
                    </div>
                    <div className='bg-red-600 h-45 rounded shadow-lg text-white p-5 text-2xl font-medium flex justify-between'>

                        <div>
                            <p>
                               50
                            </p>
                            <p>
                               Orders
                            </p>
                        </div>
                        <div>


                            <FaCartShopping />

                        </div>
                    </div>


                </div>
            </div>

        </>

    )
}
