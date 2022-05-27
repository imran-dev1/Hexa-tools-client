import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiWarningOutline } from "react-icons/ti";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import auth from "../../firebase.init";

const ManageAllOrders = () => {
   const [user, loading] = useAuthState(auth);
   const [deleteOrderId, setDeleteOrderId] = useState("");
   const {
      data: allOrders,
      isLoading,
      refetch,
   } = useQuery(["allOrders", user], () =>
      fetch(`https://hexa-tools.herokuapp.com/all-orders`, {
         method: "GET",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      }).then((res) => res.json())
   );
   if (isLoading || loading) {
      return <Loading></Loading>;
   }

   const handleCancelOrder = (id) => {
      console.log(id);
      fetch(`https://hexa-tools.herokuapp.com/order/${id}`, {
         method: "DELETE",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.deletedCount) {
               toast.success("Order cancelled successfully!");
               refetch();
               setDeleteOrderId("");
            }
            if (result.message) {
               toast.error("You don't have the authorization");
               setDeleteOrderId("");
            }
         });
   };
   return (
      <div>
         <h2 className="text-xl mb-2">Manage all orders</h2>
         <div class="overflow-x-auto w-full">
            {allOrders?.length !== 0 ? (
               <table class="table w-full">
                  <thead>
                     <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Order Date</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>TxId.</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allOrders?.map((order) => (
                        <tr key={order._id}>
                           <td>
                              <div class="flex items-center space-x-3">
                                 <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                       <img
                                          src={order.productImg}
                                          alt="Avatar Tailwind CSS Component"
                                       />
                                    </div>
                                 </div>
                                 <div>
                                    <div class="font-bold">{order.product}</div>
                                    <span className="text-xs text-slate-400">
                                       Order#{order._id}
                                    </span>
                                 </div>
                              </div>
                           </td>
                           <td>
                              <div className="flex items-center gap-1">
                                 {order.orderUnit} unit
                              </div>
                           </td>
                           <td>${order.orderAmount}</td>
                           <td>
                              <div className="flex flex-col">
                                 <span>{order.orderDate}</span>
                                 <span className="text-slate-400">
                                    {order.orderTime}
                                 </span>
                              </div>
                           </td>
                           <td>{order.customerName}</td>
                           <td>{order.email}</td>
                           <td>
                              <span className="text-slate-500">
                                 {order.txId}
                              </span>
                           </td>
                           <th>
                              <div className="flex gap-2 items-center">
                                 <span
                                    className={`text-sm badge  border-0 text-black font-thin ${
                                       order.status === "paid"
                                          ? "bg-success"
                                          : "bg-base-300"
                                    }`}
                                 >
                                    {order.status}
                                 </span>

                                 {order.status === "unpaid" && (
                                    <label
                                       for="delete-order"
                                       onClick={() =>
                                          setDeleteOrderId(order._id)
                                       }
                                       className="text-sm badge badge-lg border-0 text-white font-thin badge-error cursor-pointer"
                                    >
                                       Cancel
                                    </label>
                                 )}
                              </div>
                           </th>
                        </tr>
                     ))}
                  </tbody>
                  <tfoot>
                     <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Order Date</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>TxId.</th>
                        <th>Action</th>
                     </tr>
                  </tfoot>
               </table>
            ) : (
               `There is no any order.`
            )}
         </div>
         {deleteOrderId && (
            <>
               <input type="checkbox" id="delete-order" class="modal-toggle" />
               <div class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                     <h3 class="font-bold text-lg flex items-end ">
                        <TiWarningOutline className="text-5xl text-red-500"></TiWarningOutline>
                        Are you sure?
                     </h3>
                     <p>
                        Are you sure you want to delete this order? Order will
                        be deleted permanently.
                     </p>

                     <div class="modal-action">
                        <button
                           onClick={() => setDeleteOrderId("")}
                           class="btn text-white border-0"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => handleCancelOrder(deleteOrderId)}
                           class="btn bg-red-500 hover:bg-red-600 text-white border-0"
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default ManageAllOrders;
