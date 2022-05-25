import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import auth from "../../firebase.init";
import UpdateProfileForm from "./UpdateProfileForm";
import { GrFacebookOption, GrGithub } from "react-icons/gr";

const MyProfile = () => {
   const [user] = useAuthState(auth);
   const [update, setUpdate] = useState(false);

   const {
      data: userInfo,
      isLoading,
      refetch,
   } = useQuery("user", () =>
      fetch(`http://localhost:4000/user/${user.email}`, {
         method: "GET",
         headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      }).then((res) => res.json())
   );
   if (isLoading) {
      return <Loading></Loading>;
   }

   return (
      <div>
         <h2 className="mb-2 text-xl">My profile</h2>
         <div className="border max-w-md flex flex-col justify-center items-center rounded-lg p-10 gap-1">
            <img
               className="rounded-lg max-w-[100px]"
               src={userInfo?.photo}
               alt=""
            />
            <h3 className="text-2xl">{userInfo?.name}</h3>
            <h3 className="text-lg">{userInfo?.email}</h3>
            <div className="flex gap-2">
               {userInfo?.facebook && (
                  <a href={userInfo?.facebook} target="_blank">
                     <GrFacebookOption className="text-2xl"></GrFacebookOption>
                  </a>
               )}
               {userInfo?.github && (
                  <a href={userInfo?.github} target="_blank">
                     <GrGithub className="text-2xl"></GrGithub>
                  </a>
               )}
            </div>
            <label
               onClick={() => setUpdate(true)}
               for="update-profile"
               className="btn btn-xs bg-base-200 rounded-md text-black  capitalize hover:text-white"
            >
               Update
            </label>
         </div>
         {update && (
            <UpdateProfileForm
               update={update}
               setUpdate={setUpdate}
               userInfo={userInfo}
               refetch={refetch}
            ></UpdateProfileForm>
         )}
      </div>
   );
};

export default MyProfile;
