import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
   const [user] = useAuthState(auth);
   const [admin] = useAdmin(user);
   return (
      <div className="pt-8 md:pt-16  px-3">
         <div className="container mx-auto">
            <div class="drawer drawer-mobile py-5 h-auto">
               <input
                  id="dashboard-drawer"
                  type="checkbox"
                  class="drawer-toggle"
               />
               <div class="drawer-content p-4 pt-0 md:pl-10 text-left">
                  <h2 className="text-3xl mb-5">My dashboard</h2>
                  <Outlet></Outlet>
               </div>
               <div class="drawer-side">
                  <label for="dashboard-drawer" class="drawer-overlay"></label>
                  <ul class="menu p-4 overflow-y-auto w-48 bg-base-200 text-base-content rounded-lg gap-1 text-lg block">
                     <li>
                        <NavLink
                           className="bg-transparent"
                           to="/dashboard/my-orders"
                        >
                           My Orders
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           className="bg-transparent"
                           to="/dashboard/add-review"
                        >
                           Add A Review
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           className="bg-transparent"
                           to="/dashboard/my-profile"
                        >
                           My Profile
                        </NavLink>
                     </li>
                     {admin && (
                        <>
                           <li>
                              <NavLink
                                 className="bg-transparent"
                                 to="/dashboard/manage-all-orders"
                              >
                                 Manage All Orders
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="bg-transparent"
                                 to="/dashboard/add-product"
                              >
                                 Add New Product
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="bg-transparent"
                                 to="/dashboard/manage-all-products"
                              >
                                 Manage All Products
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="bg-transparent"
                                 to="/dashboard/make-admin"
                              >
                                 Make Admin
                              </NavLink>
                           </li>
                        </>
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
