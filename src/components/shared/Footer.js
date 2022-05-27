import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF,FaInstagram, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
   return (
      <div className="py-16 px-3 bg-secondary-focus mt-16">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="text-white text-left grid grid-cols-1 md:grid-cols-3 gap-10">
               <div>
                  <h2 className="text-3xl mb-3">Hexa Tools</h2>
                  <p className="text-slate-300">
                     Hexa Tools is a worldwide famous tools manufacturer. We
                     produce very high quality maintenance kits.
                  </p>
                  <div className="flex gap-5 text-2xl mt-3 text-slate-300">
                           <Link to="/" className="hover:text-white hover:scale-110 transition-all"><FaFacebookF></FaFacebookF></Link>
                           <Link to="/" className="hover:text-white hover:scale-110 transition-all"> <FaInstagram></FaInstagram></Link>
                           <Link to="/" className="hover:text-white hover:scale-110 transition-all"><FaRegEnvelope></FaRegEnvelope></Link>
                  </div>
               </div>
               <div>
                  <h2 className="text-2xl mb-3">Important Links</h2>
                  <ul className="text-slate-300 flex flex-col gap-2">
                     <li>
                        <Link
                           to="/dashboard/my-orders"
                           className="hover:text-white hover:translate-x-1 transition-all inline-block hover:scale-[1.1]"
                        >
                           Mange Orders
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/dashboard/my-profile"
                           className="hover:text-white hover:translate-x-1 transition-all inline-block hover:scale-[1.1]"
                        >
                           My Profile
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/login"
                           className="hover:text-white hover:translate-x-1 transition-all inline-block hover:scale-[1.1]"
                        >
                           Login
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <p className="text-slate-300 mb-3">
                     Subscribe to the newsletter to get the latest updates.
                  </p>
                  <form action="" className="">
                     <input
                        type="text"
                        placeholder="Your email"
                        className="input input-bordered text-black w-full max-w-xs"
                     />
                     <input
                        type="submit"
                        value="Subscribe"
                        className="btn btn-primary mt-2"
                     />
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
