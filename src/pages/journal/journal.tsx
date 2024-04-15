import React, { useState, useEffect } from "react";
import { CategoryBanner, JournalViewall } from "../../components";
import useScrollToTop from "../../utils/ScrollToTop";
import defaultJournalImage from "../../assets/wepb/categories/journal.webp";

interface CategoryImages {
  journal: string;
}

function Journal() {
  const [journalImageUrl, setJournalImageUrl] = useState<string>(defaultJournalImage);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch category images");
        }
        const data: CategoryImages = await response.json();
        if (data.journal) {
          setJournalImageUrl(data.journal);
        }
      } catch (error) {
        console.error("Error fetching category images:", error);
        // Retain the default image in case of fetch failure
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <CategoryBanner
        title="From the journal"
        text="From ELLE Sweden contributor to a more personal perspective: Dive into the world of our founder, Louisa Falkenberg, as she spills the beans on Interior Secrets, Hidden Gems, and the Life of a Mom wrangling two tiny toddlers."
        image={journalImageUrl}
        color="pink"
        flow="default"
      />
      <JournalViewall>
        <div className="hidden"></div>
      </JournalViewall>
    </>
  );
}

export default Journal;
