//Display work in progress article

import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { breakingColour } from '../colours';
import { ArticleContentEditor } from "../components/ArticleContentEditor.jsx"
import { useParams } from "react-router-dom";

import { getArticle } from '../api.js';


export function WritingComponent({ formData, setFormData, onFormChange, onSubmit }) {
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const initialValue = "This is where we will import saved progress "

    const [article, setArticle] = useState(null)

    const { id } = useParams()
    
    // below will be moved to useEffect that makes the api call when id changes and is not null
    useEffect(() => {
        if(formData.article_text && editorRef.current){
            editorRef.current.setContent(formData.article_text)
        }

    }, [formData])


    // useEffect(() => {
    //     const loadArticle = async(id) => {
    //         try {
    //             const article = getArticle(id)

    //             if (editorRef.current) {
    //                 editorRef.current.setContent(article.text)
    //             }

    //             if (article) {
    //                 setFormData({
    //                     ...article
    //                 })
    //             }

    //             }catch(error) {
    //                 console.log(error)
    //             }
    //     }

    //     if (id) {
    //         loadArticle(id)
    //     }
        
    // }, [id])


    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Title</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter Title" name="article_title" value={formData.article_title || ""} onChange={onFormChange} style={{ fontFamily: "anta" }}/>
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Thumbnail</Form.Label>
                    <Form.Control type="file" placeholder="Upload your Thumbnail" name="article_image_path" onChange={onFormChange} style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Summary</Form.Label>
                    <textarea className="form-control" type="text-muted" name="article_summary" value={formData.article_summary} onChange={onFormChange} placeholder="Enter Title" rows={4} style={{ fontFamily: "anta" }} />
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
