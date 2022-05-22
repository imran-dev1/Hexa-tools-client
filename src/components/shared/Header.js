import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import logo from "../../images/hexa-logo.svg";
import "./Header.css";
const menuItems = (
   <>
      <li>
         <NavLink
            className="py-2 m-1 active:text-primary  bg-transparent text-black hover:text-primary"
            to="/"
         >
            Home
         </NavLink>
      </li>
      <li>
         <NavLink
            className="rounded-md py-2 m-1 active:text-primary  bg-transparent text-black hover:text-primary"
            to="/blogs"
         >
            Blogs
         </NavLink>
      </li>
      <li>
         <NavLink
            className="rounded-md py-2 m-1 active:text-primary  bg-transparent text-black hover:text-primary"
            to="/products"
         >
            Products
         </NavLink>
      </li>
      <li tabindex="0">
         <NavLink
            className="rounded-md py-2 m-1 active:text-primary  bg-transparent text-black hover:text-primary gap-1"
            to="/dashboard"
         >
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
         </NavLink>
         <ul className="p-2 bg-base-100 shadow-lg rounded-lg left-0 top-full  w-full text-md">
            <li>
               <NavLink
                  className="rounded-md py-2 m-1 active:text-primary  bg-transparent text-black hover:text-primary"
                  to="/my-orders"
               >
                  My Orders
               </NavLink>
            </li>
            <li>
               <NavLink
                  className="rounded-md py-2 m-1 active:text-primary  bg-transparent text-black hover:text-primary"
                  to="/add-review"
               >
                  Add Review
               </NavLink>
            </li>
         </ul>
      </li>
   </>
);

const Header = ({ children }) => {
   return (
      <div className="" id="header">
         <div className="drawer drawer-end">
            <input
               id="navbar-drawer"
               type="checkbox"
               className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col">
               <div className="w-full sticky top-0 z-50 bg-white  navbar px-3">
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
                           for="navbar-drawer"
                           className="btn btn-square btn-ghost"
                        >
                           <RiMenu3Fill className="text-2xl text-black"></RiMenu3Fill>
                        </label>
                     </div>

                     <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal text-lg">
                           {menuItems}
                        </ul>
                     </div>
                     <div className="dropdown dropdown-end">
                        <label
                           tabindex="0"
                           className="btn btn-ghost btn-circle avatar"
                        >
                           <div className="w-10 rounded-full">
                              <img src="https://api.lorem.space/image/face?hash=33791" />
                           </div>
                        </label>
                        <ul
                           tabindex="0"
                           className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-lg w-40"
                        >
                           <li>
                              <NavLink
                                 to="/my-profile"
                                 className="justify-between  m-1 active:text-primary py-1 text-md bg-transparent text-black hover:text-primary"
                              >
                                 My Profile
                              </NavLink>
                           </li>

                           <li>
                              <button className="justify-between py-1 text-md m-1 active:text-primary  bg-transparent text-black hover:text-primary">
                                 Logout
                              </button>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               {children}
            </div>
            <div className="drawer-side">
               <label for="navbar-drawer" className="drawer-overlay"></label>
               <ul className="menu p-4 pt-16 text-lg overflow-y-auto w-56 bg-base-100">
                  {menuItems}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Header;
