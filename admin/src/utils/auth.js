// export const isAuthenticated = user => !!user;

// export const isAllowed = (user, rights) =>
//   rights.some(right => user.rights.includes(right));

// export const hasRole = (user, roles) =>
//   roles.some(role => user.roles.includes(role));

import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function useAuth() {

    // let history = useHistory();
    const { setUser } = useContext(AuthContext);

    //set user
    const setUserContext = async () => {
        return await axios.post('http://localhost:5000/login').then(res => {
            console.log(res)
            // setUser(res.data.currentUser);
            // history.push('/home');
        }).catch((err) => {
            console.log("here auth.js file inside utils ");
            console.log(err)
        })
    }

    //login user 
    const loginUser = async (data) => {
        const { email, password } = data;
        return axios.post('http://localhost:5000/login', {
            email,
            password,
        }).then(async () => {
            await setUserContext();
        }).catch((err) => {
            console.log("here auth.js file inside utils");
            console.log(err)
        })
    };

    return {
        loginUser,
    }
}