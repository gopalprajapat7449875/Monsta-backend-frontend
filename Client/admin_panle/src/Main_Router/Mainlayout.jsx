import React, { useContext } from 'react'
import Sidebar from '../common.jsx/Sidebar'
import Header from '../common.jsx/Header'
import Footer from '../common.jsx/footer'
import { Outlet, useNavigate } from 'react-router-dom'

import { CartApi } from '../common.jsx/comancontesxt'
import MainAdmin from './MainAdmin'

export default function Mainlayout() {

    const { Login } = useContext(CartApi)
    const navigat = useNavigate()

    return (
        <>


            <MainAdmin />







        </>
    )
}
