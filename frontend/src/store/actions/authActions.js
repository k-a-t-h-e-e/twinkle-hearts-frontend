import axios from 'axios';
import { createAsyncThunk} from '@reduxjs/toolkit';
import cogoToast from 'cogo-toast';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;


export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, email, password,passwordRepeat }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        await axios.post(
          `${SERVER_URL}/api/public/account/registration`,
          { username, email, password ,passwordRepeat},
          config
        )
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          cogoToast.success("Registration Failed", {position: "top-right"});

          return rejectWithValue(error.response.data.message)
          
        } else {
          cogoToast.success("Registration Failed", {position: "top-right"});

          return rejectWithValue(error.message)
        }
      }
    }
  );

  export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, userpassword}, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,

          },
        }
        const { data } = await axios.post(
          `${AUTH_URL}/oauth/token`,
          { username:username, password:userpassword ,grant_type:"password"},
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.userToken)
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          cogoToast.error("Login Failed", {position: "top-center"});

          return rejectWithValue(error.response.data.message)
          
        } else {
          cogoToast.error("Login Failed", {position: "top-center"});

          return rejectWithValue(error.message)
        }
      }
    }
  )
