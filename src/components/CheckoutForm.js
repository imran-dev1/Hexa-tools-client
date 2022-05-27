import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ order }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState("");
   const [clientSecret, setClientSecret] = useState("");
   const navigate = useNavigate();
   const [loadingPayment, setLoadingPayment] = useState(false);

   const { orderAmount, customerName, email } = order;
   const amount = parseInt(orderAmount);

   useEffect(() => {
      fetch("https://hexa-tools.herokuapp.com/create-payment-intent", {
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
      setLoadingPayment(true);
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
         setLoadingPayment(false);
         setCardError(intentError?.message);
      } else {
         setCardError("");
         fetch(`https://hexa-tools.herokuapp.com/order/${order._id}`, {
            method: "PATCH",
            body: JSON.stringify({
               txId: paymentIntent.id,
               status: "paid",
            }),
            headers: {
               "Content-type": "application/json; charset=UTF-8",
               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         })
            .then((response) => response.json())
            .then((result) => {
               setLoadingPayment(false);
               navigate(`/payment-success/${paymentIntent.id}`);
            });
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
               {loadingPayment ? "Processing..." : "Pay"}
            </button>
         </form>
         {cardError && <p className=" text-red-500">{cardError}</p>}
      </>
   );
};

export default CheckoutForm;
