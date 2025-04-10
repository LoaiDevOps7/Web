import React from "react";
import Hero from "./Hero/Hero";
import WhyChoose from "./whychoose/WhyChoose";
import AnalyitcsFeautures from "./AnalyticsFeauture/AnalyticsFeauture";
import Package from "./Package/Package";
import Field from "./Fields/Field";
import About from "./About/About";

const Home = () => {
  return (
    <div className="overflow-hidden ">
      <div id="Hero">
        {" "}
        <Hero />{" "}
      </div>
      <div id="About">
        {" "}
        <About />{" "}
      </div>
      <div id="Why">
        <WhyChoose />
      </div>
      <div id="Ana">
        <AnalyitcsFeautures />
      </div>
      <div id="Field">
        <Field />
      </div>
      <div id="Package">
        <Package />
      </div>
    </div>
  );
};
export default Home;
