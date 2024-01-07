// src/utils/dataHandler.ts
import fs from 'fs';

interface WooCommerceCategory {
  id: number;
  name: string;
}

interface WooCommerceProduct {
  id: number;
  name: string;
  categories: { id: number; name: string }[];
}

interface LocalData {
  categories: WooCommerceCategory[];
  products: WooCommerceProduct[];
}

const handleLocalData = (newData: Partial<LocalData>): void => {
  const filePath = './localData.json';

  try {
    // Try to read the existing data from the local file
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as LocalData;

    // Merge the new data with the existing data
    const mergedData: LocalData = {
      categories: [...existingData.categories, ...(newData.categories || [])],
      products: [...existingData.products, ...(newData.products || [])],
    };

    // Save the merged data back to the local file
    fs.writeFileSync(filePath, JSON.stringify(mergedData, null, 2), 'utf-8');

    console.log('Data successfully merged and saved.');
  } catch (error) {
    console.error('Error handling local data:', error);
  }
};

export default handleLocalData;
