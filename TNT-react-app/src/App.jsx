import { Routes, Route, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from "./components/Home";
// import About from "./components/About";
// import BlogPost from "./components/BlogPost";
// import NotFound from "./components/NotFound";
import { HomePage } from "./views/HomePage.jsx"
import { articles } from "./mock-data/articles.js"
import "./App.css"
// import Image from 'react-bootstrap'
import { Container, Navbar } from "react-bootstrap";
import { ArticleCard } from "./components/ArticleCard.jsx";
import { BreakingNewsCard } from "./components/BreakingNewsCard.jsx"

import {Col} from "react-bootstrap"
import {Row} from "react-bootstrap"
import { Nav } from "react-bootstrap";
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"



export default function App() {

  const breakingArticles = articles.filter(article => article.isBreaking)
  const otherArticles = articles.filter(article => !article.isBreaking)

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top" data-bs-theme="dark">
        <Container>   
            <img className="img-fluid rounded" decoding="async" src="/image.png" alt="Site logo" width={100} height={100} align="start"/>
            <Navbar.Brand className="fw-bolc text-center">T.N.T</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link to="/" end>Home</Nav.Link>
            <Nav.Link to='*' end>Random</Nav.Link>
          </Nav>
        </Container>   
      </Navbar>
      <Navbar className="justify-content-center">
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
          {/* hold the breaking news articles */}
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
        </Container>
      </div>
  )}
