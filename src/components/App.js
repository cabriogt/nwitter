import React, { useEffect, useState }  from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn,setIsLoggedIn]= useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
      console.log(user);
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          email:user.email,
          uid:user.uid,
          updateProfile:(args)=> user.updateProfile(args),
        });
      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true)
    });

  },[])

  const refreshUser =()=>{
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      email:user.email,
      uid:user.uid,
      updateProfile:(args)=> user.updateProfile(args),
    });
  }

  return (
    <>
    {init ? (
      <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/>

    ) : (
      "Initializing..."
    )}
    </>
  )
}

export default App;
