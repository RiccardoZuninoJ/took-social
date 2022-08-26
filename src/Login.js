import Navigation from "./components/Navbar";
import { Button, Card } from "react-bootstrap";
import { auth, googleAuthProvider, signInWithGoogle } from "./utils/firebase";
import { useState } from "react";
import { useEffect } from "react";

export default function Login() {
    auth.onAuthStateChanged(user => {
        if(user){
          console.log(user);
          //Go to /home
          window.location.href = '/home';
        } else {
          console.log("User not logged in");
        }
      });

    function handleLogin() {
        signInWithGoogle();
    }
    return (
        <>
            {/* Add a centered hero */}
            <Card className='mx-auto col-sm-5 mt-4'>
                <Card.Body>
                    <Card.Title>Log in</Card.Title>
                    <Card.Text>
                        <p>TookSocial is a simple Social Network made with Firebase and React.</p>
                        {/* Use only Google authentication */}

                        <Button onClick={handleLogin} className='mb-4'>Log in using Google</Button>
                        <br></br>
                        <p>View this on GitHub</p>

                    </Card.Text>
                </Card.Body>
            </Card>
        </>)
}