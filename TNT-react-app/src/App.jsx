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
import { Container } from "react-bootstrap";
import { ArticleCard } from "./components/ArticleCard.jsx";

import {Col} from "react-bootstrap"
import {Row} from "react-bootstrap"

import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"



export default function App() {

  return (
    <div className="App">
      <header>
        <nav>    
          <div>
            <img className="img-fluid rounded" decoding="async" src="/image.png" alt="Site logo" width={100} height={100} align="start"/> 
            <NavLink to="/" end>Home</NavLink>
            <NavLink to='*' end>Random</NavLink>
          </div>
        </nav>   
      </header>

        <Container>
        <div>
          <Row xs={1} md={3} className="g-4">
            {articles.map((article)=> (
              <ArticleCard article={article}/>
        ))}
        </Row>
        </div>
        </Container>
      </div>
)}
// export default App;
