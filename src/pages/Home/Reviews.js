import React from "react";
import { useQuery } from "react-query";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdFormatQuote } from "react-icons/md";
import Loading from "../../components/Loading/Loading";
import "swiper/css";
import "swiper/css/pagination";
import { Rating } from "react-simple-star-rating";

const Reviews = () => {
   const { data: reviews, isLoading } = useQuery("reviews", () =>
      fetch("https://hexa-tools.herokuapp.com/review").then((res) => res.json())
   );

   if (isLoading) {
      return <Loading></Loading>;
   }
   return (
      <div className="pt-24 px-3">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="mb-5">
               <h2 className="text-2xl md:text-4xl font-extrabold text-center ">
                  Customer Reviews
               </h2>
               <p className=" max-w-md mx-auto mt-5 mb-16">
                  Customers like our tools. Here are some of our clients
                  reviews.
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
                  {reviews.map((review, index) => (
                     <SwiperSlide key={review._id} className="pb-16 mr-2">
                        <div className="flex justify-center flex-col items-center gap-2 border-2 border-slate-100 bg-base-100 p-5 rounded-lg">
                           <img
                              className=" w-16 rounded-lg"
                              src={review.image}
                              alt=""
                           />

                           <div>
                              <Rating
                                 key={index}
                                 initialValue={review.ratings / 20}
                                 size="20"
                                 readonly
                              />
                           </div>
                           <h4 className="text-xl">{review.author}</h4>
                           <MdFormatQuote className="text-3xl text-slate-400"></MdFormatQuote>
                           <blockquote className="italic text-slate-500">
                              {review.comment}
                           </blockquote>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </div>
   );
};

export default Reviews;
