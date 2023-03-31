import React, { useState } from "react";
import { firestore } from "fbase";
import { doc,deleteDoc,updateDoc } from "firebase/firestore";

const Nweet =({nweetObj, isOwner})=>{
    const [editing,setEditing]= useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);
    
    const NweetTextRef =doc(firestore, "nweets", `${nweetObj.id}`);

    const onDeleteClick= async()=>{
        const ok = window.confirm("Are you sure you want to delete this nweet");
        if(ok){
            await deleteDoc(NweetTextRef);
        }
    }
    
    const toggleEditing = () => setEditing((prev) => !prev);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj,newNweet);
        await updateDoc(
            NweetTextRef,
            {
                text:newNweet
            }
        )
        setEditing(false);
    };

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewNweet(value);
        };
    return(
        <div>
            {editing ? (
                    <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} type="text" placeholder="Edit your Nweet" value={newNweet} required/>
                        <input  type="submit" value="Update Nweet"/>
                    
                    </form> 
                    <button onClick={toggleEditing}>Cancel</button> 
                    </>              
                ):(
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={toggleEditing}>Edit nweet</button>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                        </>
                    )}
                </>
                
            )}
        </div>
    );
};

export default Nweet;