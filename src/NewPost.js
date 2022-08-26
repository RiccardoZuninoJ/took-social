import { Card, Button, InputGroup, Form } from "react-bootstrap"
import { useRef, useState } from "react"
import { addPost } from "./utils/firebase";

export default function NewPost(){
    const text = useRef();
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(text.current.value);
        if(await addPost(text.current.value)){
            setSuccess(true);
        }

    }

    return (
        <>
            {/* Add a centered hero */}
            <Card className='mx-auto col-md-10 mt-4'>
                <Card.Body>
                    {success ? <p className="text-success fw-bold">Post added</p> : <></>}

                    <Card.Title>Add a new Post</Card.Title>
                    <Card.Text>
                        <Button onClick={() => window.location.href = '/home'} className='mb-4'>Go back</Button>
                        <br></br>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Post text" ref={text} />
                            </InputGroup>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>                        
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}