import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ order }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState("");
   const [success, setSuccess] = useState("");
   const [clientSecret, setClientSecret] = useState("");
   const navigate = useNavigate();

   const { orderAmount, customerName, email } = order;
   const amount = parseInt(orderAmount);

   useEffect(() => {
      fetch("http://localhost:4000/create-payment-intent", {
         method: "POST",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify({ orderAmount: amount }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.clientSecret) {
               setClientSecret(data.clientSecret);
            }
         });
   }, [order, amount]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);
      if (card === null) {
         return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         setCardError(error?.message);
      } else {
         setCardError("");
      }
      setSuccess("");
      const { paymentIntent, error: intentError } =
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: card,
               billing_details: {
                  name: customerName,
                  email: email,
               },
            },
         });
      if (intentError) {
         setCardError(intentError?.message);
      } else {
         setCardError("");
         navigate(`/payment-success/${paymentIntent.id}`);
         setSuccess("Congratulation! Your Payment is successful.");
      }
   };
   return (
      <>
         <form onSubmit={handleSubmit}>
            <CardElement
               className=""
               options={{
                  style: {
                     base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                           color: "#aab7c4",
                        },
                     },
                     invalid: {
                        color: "#9e2146",
                     },
                  },
               }}
            />
            <button
               className="btn btn-primary text-white mt-10"
               type="submit"
               disabled={!stripe || !clientSecret}
            >
               Pay
            </button>
         </form>
         {cardError && <p className=" text-red-500">{cardError}</p>}
         {success && <p className=" text-green-600">{success}</p>}
      </>
   );
};

export default CheckoutForm;
