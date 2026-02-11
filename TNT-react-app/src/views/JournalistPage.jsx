import { Editor } from '@tinymce/tinymce-react';
import { Container } from 'react-bootstrap';
import { useRef } from 'react';
import { Form } from 'react-bootstrap';

export function JournalistPage() {

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  
    return(
        
        
        
        <Container>
            <div>
            <p></p>
            <h1 className="text-center"  style={{ fontFamily: "orbitron"}}>Welcome Loser </h1>
            </div>
        <Form>
            <Form.Group>
                <Form.Label style={{ fontFamily: "orbitron"}}>Title</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter Title" style={{ fontFamily: "anta"}}/>
            </Form.Group>
            <p></p>
            
            <Form.Group>
                <Form.Label style={{ fontFamily: "orbitron"}}>Thumbnail</Form.Label>
                <Form.Control type="file" placeholder="Upload your Thumbnail" style={{ fontFamily: "anta"}}/>
            </Form.Group>
            <p></p>

            <Form.Group>
                <Form.Label style={{ fontFamily: "orbitron"}}>Summary</Form.Label>
                <textarea className="form-control"type="text-muted" placeholder="Enter Title" rows = {4} style={{ fontFamily: "anta"}}/>
            </Form.Group>
            <p></p>

            <Form.Group>
                <Form.Label style={{ fontFamily: "orbitron"}}>Content</Form.Label>
                <Editor
                    apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue=""
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
        <button  style={{ fontFamily: "orbitron"}} onClick={log}>Log editor content</button>

        </Container>
        )
}


// backcolor | alignleft aligncenter ' +
//             'alignright alignjustify
// outdent indent | ' + 'image
