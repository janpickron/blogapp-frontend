import { createContext, useContext, useEffect, useState } from "react";
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

// use an authentication context
const AuthContext = createContext()

// create a custom hook useAuth() to use authentication context globally
export function useAuth() {
  return useContext(AuthContext)
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const userLS = localStorage.getItem('User')

    if (userLS) {
      setLoggedIn(true)
    }
  }, [])

  // function to handle login in localStorage
  const login = (userData) => {
    setLoggedIn(true)
    localStorage.setItem('User', JSON.stringify(userData))
  };

  // function to handle logout to remove itself out of localStorage
  const logout = () => {
   
    localStorage.removeItem('User')
  };

  return (
  <BrowserRouter>
  <AuthContext.Provider value={{loggedIn, login, logout, setLoggedIn}}>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/single-post/:id" element={<SinglePost />} />
    
        <Route path="/add-post" element={<AddPost />} />
        {!loggedIn && 
      <Route path="/login" element={<LogIn />} /> }
      {!loggedIn && 
      <Route path='/add-user' element={<SignUp />} /> }
      <Route path="*" element={<h2>Page is not Found</h2>} />
    </Routes>
    <Footer />
    </AuthContext.Provider>
  </BrowserRouter>
  )
}