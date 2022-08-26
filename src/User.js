import Navigation from "./components/Navbar";
import { Button, Card, Form, Image } from "react-bootstrap";
import { auth, googleAuthProvider, signInWithGoogle, getPosts, 
    getUser, follow_unfollow, getFollows, getFollowers, getFollowersNumber, changePhotoURL } from "./utils/firebase";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import Post from "./Post";

export default function User() {
    const [posts, setPosts] = useState([]);
    const [loggedFollows, setLoggedFollows] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [user, setUser] = useState({
        "uid": "",
    });
    const pictureRef = useRef();
    const [changeLoading, setChangeLoading] = useState(false);
    const [loggedUid, setLoggedUid] = useState(false);

    useEffect(() => {
        //Get user uid async
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                setFollows();
                setLoggedUid(user.uid);
                setFollowersNumber();
            } else {
                console.log("User not logged in");
                window.location.href = '/';
            }
        }
        );
    }, []);

    async function setFollows() {
        const result = await getFollows();
        console.log(result);
        setLoggedFollows(result);
    }

    async function follow_unfollow_update(uid) {
        const result = await follow_unfollow(uid);
        setFollows();
        setFollowersNumber();
    }

    async function setFollowersNumber(){
        const result = await getFollowersNumber(window.location.href.split("/")[4]);
        setFollowers(result);
    }

    useEffect(() => {
        const uid = window.location.href.split("/")[4];
        //Get uid from url
        console.log(uid);
        //Get user from uid
        getUser(uid).then((result) => {
            if(result) {
                setUser(result);
            } else {
                console.log("User not found");
            }
        });
    }, []);
    
    async function handleChangePhoto(){
        setChangeLoading(true);
        await changePhotoURL(pictureRef.current.value);
        setChangeLoading(false);
    }

    return (
        <>
            {user.uid === loggedUid ? (
                        <Card className='mx-auto col-md-10 mt-4'>
                                    <Card.Body>
                                        <Card.Title><h1>Your Profile</h1></Card.Title>
                                        <Card.Text>
                                            <Image src={user.photoURL} roundedCircle width={150}/>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >Change Photo URL</Form.Label>
                                                <Form.Control ref={pictureRef} type="text" placeholder="Enter new photo URL" />
                                                <Button onClick={() => handleChangePhoto()} variant="primary" type="submit">{changeLoading ?
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : "Change"}</Button>
                                            
                                            </Form.Group>
                                            Your UserID: {user.uid} <br></br>
                                            Followers: {followers}
                                        </Card.Text>
                                            </Card.Body>
                                        </Card>
            ) : (
                <Card className='mx-auto col-md-10 mt-4'>
                <Card.Body>
                    <Image src={user.photoURL} roundedCircle width={150}/>
                    <Card.Title><h1>{user.displayName}
                    {user.verified ? <FaStar color="blue" /> : null}
                    </h1></Card.Title>
                    <Card.Text>{followers} followers</Card.Text>
                    <Card.Text>{user.email}</Card.Text>
                    <Card.Text>{user.uid}</Card.Text>
                    {loggedFollows.includes(user.uid) ? <Button onClick={() => {follow_unfollow_update(user.uid)}} variant="danger">Unfollow</Button> : <Button onClick={() => {follow_unfollow_update(user.uid)}}>Follow</Button>}
                </Card.Body>
                </Card>
            )
            }
            
        </>
    )
}