import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import Blogs from "./pages/Blogs/Blogs";
import Home from "./pages/Home/Home";

function App() {
   return (
      <div className="App">
         <Header>
            <Routes>
               <Route path="/" element={<Home></Home>}></Route>
               <Route path="blogs" element={<Blogs></Blogs>}></Route>
            </Routes>
            <Footer></Footer>
         </Header>
      </div>
   );
}

export default App;
