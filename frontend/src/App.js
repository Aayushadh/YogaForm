import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import PayForm from "./components/PayForm";
import HomePage from "./components/HomePage";
import ParticlesBg from "particles-bg";
import { ButtonGroup, Button } from "react-bootstrap";
function App({ history }) {
  return (
    
    <div className="App"> 
      <ParticlesBg type="circle" bg={true} />
      <Button variant="dark" href="/">
        <i class="fas fa-arrow-left"></i>
      </Button>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/enroll" element={<EnrollmentForm />} exact />
          <Route path="/pay/:email/:batch" element={<PayForm />} exact />
          <Route path="/pay" element={<PayForm />} exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
