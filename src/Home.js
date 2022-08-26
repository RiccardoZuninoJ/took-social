import Navigation from "./components/Navbar";
import { Button, Card } from "react-bootstrap";
import { auth, googleAuthProvider, signInWithGoogle, getPosts } from "./utils/firebase";
import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //Get user uid async
        auth.onAuthStateChanged(user => {
            if(user){
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

    return (
        <>
            {/* Add a centered hero */}
            <Card className='mx-auto col-md-10 mt-4'>
                <Card.Body>
                    <Card.Title>Home</Card.Title>
                    <Card.Text>
                        <Button onClick={() => window.location.href = '/post'} className='mb-4'>Add Post</Button>
                        <br></br>
                        </Card.Text>
                    <Card.Title>Posts from people you follow</Card.Title>
                    <Card.Text>
                        { posts ? posts.map((post) => {
                            return (
                                <Post post={post} key={post.uid} />
                            )
                        } ) : <p>No posts</p> } 
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}