import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../api/wcApi";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface FilterSidebarProps {
  onCategorySelect: (categoryId: number | null) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (id: number | null) => {
    setActiveCategory(id);
    onCategorySelect(id);
  };

  return (
    <aside className="bg-zinc-800 p-4 rounded w-full sm:w-64 text-black">
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
      <ul className="space-y-2">
        <li
          className={`cursor-pointer hover:text-orange-400 ${
            activeCategory === null ? "text-orange-400" : ""
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All Products
        </li>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={`cursor-pointer hover:text-orange-400 ${
              activeCategory === cat.id ? "text-orange-400" : ""
            }`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FilterSidebar;
