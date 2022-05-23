import React from "react";
import { BsTools } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";

const Features = () => {
   return (
      <div className="pt-24 px-3">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center items-center">
               <div className="flex flex-col justify-center items-center gap-2 bg-base-200 p-5 rounded-md">
                  <BsTools className="text-primary text-4xl"></BsTools>
                  <h2 className="text-lg">High Quality</h2>
                  <p className="text-slate-600">
                     The tools are durable and very high quality.
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-2 bg-base-200 p-5 rounded-md">
                  <BiSupport className="text-primary text-4xl"></BiSupport>
                  <h2 className="text-lg">24/7 Support</h2>
                  <p className="text-slate-600">
                     We are 24/7 available if you have any query.
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-2 bg-base-200 p-5 rounded-md">
                  <RiShoppingCartLine className="text-primary text-4xl"></RiShoppingCartLine>
                  <h2 className="text-lg">Custom Quantity?</h2>
                  <p className="text-slate-600">
                     Contact us now if you have any custom quantity.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Features;
