// import { Container } from 'react-bootstrap';
// import { useRef, useEffect, useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";
// import { ProfileWritingComponent } from '../components/ProfileWritingComponent.jsx';
// // import { getArticle } from '../api.js'
// import { getUserProfile , updateUser } from "../api.js"



// export function ProfileEdit(){
//     const [ updateUserInState, setUpdateUser ] = useState([])
//     const { id }  = useParams()
//     const navigate = useNavigate()
//     const [currentUser, setCurrentUser] = useState()
    
//     const [ formData, setFormData ] = useState({
//             user_username: "",
//             user_surname: "",
//             user_first_name: "",
//             user_email: "",

//             // user_mail: userData.user_email,
//             // user_password: userData.user_password,
//             // user_first_name: userData.user_first_name,
//             // user_surname: userData.user_surname,
//             // user_username: userData.user_username,
//             // user_role_id: userData.user_role_id
//         })
        
//     const formRef = useRef(null)

//         useEffect(() => {
//         const loadUser = async(id) => {
//             try {
//             const user = await getUserProfile(id)
//             console.log("profile edit user loaded" + id)
//             console.log("loaded user", user)


//             if (user) {
//                 setFormData({
//                     ...user
//                 })
//                 setCurrentUser(user)

//             }

//             } catch(error) {
//                 console.log(error)
//             }
//         }

//         if (Number(id)) {
//             loadUser(id)
//             setUpdateUser(false)
//         }
//         else {
//             setUpdateUser(true)
//         }

//     }, [id])

//     const validPassword = (pwd) => {
//         // these evaluate to true or falce
//         const length = pwd.length >= 8;

//         // checks that password has uppercase
//         const upper = /[A-Z]/.test(pwd);

//         // checks that password has lowercase
//         const lower = /[a-z]/.test(pwd);

//         // checks that password has number
//         const number = /[0-9]/.test(pwd);

//         // checks that password has a special character
//         const special = /[!@#$%^&*]/.test(pwd);

//         // only leaves true values in the array and returns the length
//         const passed = [length, upper, lower, number, special].filter(Boolean).length;

//         // returns true if all password requirements are met
//         return passed === 5
//     }

//     const submitForm = (event) => {
//         event.preventDefault()
//         //event.stopPropagation()

//         console.log(formData)

//         console.log("form submitted")
//         const form = event.currentTarget

//         if (form.checkValidity() === true) {
//             console.log("form is valid")
//         }
//         else {
//             console.log("form is invalid")
//         }

//         setShowValidationText(true)
//     }


//     const onFormChange = (event) => {
//         console.log(event.target)
//         const { name, value } = event.target;

//         console.log(name, value)

//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // const onSaveClicked = async () => {

//     //     const user = {
//     //         ...formData,
//     //         user_username,
//     //         user_email,
//     //         user_first_name,
//     //         user_surname
//     //     }

//     //     // post request if the article is new
//     //     if(updateUser) {
//     //         try {
//     //             const res = await getUserProfile(user)
//     //             alert(`Article uploaded succesfully with id = ${res}`)
//     //         }catch(error) {
//     //             console.log("error")
//     //             alert(`Failed to update user  `)
//     //         }
//     //     }
//     //     else {
//     //         try {
//     //             const res = await updateUser(user)
//     //             alert(`User updated succesfully with id = ${res}`)
//     //         }catch(error) {
//     //             console.log("error")
//     //             alert(`Failed to update user`)
//     //         }
//     //         // put request for already existing article,
//     //         // the article_id will already be in the formData, which is unpacked into article object
//     //     }
//     // }


//     const onSubmitClicked = async () => {
//         // form data state variable contains all the articles already
//         // use a ref to grab the tinymce content from child component

//         // REPLACE THIS WITH JOURNALIST ID FROM LOCAL STORAGE

//         //await editorRef.current.uploadImages()
        


//         // TODO - UPLOAD IMAGES TO S3 AND GET THEIR FILENAME TO STORE AS IMAGE PATH

//         console.log(`current user TEST ${currentUser.user_username}`)
//         const user = {
//             ...formData,
//             user_username: currentUser.user_username,
//             first_name: currentUser.first_name,
//             user_surname: currentUser.user_surname,
//             user_email: currentUser.user_email,

//         //     // user_mail: userData.user_email,
//         //     // user_password: userData.user_password,
//         //     // user_first_name: userData.user_first_name,
//         //     // user_surname: userData.user_surname,
//         //     // user_username: userData.user_username,
//         //     // user_role_id: userData.user_role_id
            
//         }


