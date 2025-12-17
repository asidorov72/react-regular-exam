import {Route, Routes} from "react-router";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Blog from "./components/Blog/Blog.jsx";
import About from "./components/About/About.jsx";
import PostDetails from "./components/Blog/Post/PostDetails.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Logout/Logout.jsx";

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
            <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App;
