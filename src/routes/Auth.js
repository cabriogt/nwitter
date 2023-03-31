import { authService, firestore } from "fbase";
import React, { useState } from "react";

function Auth(){
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
                data = await authService.createUserWithEmailAndPassword(
                    email,password
                )
            }else{
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
            
        } catch (error) {
            const {message} =error;
            setError(message.replace("Firebase: ", "").replace("(auth/weak-password).",""));            
        }
    };

    const toggleAccount= () => setNewAccount((prev)=> !prev)

    const onSocialClick= async(event)=>{
        const {target:{name}} =event;
        let provider;
        if(name === "google"){
            provider = new firestore.auth.GoogleAuthProvider();
        }else if (name === "github"){
            provider = new firestore.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }



    return(
        <div>
            <form onSubmit={onSubmit} >
                <input 
                    onChange={onChange} 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    required>
                </input>
                <input 
                    onChange={onChange} 
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    required>
                </input>
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"}>
                </input>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Git Hub</button>
            </div>
        </div>
        
    )
}


export default Auth;