'use client'
import Image from 'next/image'
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // X icon for closing the menu
import { Navbar } from '@/types/types';

interface Props{
  navbarData:Navbar[];
  logo:string;
}

export default function Sidebar(props:Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const {navbarData,logo} = props;

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        !document.getElementById("sidebar")?.contains(event.target as Node) &&
        !document.getElementById("menu-button")?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Function to check if a link is active
  const isActiveLink = (path: string): boolean => {
    if (path === '/' && pathname === '/') {
      return true;
    }
    if (path !== '/' && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  // Navigation items
  const navItems = navbarData

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="menu-button"
        className="md:hidden p-2 text-white bg-primary fixed top-4 left-4 rounded-full shadow-lg z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay (closes sidebar when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 bg-primary w-64 transition-transform transform z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative md:w-64 h-screen flex flex-col`}
      >
        <div className="flex items-center justify-center p-10 bg-black">
          <Image 
            src={logo} 
            alt="Profile" 
            width={100}
            height={100}
            className="w-28 h-28 border-5 rounded-full bg-primary" 
          />
        </div>

        <nav className="mt-6 flex items-center w-full flex-1">
          <ul className="space-y-5 flex flex-col items-center w-full text-xl font-bold">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.path} 
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors duration-200 ${
                    isActiveLink(item.path) 
                      ? 'text-white' 
                      : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
