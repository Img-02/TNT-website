//Display work in progress article

import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { breakingColour } from '../colours';
import { ArticleContentEditor } from "../components/ArticleContentEditor.jsx"
import { useParams } from "react-router-dom";
import { WritingComponent } from '../components/WritingComponent.jsx';
import { articles } from "../mock-data/articles.js"
import { getArticle } from '../api.js'

export function JournalistPage() {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const initialValue = "This is where we will import saved progress "
    const [article, setArticle] = useState(null)
    const { id } = useParams()

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: "",
        summary: "",
    })

    const submitForm = (event) => {
        event.preventDefault()
        //event.stopPropagation()

        console.log(formData)

        console.log("form submitted")
        const form = event.currentTarget

        if (form.checkValidity() === true) {
            console.log("form is valid")
        }
        else {
            console.log("form is invalid")
        }

        setShowValidationText(true)
    }

    const onFormChange = (event) => {
        console.log(event.target)
        const { name, value } = event.target;

        console.log(name, value)

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // below will be moved to useEffect that makes the api call when id changes and is not null

    useEffect(() => {
        const loadArticle = async(id) => {
            try {
            const article = getArticle(id)

            if (editorRef.current) {
                editorRef.current.setContent(article.text)
            }

            if (article) {
                setFormData({
                    ...article
                })
            }

            }catch(error) {
                console.log(error)
            }
        }

        if (id) {
            loadArticle(id)
        }

    }, [id])

    return (
        <Container className="mb-2">
            <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            <div>
                <p></p>
                <h1 className="text-center" style={{ fontFamily: "orbitron" }}>Welcome Default Story Writer!</h1>
            </div>

            <WritingComponent formData={formData} setFormData={setFormData} onFormChange={onFormChange} onSubmit={submitForm} />

            {/* <Form>
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

            </Form> */}
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
