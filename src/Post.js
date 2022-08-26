import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {handleLike, auth, getPost, getUserName, getFollowers} from "./utils/firebase";

export default function Post (props) {

    const [likes, setLikes] = useState(props.post.likes.length);
    const [userName, setUserName] = useState('');
    const [followers, setFollowers] = useState();

    useEffect(() => {
        getUserName(props.post.posted_by).then(name => {
            setUserName(name);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            console.log('Finally');
        } );
    } , []);

    useEffect(() => {
        getFollowers(props.post.posted_by).then(followers => {
            setFollowers(followers.length);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            console.log('Finally');
        } );
    } , []);

    async function likeHandler(){
        await handleLike(props.post.uid);
        const result = await getPost(props.post.uid);
        console.log(result.likes.length);
        setLikes(result.likes.length);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text>Post ID {props.post.uid}</Card.Text>
                <Card.Title><Link to={"/user/"+props.post.posted_by}>{userName}</Link></Card.Title>
                <Card.Text>{followers} followers</Card.Text>
                <Card.Text>
                    {props.post.text}
                </Card.Text>
                <Button variant="danger" onClick={() => likeHandler()}>{likes} Like</Button>
                <p className="text-small">(Liked {props.post.likes.map((like) => {
                    return (
                        <span key={like}>{like}</span>
                    )
                } )} )</p>
            </Card.Body>
        </Card>
    )
}