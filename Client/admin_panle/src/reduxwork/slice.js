import { createSlice } from '@reduxjs/toolkit'


export const loginSlice = createSlice({
  name: 'user',
  initialState:{
    token:  null,
   
    userdata:null,
   
  },
  
  reducers: {
    setToken:(state,action)=>{
        state.token=action.payload
        console.log(state.token)
        
    },
    logOut:(state)=>{
        
        state.token=null
    
    },
     Userdata:(state,action)=>{
        state.userdata=action.payload
        console.log(state.userdata)
    },
 
  },
})

export const { setToken,logOut,Userdata,UserPath } = loginSlice.actions

export default loginSlice.reducer