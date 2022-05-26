import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import UpdateProfileForm from "./UpdateProfileForm";
import { GrFacebookOption, GrGithub } from "react-icons/gr";
import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../../components/Loading/Loading";

const MyProfile = () => {
   const [user] = useAuthState(auth);
   const [update, setUpdate] = useState(false);
   const [userInfo, isLoading, refetch] = useUserInfo(user);

   if (isLoading) {
      return <Loading></Loading>;
   }
    
  refetch()

   return (
      <div>
         <h2 className="mb-2 text-xl">My profile</h2>
         <div className="border max-w-md flex flex-col justify-center items-center rounded-lg p-10 gap-1">
            <img
               className="rounded-lg max-w-[100px]"
               src={userInfo?.photo}
               alt=""
            />
            {userInfo?.role && (
               <div class="badge badge-outline">{userInfo.role}</div>
            )}
            <h3 className="text-2xl">{userInfo?.name}</h3>
            {userInfo?.bio && <p className="text-slate-500">{userInfo?.bio}</p>}
            <div className="flex gap-2 mb-3">
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
            {userInfo?.address && <p>Address: {userInfo?.address}</p>}
            {userInfo?.country && <p>Country: {userInfo?.country}</p>}
            {userInfo?.phone && <p>Phone: {userInfo?.phone}</p>}
            {userInfo?.email && <p>Email: {userInfo?.email}</p>}
            <label
               onClick={() => setUpdate(true)}
               for="update-profile"
               className="mt-3 btn btn-xs bg-base-200 rounded-md text-black  capitalize hover:text-white"
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
