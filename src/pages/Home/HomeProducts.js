import React from "react";
import { useQuery } from "react-query";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./HomeProducts.css";
import Loading from "../../components/Loading/Loading";

const HomeProducts = () => {
   const { data: products, isLoading } = useQuery("products", () =>
      fetch("http://localhost:4000/product/").then((res) => res.json())
   );

   if (isLoading) {
      return <Loading></Loading>;
   }
   return (
      <div className="pt-24  px-3">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
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
                  slidesPerView={3.1}
                  spaceBetween={20}
                  centeredSlides={false}
                  pagination={{
                     clickable: true,
                  }}
                  modules={[FreeMode, Pagination]}
                  className="mySwiper"
                  grabCursor={true}
               >
                  {products.map((product) => (
                     <SwiperSlide key={product._id} className="pb-16 mr-2">
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
