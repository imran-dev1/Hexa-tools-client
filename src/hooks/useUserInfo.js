import { useQuery } from "react-query";

const useUserInfo = (user) => {
   const email = user?.email;
   const {
      data: userInfo,
      isLoading,
      refetch,
   } = useQuery("userProfile", () =>
      fetch(`https://hexa-tools.herokuapp.com/user/${email}`, {
         method: "GET",
         headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      }).then((res) => res.json())
   );

   return [userInfo, isLoading, refetch];
};

export default useUserInfo;
