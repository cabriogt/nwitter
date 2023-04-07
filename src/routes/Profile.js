import React, {useState } from "react";
import { authService} from "fbase";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";





const Profile = ({userObj, refreshUser}) => { 
    const history = useHistory();
    const [newDisplayName,setNewDisplayName]= useState(userObj.displayName);


    const onLogOutClick=()=> {
        authService.signOut();
        history.push("/");
    }

    // const getMyNweets= async()=>{
    //     const q = query(collection(firestore,"nweets"),where("creatorId","==",userObj.uid));
    //     const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //     })

    // }

    // useEffect(()=>{
    //     getMyNweets();
    // },[])
     const onChange =(event)=>{
        const {
            target: { value }
        } = event;
        setNewDisplayName(value);
     }

     const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
        refreshUser();
     }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} type="text" placeholder="DisplayName" value={newDisplayName} className="formInput" autoFocus/>
                <input type="submit" value="Update Profile" className="formBtn" style={{marginTop: 10,}} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}> Log Out</span>
        </div>
    
    );  
};

export default Profile;