//Display work in progress article

import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { WritingComponent } from '../components/WritingComponent.jsx';
import { getArticle } from '../api.js'
import { imageUpload } from '../api.js';

export function JournalistPage() {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        article_title: "",
        article_text: "",
        article_image_path: "",
        article_summary: "",
        article_submitted_at: "",
        article_historical_date: "",
        article_status_id: 0,
        article_journalist_id: 0,
        article_editor_id: 0,
        aritcle_draft_number: 0,
    })


    const formRef = useRef(null)

    useEffect(() => {
        const loadArticle = async(id) => {
            try {
            const article = await getArticle(id)

            console.log("loaded article", article)

            if (editorRef.current) {
                editorRef.current.setContent(article.article_text)
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

        if (Number(id)) {
            loadArticle(id)
        }

    }, [id])


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



    const onSubmitClicked = async () => {
        // form data state variable contains all the articles already
        // use a ref to grab the tinymce content from child component

        // REPLACE THIS WITH JOURNALIST ID FROM LOCAL STORAGE

        await editorRef.current.uploadImages()
        const article_text = editorRef.current.getContent()
        console.log(article_text)
        const journalistId = 0

        const timestamp = Date.now()
        const currentDateAsString = new Date(timestamp).toISOString()


        // TODO - UPLOAD IMAGES TO S3 AND GET THEIR FILENAME TO STORE AS IMAGE PATH


        const article = {
            ...formData,
            article_journalist_id: journalistId,
            article_submitted_at: currentDateAsString,
            aritcle_draft_number: 1,
        }

        console.log(article)

    }
    // below will be moved to useEffect that makes the api call when id changes and is not null

    return (
        <Container className="mb-2">
            <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            <div>
                <p></p>
                <h1 className="text-center" style={{ fontFamily: "orbitron" }}>Welcome Default Story Writer!</h1>
            </div>

            <WritingComponent formData={formData} setFormData={setFormData} onFormChange={onFormChange} onSubmit={submitForm} editorRef={editorRef} formRef={formRef} />

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

                <Button className="orbitron" onClick={onSubmitClicked} variant="warning">SUBMIT</Button>

                <Button className="orbitron" variant="primary">SAVE</Button>

                <Button className="orbitron" variant="secondary">SAVE and EXIT</Button>
            </div>

        </Container>
    )
}


// backcolor | alignleft aligncenter ' +
//             'alignright alignjustify
// outdent indent | ' + 'image
