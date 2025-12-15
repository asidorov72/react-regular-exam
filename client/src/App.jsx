import {Route, Routes} from "react-router";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Blog from "./components/Blog/Blog.jsx";
import About from "./components/About/About.jsx";
import Post from "./components/Post/Post.jsx";
import Contact from "./components/Contact/Contact.jsx";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/about" element={<About />} />
            {/* Todo: add a dynamic single post route */}
            <Route path="/post" element={<Post />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
