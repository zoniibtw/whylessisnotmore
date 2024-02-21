import fs from "fs";

interface WooCommerceCategory {
  id: number;
  name: string;
}

interface WooCommerceProduct {
  id: number;
  name: string;
  categories: { id: number; name: string }[];
}

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

interface LocalData {
  categories?: WooCommerceCategory[];
  products?: WooCommerceProduct[];
  posts?: WordPressPost[];
}

const handleLocalData = (
  fileName: string,
  newData: Partial<LocalData>,
): void => {
  const filePath = `./${fileName}`;

  try {
    // Try to read the existing data from the local file
    const existingData = JSON.parse(
      fs.readFileSync(filePath, "utf-8"),
    ) as LocalData;

    // Merge the new data with the existing data
    const mergedData: LocalData = {
      ...existingData,
      ...newData,
    };

    // Save the merged data back to the local file
    fs.writeFileSync(filePath, JSON.stringify(mergedData, null, 2), "utf-8");

    console.log(`${fileName} data successfully merged and saved.`);
  } catch (error) {
    console.error(`Error handling ${fileName} data:`, error);
  }
};

export default handleLocalData;
