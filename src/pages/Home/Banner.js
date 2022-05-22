import React from "react";
import bg from "../../images/banner-bg.png";
import tools from "../../images/tools.png";
import CountUp from "react-countup";

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
                     src={tools}
                     className="flex-1 max-w-[250px] md:max-w-sm"
                     alt=""
                  />
                  <div className="flex-1 text-left">
                     <h1 className=" text-4xl lg:text-6xl font-extrabold text-black uppercase">
                        High Quality
                     </h1>
                     <h1 className=" text-2xl lg:text-2xl font-extrabold text-secondary uppercase">
                        Maintenance Kit
                     </h1>
                     <p className="py-6 text-lg">
                        We are a manufacturer of high quality and low coast
                        maintenance kit.
                     </p>
                     <button className="btn rounded-sm text-white">
                        Browse Products
                     </button>
                     <div className="flex flex-col md:flex-row gap-5 md:gap-16 mt-10">
                        <div className=" text-black">
                           <p className="text-4xl font-bold">
                              <CountUp start={70} end={100} duration={2} />+
                           </p>
                           <p className="text-xl font-bold">Customers</p>
                        </div>
                        <div className="text-black">
                           <p className="text-4xl font-bold">
                              <CountUp start={55} end={70} duration={2} />
                              M+
                           </p>
                           <p className="text-xl font-bold">Annual revenues</p>
                        </div>
                        <div className=" text-black">
                           <p className="text-4xl font-bold">
                              <CountUp start={44} end={50} duration={2} />+
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
