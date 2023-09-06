import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import SinglePost from "./pages/SinglePost";

export default function App() {
  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/single-post/:id" element={<SinglePost />} />
      <Route path="/add-post" element={<AddPost />} />
      <Route path="*" element={<h2>Page not Found</h2>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}