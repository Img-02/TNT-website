import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { breakingColour } from '../colours';



export function JournalistPage() {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const initialValue = "This is where we will import saved progress "

    return (

        <Container className="mb-2">
            
            <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            <div>
                <p></p>
                <h1 className="text-center" style={{ fontFamily: "orbitron" }}>Welcome Default Story Writer!</h1>
            </div>
            
            <Form>
                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Title</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter Title" style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Thumbnail</Form.Label>
                    <Form.Control type="file" placeholder="Upload your Thumbnail" style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Summary</Form.Label>
                    <textarea className="form-control" type="text-muted" placeholder="Enter Title" rows={4} style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Content</Form.Label>
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue={initialValue}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic  | bullist numlist | help',
                            content_style: 'body { fontFamily: orbitron; font-size:14px }'
                        }}
                    />
                </Form.Group>

            </Form>
            <p>

            </p>

            <div className="d-flex gap-2">

                <Button className="orbitron" variant="warning">SUBMIT</Button>

                <Button className="orbitron" variant="primary">SAVE</Button>

                <Button className="orbitron" variant="secondary">SAVE and EXIT</Button>
            </div>

        </Container>
    )
}


// backcolor | alignleft aligncenter ' +
//             'alignright alignjustify
// outdent indent | ' + 'image
