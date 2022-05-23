import React from "react";
import "./Loading.css";

const Loading = () => {
   return (
      <div className="flex justify-center items-center p-16">
         <button className="btn bg-transparent border-0 loading text-black"></button>
      </div>
   );
};

export default Loading;
