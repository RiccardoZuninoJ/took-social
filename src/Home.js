import Navigation from "./components/Navbar";
import { Button, Card, Form } from "react-bootstrap";
import { auth, googleAuthProvider, signInWithGoogle, getPosts } from "./utils/firebase";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Post from "./Post";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const search = useRef();

    useEffect(() => {
        //Get user uid async
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                //Get posts
                getSetPosts();
            } else {
                console.log("User not logged in");
                window.location.href = '/';
            }
        }
        );
    }, []);

    async function getSetPosts() {
        const result = await getPosts();
        console.log(result);
        setPosts(result);
    }

    function handleSearch() {
        //Get search query
        const query = search.current.value;
        console.log(query);
        //Go to /user/:uid
        window.location.href = `/user/${query}`;
    }

    return (
        <>
            {/* Add a centered hero */}
            <Card className='mx-auto col-md-10 mt-4'>
                <Card.Body>
                    <Card.Title><h1>Home</h1></Card.Title>
                        <h3>Search an user</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Search using UserID</Form.Label>
                            <Form.Control type="text" placeholder="Search" ref={search} />
                            <Button onClick={() => handleSearch()} variant="primary" type="button">Search</Button>
                        </Form.Group>
                    <Card.Text>
                        <Button onClick={() => window.location.href = '/post'} className='mb-4'>Add Post</Button>
                        <br></br>
                    </Card.Text>
                    <Card.Title>Posts from people you follow</Card.Title>
                    <Card.Text>
                        {posts ? posts.map((post) => {
                            return (
                                <Post post={post} key={post.uid} />
                            )
                        }) : <p>No posts</p>}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}