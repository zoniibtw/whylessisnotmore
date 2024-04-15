import React, { useState, useEffect } from "react";
import { CategoryItems, CategoryBanner, Product } from "../../../components";
import defaultInteriorsImage from "../../../assets/wepb/categories/interior.webp";

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

interface CategoryImages {
  interior: string;
}

function SectionTwo() {
  const [interiorProducts, setInteriorProducts] = useState<ProductData[]>([]);
  const [interiorImage, setInteriorImage] = useState<string>(defaultInteriorsImage);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data: CategoryImages = await response.json();
        if (data.interior) {
          setInteriorImage(data.interior);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ProductData[] = await response.json();
        const latestInteriorProducts = data
          .filter((product) => product.category.toLowerCase() === "interiors")
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 4);
        setInteriorProducts(latestInteriorProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImages();
    fetchData();
  }, []);

  // Define functions to handle wishlist functionality
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div id="interiors">
      <CategoryBanner
        title="Interiors"
        text="Your home is a canvas of your personality. Whether you lean towards elegant minimalism or embrace vibrant chic, we've scoured the market to unveil a meticulously curated collection of our absolute favorite pieces."
        image={interiorImage}
        color="purple"
        flow="default"
      />
      <CategoryItems
        color="purple"
        title="Shop the curation"
        category="Interiors"
        url="/interiors"
      >
        {interiorProducts.map((product) => (
          <Product
            key={product.id}
            data={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={() => toggleWishlist(product.id)}
          />
        ))}
      </CategoryItems>
    </div>
  );
}

export default SectionTwo;