//         // post request if the article is new
//         // if(updateUser) {
//         //     try {
//         //         const user_id = await uploadArticle(article)
//         //         alert(`Article uploaded succesfully with ID ${article_id}`)

//         //     }catch(error) {
//         //         console.log("error")
//         //         alert(`Failed to upload article please try again later`)
//         //     }

//         // }
//         // else {
//         //     // put request for already existing article,
//         //     // the article_id will already be in the formData, which is unpacked into article object
//             try {
//                 const user_id = await updateUser(user)
//                 alert(`User ID ${user_id} succesfully updated`)

//             }catch(error) {
//                 console.log("error")
//                 alert(`Failed to update article please try again later`)
//             }
//         }


//         //console.log(user)

    
//     // below will be moved to useEffect that makes the api call when id changes and is not null

//     return (
//         <Container className="mb-2">
//             <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
//             <div>
//                 <p></p>
//                 <h1 className="text-center" style={{ fontFamily: "orbitron" }}>Welcome User!</h1>
//             </div>

//             <ProfileWritingComponent formData={formData} setFormData={setFormData} onFormChange={onFormChange} onSubmit={submitForm} formRef={formRef}/>

//             {/* <Form>
//                 <Form.Group>
//                     <Form.Label style={{ fontFamily: "orbitron" }}>Title</Form.Label>
//                     <Form.Control type="text-muted" placeholder="Enter Title" style={{ fontFamily: "anta" }} />
//                 </Form.Group>
//                 <p></p>

//                 <Form.Group>
//                     <Form.Label style={{ fontFamily: "orbitron" }}>Thumbnail</Form.Label>
//                     <Form.Control type="file" placeholder="Upload your Thumbnail" style={{ fontFamily: "anta" }} />
//                 </Form.Group>
//                 <p></p>

//                 <Form.Group>
//                     <Form.Label style={{ fontFamily: "orbitron" }}>Summary</Form.Label>
//                     <textarea className="form-control" type="text-muted" placeholder="Enter Title" rows={4} style={{ fontFamily: "anta" }} />
//                 </Form.Group>
//                 <p></p>

//                 <Form.Group>
//                     <Form.Label style={{ fontFamily: "orbitron" }}>Content</Form.Label>
//                     <ArticleContentEditor
//                         onInit={(_evt, editor) => editorRef.current = editor}
//                         initialValue={initialValue}
//                         init={{
//                             height: 500,
//                             menubar: false,
//                             plugins: [
//                                 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
//                                 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                                 'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
//                             ],
//                             toolbar: 'undo redo | blocks | alignleft aligncenter alignright alignjustify' +
//                                 'bold italic  | bullist numlist | image | help',
//                             content_style: 'body { fontFamily: orbitron; font-size:14px }'
//                         }}
//                     />
//                 </Form.Group>

//             </Form> */}
//             <p>

//             </p>

//             <div className="d-flex gap-2">

//                 <Button className="orbitron" onClick={onSubmitClicked} variant="warning">SUBMIT</Button>

//             </div>

//         </Container>
//     )
// }


import { Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ProfileWritingComponent } from '../components/ProfileWritingComponent.jsx';
import { getUserProfile, updateUser } from "../api.js";

export function ProfileEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    user_username: "",
    user_surname: "",
    user_first_name: "",
    user_email: ""
  });

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUserProfile(id);
        console.log("Loaded user:", user);

        if (user) {
          setCurrentUser(user);
          setFormData({
            user_username: user.user_username ?? "",
            user_surname: user.user_surname ?? "",
            user_first_name: user.user_first_name ?? "",
            user_email: user.user_email ?? ""
          });
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    if (id) {
      loadUser();
    }

  }, [id]);

  const onFormChange = (event) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitClicked = async () => {
    if (!currentUser) {
      alert("No user loaded");
      return;
    }

    const userToSave = {
      ...currentUser,   // keeps user_id + role
      ...formData       // overwrites editable fields
    };

    try {
      const updatedId = await updateUser(userToSave);
      alert(`User ID ${updatedId} successfully updated`);
      navigate(`/profile`);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user");
    }
  };

  return (
    <Container className="mb-2">
      <Button 
        className="orbitron" 
        variant="primary" 
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>

      <h1 className="text-center mt-3" style={{ fontFamily: "orbitron" }}>
        Edit Profile
      </h1>

      <ProfileWritingComponent
        formData={formData}
        setFormData={setFormData}
        onFormChange={onFormChange}
      />

      <div className="d-flex gap-2 mt-3">
        <Button
          className="orbitron"
          onClick={onSubmitClicked}
          variant="warning"
        >
          SUBMIT
        </Button>
      </div>
    </Container>
  );
}
