//Display work in progress article
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { WritingComponent } from '../components/WritingComponent.jsx';
import { getArticle } from '../api.js'
import { imageUpload, updateArticle, uploadArticle } from '../api.js';

export function JournalistPage() {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const [newArticle, setNewArticle] = useState(null)

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
            setNewArticle(false)
        }
        else {
            setNewArticle(true)
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

        if(name == "article_image_path"){
            setFormData({
                ...formData,
                [name]: event.target.files[0],
            });
            
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

    };

    const onSaveClicked = async () => {
        const article_text = editorRef.current.getContent()
        const journalistId = 0

        const article = {
            ...formData,
            article_text,
            article_journalist_id: journalistId,
            article_status_id: 1,
        }

        // post request if the article is new
        if(newArticle) {
            try {
                const res = await uploadArticle(article)
                alert(`Article uploaded succesfully with id = ${res}`)
            }catch(error) {
                console.log("error")
                alert(`Failed to upload new article`)
            }
        }
        else {
            try {
                const res = await updateArticle(article)
                alert(`Article updated succesfully with id = ${res}`)
            }catch(error) {
                console.log("error")
                alert(`Failed to update article`)
            }
            // put request for already existing article,
            // the article_id will already be in the formData, which is unpacked into article object
        }
    }


    const uploadNewArticle = async(article) => {
        try {
            const article_id = await uploadArticle(article)
            alert(`Article uploaded succesfully with ID ${article_id}`)

        }catch(error) {
            console.log(error)
            alert(`Failed to update article please try again later`)
        }
    }


    const onSubmitClicked = async () => {
        // form data state variable contains all the articles already
        // use a ref to grab the tinymce content from child component

        // REPLACE THIS WITH JOURNALIST ID FROM LOCAL STORAGE

        //await editorRef.current.uploadImages()

        const article_text = editorRef.current.getContent()
        const journalistId = 0


        const timestamp = Date.now()
        const currentDateAsString = new Date(timestamp).toISOString()


        // TODO - UPLOAD IMAGES TO S3 AND GET THEIR FILENAME TO STORE AS IMAGE PATH


        const article = {
            ...formData,
            article_text,
            article_journalist_id: journalistId,
            article_submitted_at: currentDateAsString,
            aritcle_draft_number: 1,
            article_status_id: 2,
        }

        // first need to upload image to s3 if the image is new
        if(newArticle && article.article_image_path){
            const reader = new FileReader()
            console.log(article.article_image_path)

            reader.onload = async () => {
                console.log(reader.result)
                const img_link = await imageUpload(reader.result)

                article.article_image_path = img_link

                uploadNewArticle(article)
            }

            reader.onerror = (event) => {
                console.log(event)
                return;
            }

            reader.readAsArrayBuffer(article.article_image_path)
        }
        else if(newArticle) {
            uploadNewArticle(article)
        }
        else if(!newArticle) {

            try {
                const article_id = await updateArticle(article)
                alert(`Article ID ${article_id} succesfully with ID `)

            }catch(error) {
                console.log("error")
                alert(`Failed to update article please try again later`)
            }
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
