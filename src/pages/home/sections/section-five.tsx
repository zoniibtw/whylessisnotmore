import React, { useState, useEffect } from "react";
import { CategoryItems, CategoryBanner } from "../../../components";
import Journal from "../../../components/journal/journal"; // Verify this is the correct import path for your Journal component
import defaultJournalImage from "../../../assets/wepb/categories/journal.webp";

// Define a type for the journal data
interface JournalData {
  id: number;
  title: string;
  post_content: string;
  post_image: string;
  blog_url: string;
  gallery_image: string;
  category: string;
}

interface CategoryImages {
  journal: string;
}

function SectionFive() {
  const [latestJournalPosts, setLatestJournalPosts] = useState<JournalData[]>([]);
  const [journalImage, setJournalImage] = useState<string>(defaultJournalImage);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data: CategoryImages = await response.json();
        if (data.journal) {
          setJournalImage(data.journal);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

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

    fetchImages();
    fetchData();
  }, []);

  return (
    <div id="journal">
      <CategoryBanner
        title="From the journal"
        text="From ELLE Sweden contributor to a more personal perspective: Dive into the world of our founder, 
                Louisa Falkenberg, as she spills the beans on Interior Secrets, Hidden Gems, and the Life of a 
                Mom wrangling two tiny toddlers."
        image={journalImage}
        color="pink"
        flow="reverse"
      />
      <CategoryItems
        color="pink"
        title="Highlights"
        category="The journal"
        url="/journal"
      >
        {latestJournalPosts.map((post) => (
          <Journal key={post.id} data={post} />
        ))}
      </CategoryItems>
    </div>
  );
}

export default SectionFive;
