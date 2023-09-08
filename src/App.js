import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import SinglePost from "./pages/SinglePost";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useEffect, useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState()

  useEffect(() => {
    const userLS = localStorage.getItem('User')

    if (userLS) {
      setLoggedIn(true)
    }
  }, [])

  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/single-post/:id" element={<SinglePost />} />
    
        <Route path="/add-post" element={<AddPost />} />
        {!loggedIn && 
      <Route path="/login" element={<LogIn />} /> }
      {!loggedIn && 
      <Route path='/add-user' element={<SignUp />} /> }
     
     
      <Route path="*" element={<h2>Page not Found</h2>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}