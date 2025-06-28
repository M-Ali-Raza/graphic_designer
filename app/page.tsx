// app/page.tsx
import { getNavbarData } from "@/lib/getData";
import { getContent } from "@/lib/markdown";
import Intro from "@/components/Intro";
import { Content, Navbar } from "@/types/types";

export default function Home() {
  const navbarData:Navbar[] = getNavbarData();
  const text:Content=getContent();
  return (
    <div>
      <Intro navbarData={navbarData} text={text} />
    </div>
  );
}