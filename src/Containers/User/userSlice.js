import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jwt-decode';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token:""
    },

    reducers: {
        login: (state,action) => {
            return {
                ...state,
                ...action.payload
            }
        }
     },
});

export const loginUser = (body) => async (dispatch) => {
    try {
        //Axios request
        const user = await axios.post("https://bbdd-cv2.herokuapp.com/api/auth/login", body);
        //Decode Token
        let decode = jwt(user.data.token);
        //Validation
        if(user.status === 200){
            dispatch(login({...decode,token: user.data.token}));
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
}


export const {login} = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer