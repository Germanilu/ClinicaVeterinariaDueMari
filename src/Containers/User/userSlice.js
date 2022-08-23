import {createSlice} from '@reduxjs/toolkit';
// import axios from 'axios';
// import jwt from 'jwt-decode';

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
        console.log("Login")
    } catch (error) {
        console.log("Login Error")
    }
}


export const {login} = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer