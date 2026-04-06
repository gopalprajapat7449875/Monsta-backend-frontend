import React, { createContext, useEffect, useState } from 'react'

const CartApi = createContext();

export default function ContextFile({ children }) {




    const [Login, setlogin] = useState(false)


console.log(Login)




    const DataApi = { Login, setlogin };




    return (

        <>
            <CartApi.Provider value={DataApi}>

                {children}

            </CartApi.Provider>
        </>
    )
}
export { CartApi };
