import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import {firestore} from "fbase";
import { 
  addDoc,
  collection,
  onSnapshot 
} from "firebase/firestore";



const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets,setNweets]= useState([]);

    useEffect(()=>{
      onSnapshot(collection(firestore, "nweets"), (snapshot) => {
          const nweetArray = snapshot.docs.map(doc =>({
            id:doc.id
            ,...doc.data(),
          }));
          setNweets(nweetArray);
      });

    },[])

    const onSubmit = async (event) => {
      event.preventDefault();

      try {
            await addDoc(collection(firestore, "nweets"), {
            text:nweet,
            createdAt: Date.now(),
            creatorId:userObj.uid,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        
        setNweet("");
    };
    
    const onChange = (event) => {
    const {
        target: { value }
    } = event;
    setNweet(value);
    };

    console.log(nweets);
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map(nweet=> 
                <Nweet 
                  key={nweet.id} 
                  nweetObj={nweet} 
                  isOwner={nweet.creatorId === userObj.uid}
                />
            )}
        </div>
      </div>
    );
  };
  export default Home;