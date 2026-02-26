import {auth , createUserWithEmailAndPassword} from "./firebase.js";

window.Signup = (event)=>{
    event.preventdefault()

const name = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")

createUserWithEmailAndPassword(auth, name.value , email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    
}
