import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import { FiEdit } from "react-icons/fi";

const ManageProducts = () => {
   const [deleteId, setDeleteId] = useState("");
   const [updatedProduct, setUpdatedProduct] = useState(null);

   const [productName, setProductName] = useState("");
   const [productDetails, setProductDetails] = useState("");
   const [price, setPrice] = useState(0);
   const [available, setAvailable] = useState(0);
   const [minimumOrder, setMinimumOrder] = useState(0);
   useEffect(() => {
      setProductName(updatedProduct?.name);
      setProductDetails(updatedProduct?.details);
      setPrice(updatedProduct?.price);
      setAvailable(updatedProduct?.available);
      setMinimumOrder(updatedProduct?.minimum_order);
   }, [updatedProduct]);

   const {
      data: products,
      isLoading,
      refetch,
   } = useQuery("manageProducts", () =>
      fetch("https://hexa-tools.herokuapp.com/product").then((res) =>
         res.json()
      )
   );

   if (isLoading) {
      return <Loading></Loading>;
   }
   const handleUpdate = (event, id) => {
      event.preventDefault();
      if (productName && productDetails && price && available && minimumOrder) {
         fetch(`https://hexa-tools.herokuapp.com/product/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
               name: productName,
               details: productDetails,
               price: price,
               available: available,
               minimum_order: minimumOrder,
            }),
            headers: {
               "Content-type": "application/json; charset=UTF-8",
               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         })
            .then((response) => response.json())
            .then((result) => {
               console.log(result);
               if (result.modifiedCount) {
                  toast.success("Product successfully updated!");
                  refetch();
                  setUpdatedProduct(null);
               }
               if (result.message) {
                  toast.error("You don't have the authorization");
                  setUpdatedProduct(null);
               }
            });
      } else {
         toast.error("Please fill up all the field");
      }
   };

   const handleDelete = (id) => {
      fetch(`https://hexa-tools.herokuapp.com/product/${id}`, {
         method: "DELETE",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.deletedCount) {
               toast.success("Product deleted successfully!");
               refetch();
               setDeleteId("");
            }
            if (result.message) {
               toast.error("You don't have the authorization");
               setDeleteId("");
            }
         });
   };

   return (
      <div>
         <h2 className="text-xl mb-2">Manage Products</h2>
         <div class="overflow-x-auto w-full">
            <table class="table w-full">
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Available</th>
                     <th>Minimum Order</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((p) => (
                     <tr key={p._id}>
                        <td>
                           <div class="flex items-center space-x-3">
                              <div class="avatar">
                                 <div class="mask mask-squircle w-12 h-12">
                                    <img src={p.image} alt="product-img" />
                                 </div>
                              </div>
                              <div>
                                 <div class="font-bold">{p.name}</div>
                              </div>
                           </div>
                        </td>
                        <td>
                           <div className="flex items-center gap-1">
                              ${p.price}
                           </div>
                        </td>
                        <td>{p.available}</td>
                        <td>{p.minimum_order}</td>
                        <th>
                           <div className="flex gap-2 items-center">
                              <label
                                 onClick={() => setUpdatedProduct(p)}
                                 for="update-product"
                                 class=" cursor-pointer"
                              >
                                 <FiEdit className="text-2xl hover:text-primary"></FiEdit>
                              </label>
                              <label
                                 onClick={() => setDeleteId(p._id)}
                                 for="delete-product"
                                 class=" cursor-pointer"
                              >
                                 <AiOutlineDelete className="text-3xl hover:text-red-500"></AiOutlineDelete>
                              </label>
                           </div>
                        </th>
                     </tr>
                  ))}
               </tbody>
               <tfoot>
                  <tr>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Available</th>
                     <th>Minimum Order</th>
                     <th>Action</th>
                  </tr>
               </tfoot>
            </table>
         </div>

         {/* Delete confirmation */}

         {deleteId && (
            <>
               <input
                  type="checkbox"
                  id="delete-product"
                  class="modal-toggle"
               />
               <div class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                     <h3 class="font-bold text-lg flex items-end ">
                        <TiWarningOutline className="text-5xl text-red-500"></TiWarningOutline>
                        Are you sure?
                     </h3>
                     <p>
                        Are you sure you want to delete this product? Product
                        will be deleted permanently.
                     </p>

                     <div class="modal-action">
                        <button
                           onClick={() => setDeleteId("")}
                           class="btn text-white border-0"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => handleDelete(deleteId)}
                           class="btn bg-red-500 hover:bg-red-600 text-white border-0"
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               </div>
            </>
         )}

         {updatedProduct && (
            <>
               <input
                  type="checkbox"
                  id="update-product"
                  class="modal-toggle"
               />
               <div class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                     <form
                        onSubmit={(e) => handleUpdate(e, updatedProduct._id)}
                        className=" max-w-xl flex flex-col gap-2 text-left"
                     >
                        <label htmlFor="name">
                           Product Name
                           <input
                              className="input input-bordered w-full"
                              id="name"
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                           />
                        </label>
                        {productName === "" && (
                           <p className="text-red-400 text-sm ">
                              Please add product name!
                           </p>
                        )}
                        <label htmlFor="details">
                           Product Details
                           <textarea
                              className="textarea textarea-bordered w-full"
                              id="details"
                              value={productDetails}
                              onChange={(e) =>
                                 setProductDetails(e.target.value)
                              }
                           />
                        </label>
                        {productDetails === "required" && (
                           <p className="text-red-400 text-sm ">
                              Please add product details!
                           </p>
                        )}
                        <label htmlFor="price">
                           Product Price
                           <input
                              className="input input-bordered w-full"
                              id="price"
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                           />
                        </label>
                        {price === 0 && (
                           <p className="text-red-400 text-sm ">
                              Please add product price!
                           </p>
                        )}

                        <div className="flex gap-2">
                           <div className="flex-1">
                              <label htmlFor="available">
                                 Available Unit
                                 <input
                                    className="input input-bordered w-full"
                                    id="available"
                                    type="number"
                                    value={available}
                                    onChange={(e) =>
                                       setAvailable(e.target.value)
                                    }
                                 />
                              </label>
                              {available === 0 && (
                                 <p className="text-red-400 text-sm ">
                                    Please add available unit!
                                 </p>
                              )}
                           </div>
                           <div className="flex-1">
                              <label htmlFor="minimumUnit">
                                 Minimum Order Unit
                                 <input
                                    className="input input-bordered w-full"
                                    id="minimumUnit"
                                    type="number"
                                    value={minimumOrder}
                                    onChange={(e) =>
                                       setMinimumOrder(e.target.value)
                                    }
                                 />
                              </label>
                              {minimumOrder === 0 && (
                                 <p className="text-red-400 text-sm ">
                                    Please add minimum order unit!
                                 </p>
                              )}
                           </div>
                        </div>

                        <input
                           type="submit"
                           value="Update"
                           className=" btn btn-primary text-lg text-white mt-3"
                        />
                     </form>

                     <div class="modal-action">
                        <button
                           onClick={() => setUpdatedProduct("")}
                           class="btn  text-white border-0"
                        >
                           Cancel
                        </button>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default ManageProducts;
