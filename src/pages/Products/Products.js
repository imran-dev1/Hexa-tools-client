import React from "react";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import Product from "../Home/Product";

const Products = () => {
   const { data: products, isLoading } = useQuery("allProducts", () =>
      fetch("http://localhost:4000/product/").then((res) => res.json())
   );

   if (isLoading) {
      return <Loading></Loading>;
   }
   return (
      <div className="pt-16 md:pt-24  px-3">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="mb-5">
               <h2 className="text-2xl md:text-4xl font-extrabold text-center ">
                  All Products
               </h2>
               <p className=" max-w-md mx-auto mt-5 mb-16">
                  Let us help you find the right fit for you or your
                  corporation.
               </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
               {products.map((product) => (
                  <Product product={product} key={product._id}></Product>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Products;
