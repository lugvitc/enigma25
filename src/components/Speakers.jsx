import React from "react";
import Speaker from "./Speaker.jsx";
import AnimatedText from "./text.jsx";

function Speakers() {
  const speakersData = [
    {
      name: "Yeyati Prasher",
      image: "/cool-peeps/yeyati.jpg",
      subname: "Linux Basics",
      values: {
        "Introduction to Linux": "Understanding the basics",
        "Command Line Tools": "Essential CLI utilities",
        "File System": "Navigating and managing files",
        "Networking": "Linux network fundamentals",
      },
    },
    {
      name: "Sid Karnam",
      image: "/cool-peeps/sid.jpg",
      subname: "Binary Exploitation",
      values: {
        "OSINT Basics": "What is Open Source Intelligence?",
        "Finding Information": "Techniques and tools",
        "Data Analysis": "Extracting insights",
        "Social Engineering": "How OSINT aids in cybersecurity",
      },
    },
    {
      name: "Goutham Rajeev",
      image: "/cool-peeps/goutham.jpg",
      subname: "Web Security",
      values: {
        "Web Vulnerabilities": "XSS, CSRF, SQL Injection",
        "Penetration Testing": "Tools and techniques",
        "Exploiting Web Apps": "Fixing security loopholes",
      },
    },
    {
      name: "Preetham Pemmasani",
      image: "/cool-peeps/preetham.jpg",
      subname: "OSINT",
      values: {
        "OSINT Basics": "What is Open Source Intelligence?",
        "Finding Information": "Techniques and tools",
        "Data Analysis": "Extracting insights",
        "Social Engineering": "How OSINT aids in cybersecurity",
      },
    },
  ];

  return (
    <div className="px-6 lg:px-20 py-10 text-left bg-black text-yellow-500 border border-green-500 shadow-lg rounded-lg">
      <AnimatedText
        text="SPEAKERS"
        className="w-full font-mono text-5xl md:text-7xl lg:text-9xl uppercase text-yellow-500 transition-all duration-300 hover:text-yellow-500"
        customText="_-"
        time={2}
      />

      <div className="mt-10 space-y-16 flex flex-col items-center">
        {speakersData.map((speaker, index) => (
          <Speaker key={index} index={index + 1} {...speaker} />
        ))}
      </div>
    </div>
  );
}

export default Speakers;
