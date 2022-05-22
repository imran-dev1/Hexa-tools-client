import React from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import logo from "../../images/hexa-logo.svg";

const menuItems = (
   <>
      <li>
         <Link className="rounded-md" to="/">Home</Link>
      </li>
      <li>
         <Link className="rounded-md"  to="/blogs">Blogs</Link>
      </li>
      <li>
         <Link className="rounded-md"  to="/products">Products</Link>
      </li>
      <li tabindex="0">
         <Link className="rounded-md"  to="/dashboard">
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
         </Link>
         <ul className="p-2 bg-base-100 shadow-lg rounded-lg left-0 top-full  w-full">
            <li>
               <Link className="rounded-md"  to="/my-orders">My Orders</Link>
            </li>
            <li>
               <Link className="rounded-md"  to="/add-review">Add Review</Link>
            </li>
         </ul>
      </li>
   </>
);

const Header = ({ children }) => {
   return (
      <div className="container mx-auto">
         <div className="drawer drawer-end">
            <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
               {/* <!-- Navbar --> */}
               <div className="w-full navbar px-3">
                  <div className="flex-1">
                     <img
                        className=" w-40 md:w-full"
                        src={logo}
                        alt="hexa logo"
                        style={{ maxWidth: "250px" }}
                     />
                  </div>
                  <div className="flex-none lg:hidden">
                     <label for="navbar-drawer" className="btn btn-square btn-ghost">
                        <RiMenu3Fill className="text-2xl text-black"></RiMenu3Fill>
                     </label>
                  </div>

                  <div className="flex-none hidden lg:block">
                     <ul className="menu menu-horizontal rounded-sm">{menuItems}</ul>
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
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-lg w-40"
                     >
                        <li>
                           <Link to="/my-profile" className="justify-between">
                              My Profile
                           </Link>
                        </li>

                        <li>
                           <button>Logout</button>
                        </li>
                     </ul>
                  </div>
               </div>
               {children}
            </div>
            <div className="drawer-side">
               <label for="navbar-drawer" className="drawer-overlay"></label>
               <ul className="menu p-4 pt-24 text-lg overflow-y-auto w-56 bg-base-100">
                  {menuItems}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Header;
