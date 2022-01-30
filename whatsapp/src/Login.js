import React from 'react';
import './login.css';
import {Button} from  "@material-ui/core";
import { auth,provider} from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

const[{},dispatch]=useStateValue();    
    //user sign in with google code
const signIn=()=>{
    auth.signInWithPopup(provider).then((result)=>{
        dispatch({
            type:actionTypes.SET_USER,
            user:result.user,
        });
    }
        
        ).catch(error=>alert(error.message))
}; 
  return(
      <>
   <div className="login"> 
    <div className="login__container">
       <img src="" alt="" /> 
    
    <div className="login__text">
        <h1>Sign in to WhatApp</h1>
    </div>

    {/* material ui button */}
    <Button  onClick={signIn}>  
        SIGN IN WITH GOOGLE 
    </Button>
   </div>
   </div>
   </>
  );
}

export default Login;
