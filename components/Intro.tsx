// components/Intro.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AboutIcon from "./icons/AboutIcon";
import EducationIcon from "./icons/EducationIcon";
import PortfolioIcon from "./icons/PortfolioIcon";
import ContactIcon from "./icons/ContactIcon";
import { Content, Navbar } from "@/types/types";

interface NavbarProps {
  navbarData: Navbar[];
  text: Content;
}

export default function Intro (props:NavbarProps) {
  const {navbarData,text} = props
  const {intro,job,btn_name,logo,content} = text
  const [isMobile, setIsMobile] = useState(false);
  const navbar = [...navbarData];
  navbar.shift();
  const navLinks = [
    { ...navbar[0], icon: <AboutIcon /> },
    { ...navbar[1], icon: <EducationIcon /> },
    { ...navbar[2], icon: <PortfolioIcon /> },
    { ...navbar[3], icon: <ContactIcon /> },
  ];
  const textArray=intro.split(" ")
  const name = textArray.pop()
  const textString=textArray.join().replaceAll(","," ")
  const nameString=name.replaceAll("_"," ")

  // Handle responsive state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-secondary min-h-screen flex items-center relative overflow-hidden">
      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-100px);
          }
        }

        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(100px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .float-reverse-animation {
          animation: floatReverse 8s ease-in-out infinite;
        }

        .rotate-animation {
          animation: rotate 20s linear infinite;
        }

        .pulse-animation {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative elements - moved further from content */}
      <div className="absolute top-0 left-0 w-4 md:w-8 h-full bg-primary opacity-70 hidden md:block"></div>
      <div className="absolute top-0 right-0 w-4 md:w-8 h-full bg-primary opacity-70 hidden md:block"></div>

      {/* Main content container - centered vertically */}
      <div className="container mx-auto px-4 py-8 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-center h-full w-full">
        {/* Left content - Text and CTA */}
        <div className="w-full md:w-2/5 flex flex-col justify-center text-center md:text-left mb-12 md:mb-0 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-h1">
            {textString} <span className="text-primary">{nameString}</span>
          </h1>

          <div className="mt-4 md:mt-6 flex flex-col items-center md:items-start justify-center md:justify-start">
            <h2 className="text-xl md:text-2xl text-h1">
              {job}
            </h2>
            <div className="mt-4 md:mt-6 text-base md:text-lg text-h1 max-w-lg"
            dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>

          <div className="mt-8 md:mt-10">
            <Link
              href={navLinks[0].path}
              className="inline-block bg-primary text-h1 py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 font-medium"
            >
              {btn_name}
            </Link>
          </div>

          {/* Mobile navigation */}
          {isMobile && (
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-4 gap-4">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.path}
                    className="w-12 h-12 flex items-center justify-center bg-primary text-h1 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-110"
                    aria-label={link.name}
                  >
                    <span className="text-lg">{link.icon}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle section - Vertical Navigation (Desktop only) */}
        {!isMobile && (
          <div className="w-1/5 flex flex-col items-center justify-center relative z-10">
            {/* Vertical SVG Line */}
            <svg
              width="4"
              height="300"
              viewBox="0 0 4 300"
              className="absolute"
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="300"
                stroke="rgb(231, 0, 125)"
                strokeWidth="2"
                strokeDasharray="8 4"
              />
            </svg>

            {/* Vertical Navigation Links */}
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className="w-14 h-14 flex flex-col items-center justify-center bg-primary text-h1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative z-10"
                  aria-label={link.name}
                >
                  <span className="text-lg">{link.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Right content - Profile image */}
        <div className="w-full md:w-2/5 flex justify-center relative z-10">
          <div className="relative">
            {/* Profile Image */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="w-full h-full rounded-full p-1 bg-gradient-to-r from-primary to-primary/70">
                <div className="w-full h-full rounded-full overflow-hidden bg-primary flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements - moved further out */}
      <div
        className="absolute top-1/4 left-16 w-32 h-32 rounded-full bg-primary opacity-10 float-animation"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-16 w-48 h-48 rounded-full bg-primary opacity-5 float-reverse-animation"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  );
};

