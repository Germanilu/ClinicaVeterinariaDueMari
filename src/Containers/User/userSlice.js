import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jwt-decode';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: ""
    },

    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                token: ""
            }
        },
        update:(state,action) => {
            return{
                ...state,
                ...action.payload
            }
        },
    }

});


export const loginUser = (body, setMsgError) => async (dispatch) => {
    try {
        //Axios request
        const user = await axios.post("https://bbdd-cv2.herokuapp.com/api/auth/login", body);
        //Decode Token
        let decode = jwt(user.data.token);
        //Validation
        if (user.status === 200) {
            dispatch(login({ ...decode, token: user.data.token }));
        }
    } catch (error) {
        //Set the hook with the error
        setMsgError(error.response.data.message)
    }
}

export const logOut = () => (dispatch) => {
    dispatch(logout())
}

export const updateUser = (credentials,userProfile) => async(dispatch) => {
    try {
        let body = {
            name: userProfile.user_name,
            surname: userProfile.user_surname,
            mobile: userProfile.user_mobile,
            address: userProfile.user_address,
            city: userProfile.user_city,
            email: userProfile.user_email,
            password: userProfile.user_password
        }

        let config = {
            headers: {Authorization: `Bearer ${credentials.token}`}
        };


        const attempt = await axios.put(`https://bbdd-cv2.herokuapp.com/api/users/${credentials.user_id}`, body, config)
        console.log(attempt)

        if(attempt.status === 200){
            if(credentials.user_email !== body.email || credentials.user_password !== body.password){
                dispatch(logout())
            }else{
                dispatch(update({userProfile}))
            }
        }
    } catch (error) {
        console.log(error)
    }
}


export const { login, logout, update } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer