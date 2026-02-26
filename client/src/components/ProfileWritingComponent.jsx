//Display work in progress article

// import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { breakingColour } from '../colours';
// import { ArticleContentEditor } from "../components/ArticleContentEditor.jsx"
import { useParams } from "react-router-dom";

// import { getArticle } from '../api.js';
import { getUserProfile } from '../api.js';
import { imageUpload } from '../api.js';

const imgBasePath = "https://static-images-tnt-news.cta-training.academy"

export function ProfileWritingComponent({ formData, setFormData, onFormChange, onSubmit, formRef }) {
    const initialValue = ""
    console.log(imgBasePath)
    

    useEffect(() => {

    }, [formData])


    return (
        <div>
            <Form onSubmit={onSubmit} ref={formRef}>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>UserName</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter User Name" name="user_username" value={formData.user_username || ""} onChange={onFormChange} style={{ fontFamily: "anta" }}/>
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>First Name</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter First Name" name="user_first_name" value={formData.user_first_name || ""} onChange={onFormChange} style={{ fontFamily: "anta" }}/>
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Surname</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter Last Name" name="user_surname" value={formData.user_surname || ""} onChange={onFormChange} style={{ fontFamily: "anta" }}/>
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Profile Image</Form.Label>
                    <Form.Control type="file" placeholder="Upload your profile image" name="profile_path_pic_path" onChange={onFormChange} accept="image/jpeg" style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Email</Form.Label>
                    <Form.Control type="text-muted" name="user_email" value={formData.user_email} onChange={onFormChange} rows={4} style={{ fontFamily: "anta" }} />
                </Form.Group>
                <p></p>
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
