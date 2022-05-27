import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";
import Loading from "../../components/Loading/Loading";

const stripePromise = loadStripe(
   "pk_test_51L3hwDHOdcLNLMmMzlfRClYQ6grMqGRVvbp9PM5BzoTXneOcZAQ09xeZERZR6XxAq0r4UxplhHuUEbHsW5USEpdn00at042qfj"
);

const Payment = () => {
   const { id } = useParams();

   //    const [order, setOrder] = useState({});

   const { data: order, isLoading } = useQuery(["purchase", id], () =>
      fetch(`https://hexa-tools.herokuapp.com/order/${id}`, {
         method: "GET",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      }).then((res) => res.json())
   );

   if (isLoading) {
      return <Loading></Loading>;
   }

   //    useEffect(() => {
   //       fetch(`https://hexa-tools.herokuapp.com/order/${id}`, {
   //          method: "GET",
   //          headers: {
   //             "content-type": "application/json",
   //             authorization: `Bearer ${localStorage.getItem("accessToken")}`,
   //          },
   //       })
   //          .then((res) => res.json())
   //          .then((data) => setOrder(data));
   //    }, [id]);

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
                              Order#{order?._id}
                           </span>
                           <span className="text-sm badge bg-base-300 border-0 text-black font-thin ">
                              {order?.status}
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
                        <p className="">{order?.customerName}</p>
                        <p className="">
                           {order?.street}, {order?.city}, {order?.country}
                        </p>
                        <p className="">{order?.email}</p>
                        <p className="">{order?.phone}</p>
                     </div>
                  </div>
               </div>
               <div className="md:w-3/6">
                  <div className="border shadow-2xl shadow-slate-200 p-10 rounded-lg">
                     <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                     </Elements>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Payment;
