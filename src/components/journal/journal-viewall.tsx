import React, { ReactNode, FC, useEffect, useState } from "react";
import Section from "../section/section";
import JournalItem from "./journal";

interface JournalProps {
  children: ReactNode;
  color?: "purple" | "blue" | "pink" | "gold" | "default";
}

interface JournalData {
  title: string;
  post_content: string;
  blog_url: string;
  post_image: string;
  gallery_image: string;
  category: string;
}

const JournalViewall: FC<JournalProps> = ({ children }) => {
  const [journalData, setJournalData] = useState<JournalData[]>([]);

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await fetch("/journals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch journal data");
        }
        const data: JournalData[] = await response.json();
        setJournalData(data);
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };

    fetchJournalData();
  }, []);

  return (
    <div className="bg-light-pink py-[5%]">
      <Section>
        <div className="w-full flex">
          <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-10 gap-y-14 max-md:grid-cols-2">
            {journalData.map((data, index) => (
              <JournalItem key={index} data={data} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default JournalViewall;
