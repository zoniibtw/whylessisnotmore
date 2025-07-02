import React from "react";
import { MdStarOutline } from "react-icons/md";
import "../../styles/global.css";

interface JournalProps {
  data: {
    id: string;
    title: string;
    link: string;
    image: string;
    pubDate: string;
  };
}

const JournalItem: React.FC<JournalProps> = ({ data }) => {
  const {
    id,
    title,
    link,
    image,
    pubDate,
  } = data;

  // Function to truncate content to 50 characters and append "..." if it exceeds
  const truncateContent = (content: string) => {
    if (content.length > 60) {
      return content.substring(0, 60) + "...";
    }
    return content;
  };

  return (
    <>
      {/* Desktop component */}
      <div
        className={`flex h-full justify-between flex-col col-span-1 row-span-1 gap-5`}
      >
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`border-2 p-0 m-0 w-full h-[20rem] relative overflow-hidden hover:cursor-pointer group border-strong-pink max-md:h-[15rem]`}
        >
          <div
            className={`h-full w-full absolute bg-no-repeat bg-cover bg-center group-hover:scale-110 duration-300 transition-all ease-in-out`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${image})`,
            }}
          ></div>
        </a>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[20px] text-black text-center max-md:text-[14px]">
            {title}
          </h1>
          <p className="text-[16px] leading-[19px] text-center text-black overflow-hidden overflow-ellipsis max-md:text-[12px]">
            {truncateContent(pubDate)}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => window.open(link, "_blank")}
            className={`py-2 border-strong-pink bg-strong-pink border-2 text-[16px] max-md:text-[10px] max-md:py-1 text-white font-normal duration-300 transition-all ease-in-out hover:bg-opacity-70`}
          >
            Read more
          </button>
        </div>
      </div>
    </>
  );
};

export default JournalItem;
