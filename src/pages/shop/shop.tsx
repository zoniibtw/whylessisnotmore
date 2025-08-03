import React, { useState } from "react";
import ShopGrid from "../../components/shop/ShopGrid";
import FilterSidebar from "../../components/shop/FilterSidebar";

const ShopPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-zinc-950 text-white">
      <div className="w-full sm:w-1/4 p-4">
        <FilterSidebar onCategorySelect={setSelectedCategoryId} />
      </div>
      <div className="flex-1 p-4">
        <ShopGrid categoryId={selectedCategoryId ?? undefined} />
      </div>
    </div>
  );
};

export default ShopPage;
