import BodyContent from "@/components/BodyContent";
import Heading from "@/components/Heading";
import React from "react";
import { getServicesData } from "@/lib/getData";
import { getContent } from "@/lib/markdown";

const page = () => {
  const services: any[] = getServicesData();
  const { intro, job, content } = getContent();
  const introList = intro.split("!");
  const extractedIntro = introList[1].trim();
  const pronoun = extractedIntro.split(" ")[0];
  const name = extractedIntro.split(" ")[1].replace(/_/g, " ");
  return (
    <div
      className="px-2 py-20 md:px-5 md:py-20 lg:px-20 lg:py-10 flex flex-col gap-2 md:gap-5 lg:gap-10 max-h-screen overflow-y-auto
    items-center md:items-start text-center md:text-left"
    >
      <Heading name={process.env.NEXT_PUBLIC_ABOUT_HEADING} />
      <BodyContent
        data={services}
        content={content}
        firstNormalFont={pronoun}
        boldFont={name}
        lastNormalFont={job}
        subHeading={process.env.NEXT_PUBLIC_SERVICE_SUBHEADING}
      />
    </div>
  );
};

export default page;
