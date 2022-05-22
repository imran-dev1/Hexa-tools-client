import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const HomeProducts = () => {
   const { data: products, isLoading } = useQuery("products", () =>
      fetch("products.json").then((res) => res.json())
   );

   if (isLoading) {
      return <h1>Loading...</h1>;
   }
   console.log(products);
   return (
      <div className="pt-24 pb-52 px-3">
         <div className="container mx-auto" style={{ maxWidth: "1000px" }}>
            <div className="mb-5">
               <h2 className="text-2xl md:text-4xl font-extrabold text-center ">
                  New Collection
               </h2>
               <p className=" max-w-md mx-auto mt-5 mb-16">
                  You contribute over half of your life operating. Let us help
                  you find the right fit for you or your corporation.
               </p>
            </div>
            <div className="mt-10">
               <Swiper
                  breakpoints={{
                     // when window width is >= 640px
                     250: {
                        width: 250,
                        slidesPerView: 1,
                     },
                     640: {
                        width: 640,
                        slidesPerView: 2.5,
                     },
                     // when window width is >= 768px
                     1000: {
                        width: 1000,
                        slidesPerView: 3.5,
                     },
                  }}
                  slidesPerView={3.5}
                  spaceBetween={30}
                  centeredSlides={false}
                  pagination={{
                     clickable: true,
                  }}
                  modules={[FreeMode, Pagination]}
                  className="mySwiper"
                  grabCursor={true}
               >
                  {products.map((product) => (
                     <SwiperSlide key={product.id} className="pb-16">
                        <Product product={product}></Product>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </div>
   );
};

export default HomeProducts;
