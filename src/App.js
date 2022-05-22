import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import Blogs from "./pages/Blogs/Blogs";
import Home from "./pages/Home/Home";

const queryClient = new QueryClient();

function App() {
   return (
      <div className="App">
         <QueryClientProvider client={queryClient}>
            <Header>
               <Routes>
                  <Route path="/" element={<Home></Home>}></Route>
                  <Route path="blogs" element={<Blogs></Blogs>}></Route>
               </Routes>
               <Footer></Footer>
            </Header>
         </QueryClientProvider>
      </div>
   );
}

export default App;
