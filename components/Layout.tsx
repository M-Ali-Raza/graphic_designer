"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { Navbar } from "@/types/types";

export default function Layout({ children,navbarData,logo }: { children: React.ReactNode;navbarData:Navbar[];logo:string }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <div className="flex">
      {showSidebar && <Sidebar navbarData={navbarData} logo={logo} />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
