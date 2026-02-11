import { Routes, Route, NavLink, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from "./components/Home";
// import About from "./components/About";
// import BlogPost from "./components/BlogPost";
// import NotFound from "./components/NotFound";
import { HomePage } from "./views/HomePage.jsx"
import { articles } from "./mock-data/articles.js"
import "./App.css"
// import Image from 'react-bootstrap'
import { Container, Navbar, Nav } from "react-bootstrap";
import { ArticlePage } from "./views/ArticlePage.jsx"
import { SignUpPage } from "./views/signUpPage.jsx";
import { LogInPage } from "./views/LogInPage.jsx";
import { JournalistPage } from "./views/JournalistPage.jsx";

import { backgroundColour } from "./colours.js";

import { useEffect } from "react"

export default function App() {
  
  

  useEffect(() => {
    const body = document.querySelector("body")

    if(body){
      body.style.backgroundColor = backgroundColour
    }

  }, []) 

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top" data-bs-theme="dark" >
        <Container className="orbitron"> 
            <Navbar.Brand className="fw-bolc text-center" as={Link} to="/">
            <img className="img-fluid rounded" decoding="async" src="/image.png" alt="Site logo" width={100} height={100} align="start"/>
            </Navbar.Brand>
            <Navbar.Brand>T.N.T</Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/journalist">Journalist Page</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
          </Nav>
        </Container>   
      </Navbar>

      <main>
        <Routes>
          <Route path="/" element={<HomePage articles={articles}/>}/>
          <Route path="/article/:id" element={<ArticlePage />}/>  
          {/*article page route to specific article id, same for breaking and normal news*/}
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/journalist" element={<JournalistPage/>}/>
        </Routes>
      </main> 
     
      

      {/* <Navbar className="justify-content-center">
        <Container>
            <Navbar.Collapse>
            <Nav className="mx-auto">
            <Nav.Link href="##" end>History</Nav.Link>
            <Nav.Link href="##" end>Geography</Nav.Link>
            <Nav.Link href="##" end>Music</Nav.Link>
            <Nav.Link href="##" end>Polictical Events</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>   
      </Navbar>

      

        <Container>
          <div>
            <Row xs={1} md={2} className="g-4 mb-5">
              {breakingArticles.map(article => (
              <Col><BreakingNewsCard key={article.id} article={article}/></Col>
              ))}
            </Row>
        </div>
        <div>
          <Row xs={2} md={4} className="gx-4">
            {otherArticles.map((article) => (
              <Col>
                <ArticleCard key={article.id} article={article}/>
              </Col>
          ))}
          </Row>
        </div>
        </Container> */}
      </div>
  )}
