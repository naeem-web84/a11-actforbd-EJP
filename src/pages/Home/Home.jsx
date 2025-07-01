import React from "react";
import Banner from "./Banner"; 
import Gallery from "./Gallery";
import NewsLetter from "./NewsLetter";
import Feature from "./Feature"
import useTitle from "../shared/useTitle";
import HighlightsSection from "../../components/HighlightsSection";

const Home = () => {
  useTitle('Home');
  return (
    <div className="space-y-20 px-6 md:px-16 py-10 max-w-7xl mx-auto font-poppins text-primary">
      
      <Banner></Banner>
      <HighlightsSection></HighlightsSection>
      <Feature></Feature>
      <Gallery></Gallery>
      <NewsLetter></NewsLetter>

    </div>
  );
};



export default Home;
