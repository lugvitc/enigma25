import React, { useEffect } from "react";
import Speakers from "./components/Speakers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // Force GSAP animations to refresh when navigating to About page
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, []);

  return (
    <div className="">
      <Speakers />
    </div>
  );
};

export default About;
