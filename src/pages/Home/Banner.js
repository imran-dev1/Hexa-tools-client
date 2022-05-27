import React from "react";
import bg from "../../images/banner-bg.svg";
import drill from "../../images/drill.svg";
import CountUp from "react-countup";
import { RiUserShared2Line } from "react-icons/ri";
import { FaCoins } from "react-icons/fa";
import { GoTools } from "react-icons/go";
import { Link } from "react-router-dom";

const Banner = () => {
   return (
      <div
         id="hero"
         className=" bg-cover bg-bottom bg-no-repeat pb-16"
         style={{ backgroundImage: `url(${bg})` }}
      >
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="pt-10 md:pt-28 md:pb-16">
               <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                  <img
                     src={drill}
                     className="flex-1 max-w-[250px] md:max-w-lg"
                     alt=""
                  />
                  <div className="flex-1 text-left">
                     <h1 className=" text-4xl lg:text-6xl font-extrabold text-black uppercase">
                        High Quality
                     </h1>
                     <h1 className=" text-2xl lg:text-2xl font-extrabold text-secondary uppercase">
                        Maintenance Kit
                     </h1>
                     <p className="py-6 text-lg max-w-md">
                        We are a manufacturer of high quality and low coast
                        maintenance kit. The kits are durable, low cost and long lasting.
                     </p>
                     <Link to="/products">
                        <button className="btn rounded-sm text-white">
                           Browse Products
                        </button>
                     </Link>
                     <div className="flex flex-col md:flex-row gap-3 md:gap-16 mt-10">
                        <div className=" text-primary flex flex-col items-center md:items-start bg-base-200 md:bg-transparent p-5 md:p-0 rounded-lg">
                           <RiUserShared2Line className="text-4xl"></RiUserShared2Line>
                           <p className="text-4xl font-bold">
                              <CountUp start={70} end={100} duration={2} />+
                           </p>
                           <p className="text-xl font-bold">Customers</p>
                        </div>
                        <div className="text-secondary flex flex-col items-center md:items-start bg-base-200 md:bg-transparent p-5 md:p-0 rounded-lg">
                           <FaCoins className="text-4xl"></FaCoins>
                           <p className="text-4xl font-bold">
                              <CountUp start={55} end={70} duration={2} />
                              M+
                           </p>
                           <p className="text-xl font-bold">Annual revenues</p>
                        </div>
                        <div className=" text-accent flex flex-col items-center md:items-start bg-base-200 md:bg-transparent p-5 md:p-0 rounded-lg">
                           <GoTools className="text-4xl"></GoTools>
                           <p className="text-4xl font-bold">
                              <CountUp start={35} end={50} duration={2} />+
                           </p>
                           <p className="text-xl font-bold">Tools</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;
