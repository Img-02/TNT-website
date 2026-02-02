import { Routes, Route, NavLink } from "react-router-dom";

// import Home from "./components/Home";
// import About from "./components/About";
// import BlogPost from "./components/BlogPost";
// import NotFound from "./components/NotFound";
import { HomePage } from "./views/HomePage.jsx"
import { articles } from "./mock-data/articles.js"
import "./App.css"

function App() {

  return (
    <div className="App">
      {/* <header>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
        </nav>
      </header> */}

      <header>  
        <img decoding="async" src="/image.png" alt="Site logo"/>  
        <nav>    
          <div>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to='*' end>Random</NavLink>
            {/* <a class="active" href="#home">Home</a>        
            <a href="#contact">Contact</a>        
            <a href="#about">About</a> */}
            
          </div>
        </nav>  
      </header>


      <main>
        <HomePage articles={articles}>
        </HomePage>


        {/* <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes> */}
      </main>
    </div>
  );
}

export default App;
