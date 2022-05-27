import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAdmin from "./components/Authentication/RequireAdmin";
import RequireAuth from "./components/Authentication/RequireAuth";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddReview from "./pages/AddReview/AddReview";
import Blogs from "./pages/Blogs/Blogs";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MakeAdmin from "./pages/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./pages/ManageAllOrders/ManageAllOrders";
import ManageProducts from "./pages/ManageProducts/ManageProducts";
import MyOrders from "./pages/MyOrders/MyOrders";
import MyProfile from "./pages/MyProfile/MyProfile";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Products from "./pages/Products/Products";
import Purchase from "./pages/Purchase/Purchase";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SignUp from "./pages/SignUp/SignUp";

const queryClient = new QueryClient();

function App() {
   return (
      <div className="App">
         <QueryClientProvider client={queryClient}>
            <Header>
               <Routes>
                  <Route path="/" element={<Home></Home>}></Route>
                  <Route path="blogs" element={<Blogs></Blogs>}></Route>
                  <Route
                     path="products"
                     element={<Products></Products>}
                  ></Route>
                  <Route path="login" element={<Login></Login>}></Route>
                  <Route path="signup" element={<SignUp></SignUp>}></Route>
                  <Route
                     path="reset-password"
                     element={<ResetPassword></ResetPassword>}
                  ></Route>
                  <Route
                     path="purchase/:_id"
                     element={
                        <RequireAuth>
                           <Purchase></Purchase>
                        </RequireAuth>
                     }
                  ></Route>
                  <Route
                     path="payment/:id"
                     element={
                        <RequireAuth>
                           <Payment></Payment>
                        </RequireAuth>
                     }
                  ></Route>
                  <Route
                     path="payment-success/:tId"
                     element={
                        <RequireAuth>
                           <PaymentSuccess></PaymentSuccess>
                        </RequireAuth>
                     }
                  ></Route>
                  <Route path="dashboard" element={<Dashboard></Dashboard>}>
                     <Route
                        index
                        element={
                           <h2 className="text-2xl">
                              Welcome to the dashboard
                           </h2>
                        }
                     ></Route>
                     <Route
                        path="my-orders"
                        element={<MyOrders></MyOrders>}
                     ></Route>
                     <Route
                        path="add-review"
                        element={<AddReview></AddReview>}
                     ></Route>
                     <Route
                        path="my-profile"
                        element={<MyProfile></MyProfile>}
                     ></Route>
                     <Route
                        path="manage-all-orders"
                        element={
                           <RequireAdmin>
                              <ManageAllOrders></ManageAllOrders>
                           </RequireAdmin>
                        }
                     ></Route>
                     <Route
                        path="manage-all-products"
                        element={
                           <RequireAdmin>
                              <ManageProducts></ManageProducts>
                           </RequireAdmin>
                        }
                     ></Route>
                     <Route
                        path="add-product"
                        element={
                           <RequireAdmin>
                              <AddProduct></AddProduct>
                           </RequireAdmin>
                        }
                     ></Route>
                     <Route
                        path="make-admin"
                        element={
                           <RequireAdmin>
                              <MakeAdmin></MakeAdmin>
                           </RequireAdmin>
                        }
                     ></Route>
                  </Route>
               </Routes>
               <Footer></Footer>
            </Header>
            <Toaster
               position="top-center"
               reverseOrder={true}
               toastOptions={{ duration: 4000 }}
            />
         </QueryClientProvider>
      </div>
   );
}

export default App;
