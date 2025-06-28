import React from "react";
import Image from "next/image";
import Capsule from "./Capsule";
import { Services } from "@/types/types";

interface Props {
  data: Services[];
  content?: string | Promise<string>;
  firstNormalFont: string;
  boldFont: string;
  lastNormalFont: string;
  subHeading?: string;
}

const BodyContent = (props: Props) => {
  const {
    data,
    content,
    firstNormalFont,
    boldFont,
    lastNormalFont,
    subHeading,
  } = props;
  return (
    <div className="flex flex-col gap-5 items-center md:items-start">
      <h2 className="text-xl md:text-2xl lg:text-3xl">
        {firstNormalFont} <span className="font-bold">{boldFont}</span>{" "}
        {lastNormalFont}
      </h2>
      {content && <div
        className="text-xs md:text:sm lg:text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>}
      {subHeading && <Capsule name={subHeading} size={true} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((service, index) => (
          <div key={index} className="flex flex-col items-center gap-5 h-full p-4 border border-gray-200 rounded-lg">
            <div className="flex-shrink-0">
              <Image
                src={service.logo}
                alt={service.title}
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <h4 className="text-sm lg:text-base font-bold text-center">{service.title}</h4>
            <p className="text-xs md:text-sm lg:text-base text-center flex-grow">{service.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyContent;