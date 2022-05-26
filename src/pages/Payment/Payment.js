import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Payment = () => {
   const { id } = useParams();
   const [order, setOrder] = useState({});

   useEffect(() => {
      fetch(`http://localhost:4000/order/${id}`, {
         method: "GET",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      })
         .then((res) => res.json())
         .then((data) => setOrder(data));
   }, []);

   return (
      <div className=" pt-20 px-3">
         <div className="container mx-auto" style={{ maxWidth: "1000px" }}>
            <div className="md:flex justify-between gap-5">
               <div className="md:w-3/6">
                  <div className="sticky top-20">
                     <div className="flex gap-5">
                        <div className=" h-36 w-36 bg-cover bg-no-repeat bg-center rounded-lg bg-base-200 bg-blend-overlay overflow-hidden">
                           <img
                              src={order?.productImg}
                              alt=""
                              className="item-thumbnail w-full h-full object-cover rounded-t-lg"
                           />
                        </div>
                        <div className="text-left">
                           <h2 className="text-2xl mb-1">{order?.product}</h2>

                           <span className="text-slate-400">
                              Order#{order._id}
                           </span>
                           <span className="text-sm badge bg-base-300 border-0 text-black font-thin ">
                              {order.status}
                           </span>
                           <h4 className="mt-5">
                              Quantity: {order?.orderUnit} unit.
                           </h4>
                           <h4 className="text-xl">
                              Subtotal: ${order?.orderAmount}.00
                           </h4>
                        </div>
                     </div>

                     <div className="bg-base-200 p-5 rounded-lg my-5 text-left">
                        <h2 className="text-lg mb-5 font-bold">
                           Shipping Details -{" "}
                        </h2>
                        <p className="">{order.customerName}</p>
                        <p className="">
                           {order.street}, {order.city}, {order.country}
                        </p>
                        <p className="">{order.email}</p>
                        <p className="">{order.phone}</p>
                     </div>
                  </div>
               </div>
               <div className="md:w-3/6">
                  <div className="border shadow-2xl shadow-slate-200 p-10 rounded-lg"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Payment;
