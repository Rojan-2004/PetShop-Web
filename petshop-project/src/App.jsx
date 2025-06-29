import React from 'react';

import './App.css'
import Footer from './Component/Footer'
import Homepage from './Component/Homepage'
import Login from './Component/Login'
import Navbar from './Component/Navbar'
import Register from './Component/Register'
import { Routes, Route } from 'react-router-dom';


function App() { 

  return (
    <>
 <Routes> 
      <Route path="/" element={<Homepage />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
    </Routes> 


    </>
  )
}

export default App
