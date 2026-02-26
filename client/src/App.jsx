import { Routes, Route, NavLink, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
// import Home from "./components/Home";
// import About from "./components/About";
// import BlogPost from "./components/BlogPost";
// import NotFound from "./components/NotFound";
import { HomePage } from "./views/HomePage.jsx"
// import { articles } from "./mock-data/articles.js"
import "./App.css"
// import Image from 'react-bootstrap'
import { Container, Navbar, Nav } from "react-bootstrap"
import { ArticlePage } from "./views/ArticlePage.jsx"
import { SignUpPage } from "./views/SignUpPage.jsx"
import { ProfilePage } from "./views/ProfilePage.jsx"
import { LogInPage } from "./views/LogInPage.jsx"
import { JournalistPage } from "./views/JournalistPage.jsx"
import { EditorPage } from "./views/EditorPage.jsx"
import { EditorHomePage } from "./views/EditorHomePage.jsx"
import { JournalistHomePage } from "./views/JournalistHomePage.jsx"
// import { EditorWritingPage } from "./views/EditorWritingPage.jsx"
import { ProfileEdit } from  "./views/ProfileEdit.jsx"
import { backgroundColour } from "./colours.js"
import  {ProfileEditPassword } from "./views/ProfileEditPassword.jsx"
import { useEffect, useState } from "react"

import { getMainPageArticles } from "./api.js"

export default function App() {
  const [awsWorking, setAwsWorking] = useState(false)
  const [mainPageArticles, setMainPageArticles] = useState([])
  const [status, setStatus] = useState("loading")
  const [article, setArticle] = useState([])

  // const [isJournalist, setIsJournalist] = useState(false)
  // const [isUser, setIsUser] = useState(false)
  // const [isEditor, setIsEditor] = useState(false)
  
  //get role from local storage
  const role_id = 1

  // health check and set the background
  useEffect(() => {
    const healthCheck = async () => {
      try {
        const response = await fetch('/api/healthcheck')

        if (response.ok){
          console.log("AWS Connected")
          setAwsWorking(true)
        }
        else {
          throw new Error("AWS backend not working")
        }
      } catch (error) {
        console.log(error)
        setAwsWorking(false)
      }
    }

    async function mainPageFunction () {
      try {
        const articles = await getMainPageArticles();
        console.log(articles)
        setMainPageArticles(articles)
        setStatus("loaded")

      }
      catch(error) {
        console.log(error)
      }

      }
    
    const body = document.querySelector("body")

    if(body){
      body.style.backgroundColor = backgroundColour
    }

    healthCheck()
    mainPageFunction()



     }, []) 

    //const users = await mockDatabase.getAllUsers()

//////////Main page articles to load the main page ///////////////////////////////////////////////////////

  
  // health check and set the background
  // useEffect(() => {
  // async function mainPageFunction () {
  //     try {
  //       const response = await fetch('/api/mainpage')

  //       if (!response.ok){
  //         throw new Error("API error")
  //       }
        
  //       const data = await response.json()
  //       console.log(data.articles)
  //       setMainPageArticles(data.articles)
  //       setStatus("loaded")

  //     } catch {
  //       console.log("Error in main page App.jsx")
  //       setStatus("error")
  //     }
  //   }
  //   mainPageFunction()
  //   console.log(mainPageArticles)
    

  // }, []) 
  
  // const [article, setArticles] = useState([])
  // try {
  //   const [mainPageArticles, setMainPageArticles] = await Promise.all([
  //     fetch("/api/articles")
  //   ])

  //   const articleData = await mainPageArticles.json()

  //   setArticles(articleData.article || [])
  // } catch (err) {
  //   console.error("Failed to update article")
    
  // }

  

  return (
    <div className="App flex-column d-flex min-vh-100">
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top" data-bs-theme="dark" >
        <Container className="orbitron"> 
            {awsWorking && (<div id="healthcheck"/>)}
            <Navbar.Brand className="fw-bolc text-center" as={Link} to="/">
            <img className="img-fluid rounded" decoding="async" src="/image.png" alt="Site logo" width={100} height={100} align="start"/>
            </Navbar.Brand>
            <Navbar.Brand>T.N.T</Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/journalisthomepage">Journalist Home Page</Nav.Link>
            <Nav.Link as={NavLink} to="/editorhomepage">Editor Home Page</Nav.Link>
            <Nav.Link as={NavLink} to="/profile">Profile Page</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
          </Nav>
        </Container>   
      </Navbar>

      <main className="Flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage articles={mainPageArticles}/>}/>
          <Route path="/article/:id" element={<ArticlePage />}/> 
          <Route path="/editorpage/:id" element={<EditorPage />}/> 
          <Route path="/journalistpage/:id" element={<JournalistPage/>}/> 
          <Route path="/journalistpage" element={<JournalistPage/>}/> 
          {/*article page route to specific article id, same for breaking and normal news*/}
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/journalisthomepage" element={<JournalistHomePage/>}/>
          <Route path="/editorhomepage" element={<EditorHomePage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/profileEdit/:id" element={<ProfileEdit/>}/>
          <Route path="/editor-writing" element={<EditorWritingPage/>}/>
          <Route path="/editor-writing" element={<ProfileEditPassword/>}/>
        </Routes>
      </main> 
     
      <footer className="mt-auto">
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" >
        <Container className="orbitron">
          <Nav className="me-auto d-flex gap-3"> 
            <Navbar.Brand>T.N.T</Navbar.Brand>
            <Nav.Link as={NavLink} to="/">Contact</Nav.Link>
            <Navbar.Text>Terms of Use</Navbar.Text>
            <Navbar.Text>About T.N.T</Navbar.Text>
            <Navbar.Text>Privacy Policy</Navbar.Text>
            <Navbar.Text>Cookies</Navbar.Text>
            <Navbar.Text>Accessibility Help</Navbar.Text>
          </Nav>
        </Container>   
      </Navbar>
      </footer>
      </div>
  )}
