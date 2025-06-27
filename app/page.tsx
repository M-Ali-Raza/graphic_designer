// app/page.tsx
import { getNavbarData } from "@/lib/getData";
import { getContent } from "@/lib/markdown";
import Intro from "@/components/Intro";
import { Content } from "@/types/types";

export default function Home() {
  const navbarData:any[] = getNavbarData();
  const text:Content=getContent();
  return (
    <div>
      <Intro navbarData={navbarData} text={text} />
    </div>
  );
}