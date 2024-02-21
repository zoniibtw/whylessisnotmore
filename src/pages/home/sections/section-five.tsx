import React, { useState, useEffect } from "react";
import { CategoryItems, CategoryBanner } from "../../../components";
import Journal from "../../../components/journal/journal"; // Assuming this is the correct import path
import Image from "../../../assets/wepb/categories/journal.webp";

// Define a type for the journal data
interface JournalData {
  id: number;
  title: string;
  post_content: string;
  post_image: string;
  skimlink_url: string;
  gallery_image: string;
  category: string;
}

function SectionFive() {
  const [latestJournalPosts, setLatestJournalPosts] = useState<JournalData[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/journals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: JournalData[] = await response.json();
        const latestPosts = data.slice(0, 4);
        setLatestJournalPosts(latestPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="journal">
      <CategoryBanner
        title="From the journal"
        text="From ELLE Sweden contributor to a more personal perspective: Dive into the world of our founder, 
                Louisa Falkenberg, as she spills the beans on Interior Secrets, Hidden Gems, and the Life of a 
                Mom wrangling two tiny toddlers."
        image={Image}
        color="pink"
        flow="reverse"
      />
      <CategoryItems
        color="pink"
        title="Highlights"
        category="The journal"
        url="/journal"
      >
        {/* Render the JournalItem component for each journal post */}
        {latestJournalPosts.map((post) => (
          <Journal key={post.id} data={post} />
        ))}
      </CategoryItems>
    </div>
  );
}

export default SectionFive;
