
import React, { useContext } from 'react'
import Sidebar from '../common.jsx/Sidebar'
import Header from '../common.jsx/Header'
import Footer from '../common.jsx/footer'
import { Outlet } from 'react-router-dom'
import { CartApi } from '../common.jsx/comancontesxt'

export default function MainAdmin() {

    const{Login} = useContext(CartApi)

    return (
        <>



            <div className='w-full'>

                <div className='w-full grid grid-cols-[15%_auto] '>

                    <div >
                        <Sidebar />
                    </div>



                    <div className='shadow-lg  '>


                        <Header />

                        <Outlet />
                        <Footer />

                    </div>



                </div>








            </div >

        </>
    )
}
