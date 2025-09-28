import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./components/Home";
import Form from "./components/form.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>My Recipe Blog</h1>
        <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="/new">Create Recipe</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<Form />} />
        </Routes>
      </main>
    </div>
  );
}