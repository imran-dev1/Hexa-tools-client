import React from "react";
import Banner from "./Banner";
import BrandLogos from "./BrandLogos";
import Features from "./Features";
import HomeProducts from "./HomeProducts";
import Reviews from "./Reviews";

const Home = () => {
   return (
      <>
         <Banner></Banner>
         <HomeProducts></HomeProducts>
         <Reviews></Reviews>
         <BrandLogos></BrandLogos>
         <Features></Features>
      </>
   );
};

export default Home;
