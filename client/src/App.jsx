import {Route, Routes} from "react-router";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Blog from "./components/blog/Blog.jsx";
import About from "./components/about/About.jsx";
import PostDetails from "./components/blog/posts/PostDetails.jsx";
import Contact from "./components/contact/Contact.jsx";
import Login from "./components/auth/login/Login.jsx";
import Logout from "./components/auth/logout/Logout.jsx";
import Register from "./components/auth/register/Register.jsx";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App;
