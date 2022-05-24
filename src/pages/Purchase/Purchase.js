// import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
// import auth from "../../firebase.init";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FiMinus, FiPlus } from "react-icons/fi";

const Purchase = () => {
   const [user] = useAuthState(auth);
   const [quantity, setQuantity] = useState("100");

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const { _id } = useParams();

   const { data: product, isLoading } = useQuery("product", () =>
      fetch(`http://localhost:4000/product/${_id}`).then((res) => {
         return res.json();
      })
   );
   if (isLoading) {
      return <Loading></Loading>;
   }

   const decreaseQuantity = () => {
      setQuantity(quantity - 1);
   };
   const increaseQuantity = () => {
      setQuantity(quantity + 1);
   };

   return (
      <div className=" pt-20 px-3">
         <div className="container mx-auto" style={{ maxWidth: "1000px" }}>
            <div className="md:flex justify-between gap-5">
               <div className="md:w-3/6">
                  <div className="sticky top-20">
                     <div className="flex gap-5">
                        <div className=" h-36 w-36 bg-cover bg-no-repeat bg-center rounded-lg bg-base-200 bg-blend-overlay overflow-hidden">
                           <img
                              src={product.image}
                              alt=""
                              className="item-thumbnail w-full h-full object-cover rounded-t-lg"
                           />
                        </div>
                        <div className="text-left">
                           <h2 className="text-2xl mb-2">
                              {product.productName}
                           </h2>
                           <span className="text-xl bg-secondary/30 px-3 py-1 rounded-full mr-2 font-normal">
                              ${product.price}
                           </span>
                           <span>/ per unit</span>
                           <h4 className="mt-5">Available: 1000 unit.</h4>
                           <h4 className="">
                              Minimum order quantity: 100 unit.
                           </h4>
                        </div>
                     </div>

                     <div className="bg-base-200 p-5 rounded-lg my-5 text-left">
                        <h2 className="text-lg">Product Details - </h2>
                        <p className="text-slate-600">
                           Lorem ipsum dolor sit amet consectetur adipisicing
                           elit. Voluptate praesentium quis laudantium
                           reiciendis exercitationem mollitia soluta nesciunt
                           laboriosam architecto! Voluptatem.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="md:w-3/6">
                  <div className="border shadow-2xl p-10 rounded-lg">
                     <form className=" flex flex-col gap-2 text-left">
                        <h2 className="text-2xl mb-2">Order Form</h2>
                        <input
                           {...register("name")}
                           className="input input-bordered w-full"
                           type="text"
                           value={user.displayName}
                           disabled
                        />
                        <input
                           {...register("email")}
                           className="input input-bordered w-full"
                           type="text"
                           value={user.email}
                           disabled
                        />
                        <input
                           {...register("company")}
                           className="input input-bordered w-full"
                           type="text"
                           placeholder="Company (Optional)"
                        />

                        <div className="flex gap-2">
                           <div className="flex-1">
                              <input
                                 {...register("street", { required: true })}
                                 className="input input-bordered w-full"
                                 type="text"
                                 placeholder="Street"
                              />
                              {errors.street?.type === "required" && (
                                 <p className="text-red-400 text-sm ">
                                    Street is required!
                                 </p>
                              )}
                           </div>
                           <div className="flex-1">
                              <input
                                 {...register("city", { required: true })}
                                 className="input input-bordered w-full"
                                 type="text"
                                 placeholder="City"
                              />
                              {errors.city?.type === "required" && (
                                 <p className="text-red-400 text-sm ">
                                    Street is required!
                                 </p>
                              )}
                           </div>
                        </div>
                        <input
                           {...register("country", { required: true })}
                           className="input input-bordered w-full"
                           type="text"
                           placeholder="Country"
                        />
                        {errors.country?.type === "required" && (
                           <p className="text-red-400 text-sm ">
                              Country is required!
                           </p>
                        )}

                        <input
                           {...register("phone", { required: true })}
                           className="input input-bordered w-full"
                           type="text"
                           placeholder="Phone"
                        />
                        {errors.phone?.type === "required" && (
                           <p className="text-red-400 text-sm ">
                              Phone Number is required!
                           </p>
                        )}
                        <p className="text-slate-500">
                           Minimum quantity : 100 unit
                        </p>
                        <div className="flex items-center">
                           <div
                              onClick={decreaseQuantity}
                              className="bg-base-200 h-10 w-10 flex justify-center items-center text-2xl hover:bg-base-300 cursor-pointer border border-base-200 hover:border-base-300"
                           >
                              <FiMinus></FiMinus>
                           </div>
                           <input
                              {...register("quantity", {
                                 required: true,
                                 pattern: /^[0-9]*$/,
                              })}
                              className="text-center focus:outline-primary/30 w-28 h-10 border"
                              type="text"
                              name=""
                              id=""
                              min="100"
                              Max="1000"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                           />
                           <div
                              onClick={increaseQuantity}
                              className="bg-base-200 h-10 w-10 flex justify-center items-center text-2xl hover:bg-base-300 cursor-pointer border border-base-200 hover:border-base-300"
                           >
                              <FiPlus></FiPlus>
                           </div>
                        </div>
                        {errors.quantity?.type === "required" && (
                           <p className="text-red-400 text-sm ">
                              Please add quantity!
                           </p>
                        )}
                        

                        <input
                           type="submit"
                           value="Place Order"
                           className=" btn btn-primary text-lg text-white mt-3"
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Purchase;
