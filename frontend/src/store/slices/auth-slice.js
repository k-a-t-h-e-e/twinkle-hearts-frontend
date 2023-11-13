import { createSlice } from '@reduxjs/toolkit'
import { registerUser,userLogin } from '../actions/authActions'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
    loading:false,
    userInfo:{},
    userToken:null,
    error:null,
    sucesss:false,
    userDetails:{}
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      logout: (state) => {
        localStorage.removeItem('userToken') // deletes token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.userDetails= null
      },
      setCredentials: (state, { payload }) => {
        console.log("PAYLOAD IN SET CREDENTIALS SLICE ",payload);
        state.userDetails = payload
      },
    },
    extraReducers:{ 
       // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      
      state.loading = false
      state.userInfo = {access_token:payload.access_token,expires_in:payload.expires_in}
      state.userToken = payload.access_token
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
      
      // register user
        [registerUser.pending]: (state) => {
          state.loading = true
          state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
          state.loading = false
          state.error = payload
        },
      },
    })

    export const { logout, setCredentials } = authSlice.actions
    export default authSlice.reducer