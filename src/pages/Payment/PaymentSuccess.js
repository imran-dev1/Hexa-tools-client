import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
   const { tId } = useParams();

   return (
      <div className=" pt-20 px-3">
         <div
            className="container mx-auto shadow rounded-lg p-5 border border-slate-200"
            style={{ maxWidth: "600px" }}
           >
               <h2 className="text-2xl" >Thank You for the purchase</h2>
               <p className="text-green-600 text-xl mb-3">Your payment is successfull!</p>
               <p className="text-lg">Transaction Id: <span className="text-slate-600 px-2 py-1 rounded">{tId}</span></p>
               <Link className="btn btn-outline mt-5" to="/dashboard/my-orders">Go back to my orders</Link>
         </div>
      </div>
   );
};

export default PaymentSuccess;
