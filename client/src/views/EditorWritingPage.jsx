//Display work in progress article
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { WritingComponent } from '../components/WritingComponent.jsx';
import { getArticle } from '../api.js'
import { imageUpload, updateArticle, uploadArticle } from '../api.js';

export function EditorWritingPage() {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const { id } = useParams()

    console.log(id)

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
            console.log("loading ARticle")
            loadArticle(id)
        
        }
        else {
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

    const onSaveAndExit = async () => {
        const article_text = editorRef.current.getContent()
        const article_editor_id = 0

        const article = {
            ...formData,
            article_text,
            article_editor_id,
            aritcle_draft_number: article_draft_number += 1,
            article_status_id: 2,
        }

        try {
            const article_id = await updateArticle(article)
            alert(`Article ID ${article_id} succesfully updated`)

        }catch(error) {
            console.log("error")
            alert(`Failed to update article please try again later`)
        }
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
            <p>
            </p>
            <div className="d-flex gap-2">
                <Button className="orbitron" variant="secondary" onClick={onSaveAndExit}>SAVE and EXIT</Button>
            </div>

        </Container>
    )
}


// backcolor | alignleft aligncenter ' +
//             'alignright alignjustify
// outdent indent | ' + 'image
