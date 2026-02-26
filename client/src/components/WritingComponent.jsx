//Display work in progress article

import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { breakingColour } from '../colours';
import { ArticleContentEditor } from "../components/ArticleContentEditor.jsx"
import { useParams } from "react-router-dom";

import { getArticle } from '../api.js';

import { imageUpload } from '../api.js';

const imgBasePath = "https://static-images-tnt-news.cta-training.academy"

export function WritingComponent({ formData, setFormData, onFormChange, onSubmit, formRef, editorRef }) {
    const initialValue = ""
    console.log(imgBasePath)
    
    // below will be moved to useEffect that makes the api call when id changes and is not null

    useEffect(() => {
        if(formData.article_text && editorRef.current){
            editorRef.current.setContent(formData.article_text)
        }

    }, [formData])


    const images_upload_handler = (blobInfo, progress) => { 
        return new Promise((resolve, reject) => {
            imageUpload(blobInfo)
                .then((url) => {
                    resolve(url); 
                })
                .catch((err) => {
                    console.error("image upload error:", err);
                    reject({ message: 'upload failed', remove: true });
                });
        });
    }

    const file_picker_callback = useCallback((callback, value, meta) => {
        if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'jpeg');

            input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();

                reader.onload = function () {
                    const id = 'blobid' + (new Date()).getTime();
                    const blobCache = editorRef.current.editorUpload.blobCache;
                    const base64 = reader.result.split(',')[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    console.log(blobInfo)

                    callback(blobInfo.blobUri(), { title: file.name });
                };

                reader.readAsDataURL(file);
            };

            input.click();
        }
    }, []);

    return (
        <div>
            <Form onSubmit={onSubmit} ref={formRef}>
                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Title</Form.Label>
                    <Form.Control type="text-muted" placeholder="Enter Title" name="article_title" value={formData.article_title || ""} onChange={onFormChange} style={{ fontFamily: "anta" }}/>
                </Form.Group>
                <p></p>

                <Form.Group>
                    <Form.Label style={{ fontFamily: "orbitron" }}>Thumbnail</Form.Label>
                    <Form.Control type="file" placeholder="Upload your Thumbnail" name="article_image_path" onChange={onFormChange} accept="image/jpeg" style={{ fontFamily: "anta" }} />
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
                            content_style: 'body { fontFamily: orbitron; font-size:14px }',
                            images_files_types: "jpg,jpeg",
                            images_upload_handler,  
                            file_picker_types: 'image',
                            paste_data_images: true,
                            images_upload_base_path: `${imgBasePath}/`,
                            automatic_uploads: true,
                            file_picker_callback
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
