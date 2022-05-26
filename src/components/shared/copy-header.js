import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiMenu3Fill, RiUser3Line } from "react-icons/ri";
import logo from "../../images/hexa-logo.svg";
import "./Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useAdmin from "../../hooks/useAdmin";

const Header = ({ children }) => {
   const [user] = useAuthState(auth);
   const [admin] = useAdmin(user);
   const userFirstLetter = user?.displayName?.slice(0, 1);
   const navigate = useNavigate();
   const logOut = () => {
      signOut(auth);
      navigate("/");
   };

   return (
      <div className="" id="header">
         <div className="drawer drawer-end">
            <input
               id="navbar-drawer"
               type="checkbox"
               className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col">
               <div className="w-full sticky top-0 z-10 bg-white  navbar px-3">
                  <div className="container mx-auto">
                     <div className="flex-1">
                        <Link to="/">
                           <img
                              className=" w-48 md:w-full"
                              src={logo}
                              alt="hexa logo"
                              style={{ maxWidth: "250px" }}
                           />
                        </Link>
                     </div>
                     <div className="flex-none lg:hidden">
                        <label
                           htmlFor="navbar-drawer"
                           className="btn btn-square btn-ghost"
                        >
                           <RiMenu3Fill className="text-2xl text-black"></RiMenu3Fill>
                        </label>
                     </div>

                     <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal text-lg">
                           <li>
                              <NavLink
                                 className="py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                                 to="/"
                              >
                                 Home
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="rounded-md py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                                 to="/blogs"
                              >
                                 Blogs
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="rounded-md py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                                 to="/products"
                              >
                                 Products
                              </NavLink>
                           </li>
                           <li tabindex="0">
                              <span className="rounded-md py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary gap-1">
                                 Dashboard
                                 <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                 >
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                 </svg>
                              </span>
                              <ul className="p-2 bg-base-100 shadow-lg rounded-lg left-0 top-full  w-auto text-md">
                                 {!admin && (
                                    <>
                                       <li>
                                          <NavLink
                                             className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                             to="/dashboard/my-orders"
                                          >
                                             My Orders
                                          </NavLink>
                                       </li>
                                       <li>
                                          <NavLink
                                             className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                             to="/dashboard/add-review"
                                          >
                                             Add Review
                                          </NavLink>
                                       </li>
                                    </>
                                 )}
                                 {admin && (
                                    <>
                                       <li>
                                          <NavLink
                                             className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                             to="/dashboard/add-product"
                                          >
                                             Add Product
                                          </NavLink>
                                       </li>
                                       <li>
                                          <NavLink
                                             className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                             to="/dashboard/manage-all-products"
                                          >
                                             Manage Products
                                          </NavLink>
                                       </li>
                                       <li>
                                          <NavLink
                                             className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                             to="/dashboard/manage-all-orders"
                                          >
                                             Manage Orders
                                          </NavLink>
                                       </li>
                                       <li>
                                          <NavLink
                                             className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                             to="/dashboard/make-admin"
                                          >
                                             Make An Admin
                                          </NavLink>
                                       </li>
                                    </>
                                 )}
                              </ul>
                           </li>
                        </ul>
                     </div>
                     {!user ? (
                        <Link to="/login">
                           <div className="ring rounded-full bg-slate-700 p-3">
                              <RiUser3Line className="text-xl w-full text-base-100"></RiUser3Line>
                           </div>
                        </Link>
                     ) : (
                        <div className="dropdown dropdown-end">
                           <label
                              tabIndex="0"
                              className="btn btn-ghost btn-circle avatar"
                           >
                              {user?.photoURL !== null ? (
                                 <div className="ring rounded-full">
                                    <img src={user?.photoURL} alt="user" />
                                 </div>
                              ) : (
                                 <div
                                    className="w-52 ring bg-slate-700 rounded-full items-center justify-center"
                                    style={{ display: "flex" }}
                                 >
                                    <span className="text-2xl text-white">
                                       {userFirstLetter}
                                    </span>
                                 </div>
                              )}
                           </label>
                           <ul
                              tabIndex="0"
                              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-lg w-40"
                           >
                              <li>
                                 <NavLink
                                    to="/dashboard/my-profile"
                                    className="justify-between  m-1 active:text-secondary py-1 text-md bg-transparent text-black hover:text-secondary"
                                 >
                                    My Profile
                                 </NavLink>
                              </li>

                              <li>
                                 <button
                                    onClick={logOut}
                                    className="justify-between py-1 text-md m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                                 >
                                    Logout
                                 </button>
                              </li>
                           </ul>
                        </div>
                     )}
                  </div>
               </div>
               {children}
            </div>
            <div className="drawer-side">
               <label
                  htmlFor="navbar-drawer"
                  className="drawer-overlay"
               ></label>
               <ul className="menu p-4 pt-16 text-lg overflow-y-auto w-56 bg-base-100">
                  <li>
                     <NavLink
                        className="py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                        to="/"
                     >
                        Home
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        className="rounded-md py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                        to="/blogs"
                     >
                        Blogs
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        className="rounded-md py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary"
                        to="/products"
                     >
                        Products
                     </NavLink>
                  </li>
                  <li tabindex="0">
                     <span className="rounded-md py-2 m-1 active:text-secondary  bg-transparent text-black hover:text-secondary gap-1">
                        Dashboard
                        <svg
                           className="fill-current"
                           xmlns="http://www.w3.org/2000/svg"
                           width="20"
                           height="20"
                           viewBox="0 0 24 24"
                        >
                           <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                     </span>
                     <ul className="p-2 bg-base-100 shadow-lg rounded-lg left-0 top-full  w-auto text-md">
                        {!admin && (
                           <>
                              <li>
                                 <NavLink
                                    className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                    to="/dashboard/my-orders"
                                 >
                                    My Orders
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                    to="/dashboard/add-review"
                                 >
                                    Add Review
                                 </NavLink>
                              </li>
                           </>
                        )}
                        {admin && (
                           <>
                              <li>
                                 <NavLink
                                    className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                    to="/dashboard/add-product"
                                 >
                                    Add Product
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                    to="/dashboard/manage-all-products"
                                 >
                                    Manage Products
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                    to="/dashboard/manage-all-orders"
                                 >
                                    Manage Orders
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="m-1 active:text-secondary py-1 bg-transparent text-black hover:text-secondary"
                                    to="/dashboard/make-admin"
                                 >
                                    Make An Admin
                                 </NavLink>
                              </li>
                           </>
                        )}
                     </ul>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Header;
