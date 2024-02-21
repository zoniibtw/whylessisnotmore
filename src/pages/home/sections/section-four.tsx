import React, { useState, useEffect } from "react";
import { CategoryItems, CategoryBanner, Product } from "../../../components";
import Hotel from "../../../assets/wepb/categories/hotel.webp";

// Define a type for the products
interface ProductData {
  id: number;
  category: string;
  date: string;
  title: string;
  product_description: string;
  price: string;
  skimlink_url: string;
  product_image: string;
  gallery_image: string;
}

function SectionFour() {
  const [hotelsProducts, setHotelsProducts] = useState<ProductData[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ProductData[] = await response.json();
        const latestHotelsProducts = data
          .filter((product) => product.category.toLowerCase() === "hotels")
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 4);
        setHotelsProducts(latestHotelsProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to toggle wishlist status
  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div id="hotels">
      <CategoryBanner
        title="Hotels"
        text="Discover the epitome of elegance and sophistication in our thoughtfully assembled collection of timeless classics and cutting-edge fashion pieces. Our very own expression of lasting allure."
        image={Hotel}
        color="gold"
        flow="default"
      />
      <CategoryItems
        color="gold"
        title="Book the curation"
        category="Hotels"
        url="/hotels"
      >
        {/* Render the Product component for each hotel product */}
        {hotelsProducts.map((product) => (
          <Product
            key={product.id}
            data={product}
            // Pass isWishlisted prop based on whether the product ID is in the wishlist
            isWishlisted={wishlist.includes(product.id)}
            // Pass onToggleWishlist function to handle toggling wishlist status
            onToggleWishlist={() => toggleWishlist(product.id)}
          />
        ))}
      </CategoryItems>
    </div>
  );
}

export default SectionFour;
