import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import AnimatedText from "./text"; 

function Speaker({ values = {}, name, subname, ct = "", image, index }) {
  const containerRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        valueRefs.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row items-center justify-center w-full px-6 md:px-12 lg:px-20 py-10 gap-6 md:gap-12 lg:gap-16 bg-black text-yellow-500 border border-green-500 shadow-md rounded-lg transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="w-full lg:w-1/3 text-center lg:text-left flex flex-col items-center lg:items-start">
        <AnimatedText
          customText={`${index < 10 ? "0" : ""}${index}. `}
          text={name}
          time={1}
          className="font-mono text-3xl md:text-4xl lg:text-5xl uppercase text-yellow-500 transition-all duration-300 hover:text-yellow-400 text-center lg:text-left"
        />
        <br />
        <AnimatedText
          text={subname}
          time={1}
          className="font-mono text-xl md:text-2xl lg:text-3xl uppercase text-gray-400 transition-all duration-300 hover:text-gray-300 text-center lg:text-left"
        />

        {image && (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="mt-6 w-[180px] md:w-[220px] lg:w-[250px] h-[180px] md:h-[220px] lg:h-[250px] object-cover rounded-lg shadow-lg border border-green-500 transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      <div className="w-full lg:w-2/3 text-white">
        {Object.entries(values).map(([key, value], idx) => (
          <div key={key} className="mb-3 md:mb-4">
            <div className="flex flex-wrap items-center justify-start">
              <div className="w-[60%] md:w-[40%] lg:w-[25vw] overflow-hidden">
                <AnimatedText
                  text={`${idx + 1}. ${key}`}
                  time={1}
                  className="text-sm md:text-lg lg:text-xl font-semibold text-green-400 font-mono transition-all duration-300 hover:text-green-300"
                />
              </div>

              <div
                className="ml-4 flex-grow opacity-0"
                ref={(el) => (valueRefs.current[idx] = el)}
              >
                <AnimatedText
                  text={value}
                  time={0.2}
                  className="w-full text-sm md:text-lg text-white font-mono transition-all duration-300 hover:text-gray-300"
                />
              </div>
            </div>

            <div className="mt-2 h-[2px] w-full bg-green-500 opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Speaker;
