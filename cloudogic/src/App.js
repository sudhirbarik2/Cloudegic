import './App.css';
import React from 'react';
import './App.css';
import Home from './components/home';
import AddProject from './components/addProject';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">&nbsp;&nbsp;&nbsp;CE Assignment 2022</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
