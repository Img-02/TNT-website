//Display work in progress article

import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { breakingColour } from '../colours';
import { ArticleContentEditor } from "../components/ArticleContentEditor.jsx"
import { useParams } from "react-router-dom";

import { articles } from "../mock-data/articles.js"



export function WritingComponent({ formData, setFormData, onFormChange, onSubmit }) {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const initialValue = "This is where we will import saved progress "

    const [article, setArticle] = useState(null)

    const { id } = useParams()
    
    // below will be moved to useEffect that makes the api call when id changes and is not null

    useEffect(() => {
        if(id) {

            console.log(id)
            const article = articles.find(article => article.id === id)

            // change this so it set form state similar to sign up page
            // then we can use the form state to fill out the forms
            if(article) {
                setArticle(article)
            }

            // tiny mce editor not stored in state, we modify it using the ref directly
            if(editorRef.current) {
                editorRef.current.setContent(article.text)
            }
        }

    }, [id])


    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Title</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter Title" name="title" value={formData.title} onChange={onFormChange} style={{ fontFamily: "anta" }}/>
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Thumbnail</Form.Label>
                    <Form.Control type="file" placeholder="Upload your Thumbnail" name="image" onChange={onFormChange} style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Summary</Form.Label>
                    <textarea className="form-control" type="text-muted" name="summary" value={formData.summary} onChange={onFormChange} placeholder="Enter Title" rows={4} style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Content</Form.Label>
                    <ArticleContentEditor
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
                            toolbar: 'undo redo | blocks | alignleft aligncenter alignright alignjustify' +
                                'bold italic  | bullist numlist | image | help',
                            content_style: 'body { fontFamily: orbitron; font-size:14px }'
                        }}
                    />
                </Form.Group>

            </Form>
            {/* <p>

            </p>
            <div className="d-flex gap-2">
                <Button className="orbitron" variant="warning">SUBMIT</Button>
                <Button className="orbitron" variant="primary">SAVE</Button>
                <Button className="orbitron" variant="secondary">SAVE and EXIT</Button>
            </div> */}
        </div>
    )
}


// backcolor | alignleft aligncenter ' +
//             'alignright alignjustify
// outdent indent | ' + 'image
