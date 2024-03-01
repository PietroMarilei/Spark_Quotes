import { useState } from "react"
import {auth, googleProvider} from "../config/firebase"

import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth" 

 const AuthComponent = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(AuthComponent, email, password)
        } catch(err ){
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        
      } catch (err) {
        console.error(err);
      }
    };

    const logOut = async () => {
      try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    };
    return (
       <div>
        <input placeholder="email" onChange={(e)=> {setEmail(e.target.value)}}/>
        <input placeholder="password" type="password"onChange={(e)=> {setPassword(e.target.value)}}/>

        <button onClick={signIn}>sing in</button>


        <button onClick={signInWithGoogle}>Sign in with google</button>

        <button onClick={logOut}>Log out</button>
       </div> 
    )
}

export default AuthComponent;