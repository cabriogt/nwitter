import React, { useState } from "react";
import { authService } from "fbase";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";

const AuthForm = () =>{

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [newAccount,setNewAccount]= useState(true);
    const [error,setError]=useState("")

    const onChange =(event)=>{
        const {target:{name,value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }

    }

    const onSubmit= async(event)=>{
        event.preventDefault();
        let data;
        try {
            if(newAccount){
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                )
            }else{
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            }
            console.log(data);
            
        } catch (error) {
            const {message} = error;
            setError(message.replace("Firebase: ", "").replace("(auth/weak-password).",""));            
        }
    };

    const toggleAccount= () => setNewAccount((prev)=> !prev)


    return(
        <>
            <form onSubmit={onSubmit} className="container" >
                <input 
                    onChange={onChange} 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    value={email}
                    className="authInput" 
                    required>
                </input>
                <input 
                    onChange={onChange} 
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    value={password}
                    className="authInput" 
                    required>
                </input>
                <input 
                    type="submit" 
                    className="authInput authSubmit"
                    value={newAccount ? "Create Account" : "Log In"}>
                </input>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )




}

export default AuthForm;