import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
   const { productName, price, image } = product;
   console.log(productName);
   return (
      <div className="item shadow-md rounded-lg">
         <div className=" h-64 bg-cover bg-no-repeat bg-center rounded-t-lg bg-[#ffffff] overflow-hidden relative">
            <img
               src={image}
               alt=""
               className="item-thumbnail w-full h-full object-cover rounded-t-lg transition-all duration-500"
            />
            <span className="absolute top-0 right-0 text-sm bg-primary-content text-black py-1 px-2">
               Available: <strong>1000</strong>
            </span>
         </div>
         <div className="p-4  text-black rounded-b-lg text-left">
            <h3 className="text-lg md:text-xl">{productName}</h3>
            <h2 className="text-xl md:text-2xl py-2">${price}</h2>

            <div className="flex flex-col items-center justify-between border-t border-slate-200 pt-2 text-slate-400 text-sm">
               <h4>Minimum Order: 10</h4>
               <Link to="item-details" className="btn btn-primary capitalize text-white  rounded">
                  Place order
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Product;
