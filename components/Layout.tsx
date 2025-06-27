"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Layout({ children,navbarData,logo }: { children: React.ReactNode;navbarData:any[];logo:string }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <div className="flex">
      {showSidebar && <Sidebar navbarData={navbarData} logo={logo} />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
