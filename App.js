import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth"
import firebaseConfig from './farebase.consol';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup,signOut } from "firebase/auth";



firebase.initializeApp(firebaseConfig);

function App() {

  const[user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email:'',
    photo:'',

  })

  const provider = new GoogleAuthProvider();

  const handleClick = () =>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((res) => {
        const {displayName, photoURL, email} =res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setUser(signedInUser);
        
        console.log(displayName,email, photoURL );
      })
      .catch(err =>{
        console.log(err);
        console.log(err.message);
      })
  }

  const singOut =() =>{
    const auth = getAuth();
    signOut(auth).then(() => { 
   const singOutUser ={
    isSignedIn: false,
    name: '',
    photo: '',
    email: ''
   }
   setUser(singOutUser);
})
   .catch((err) => {
  
});

  }
  return (
    <div class="App" >
      {
        user.isSignedIn ?  <button onClick={singOut}>sing out</button> :
        <button onClick={handleClick}>sing in</button>
      }
      
         {
          user.isSignedIn && <div>
            <p> Wellcome, {user.name}</p>
            <p>Your email: {user.email}</p>
            <img src={user.photo} alt="" />
          </div> 
         }
    </div>
  );
}

export default App;
