import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  title: string;
  description: string;
  buttonTitle: string;
  href?: string;
  buttonAction?: () => void;
}

const NoResults = ({
  title,
  description,
  buttonTitle,
  href,
  buttonAction,
}: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-[24px] font-bold leading-[31.2px] text-white mt-8">
        {title}
      </h2>
      <p className="body-regular text-white my-3.5 max-w-md text-center">
        {description}
      </p>
      {href ? (
        <Link href={href} className="flex justify-end max-sm:w-full">
          <Button className="mt-5 min-h-[46px] w-full bg-green-500 px-4 py-3 font-semibold !text-light-1 transition-colors duration-300 ease-in-out hover:bg-green-400 sm:w-fit">
            {buttonTitle}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={buttonAction}
          className="mt-5 min-h-[46px] w-full bg-green-500 px-4 py-3 font-semibold !text-white transition-colors duration-300 ease-in-out hover:bg-green-400 sm:w-fit"
        >
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};

export default NoResults;
