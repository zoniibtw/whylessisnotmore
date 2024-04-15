import React, { useState, useEffect } from "react";
import { CategoryItems, CategoryBanner, Product } from "../../../components";
import defaultHotelImage from "../../../assets/wepb/categories/hotel.webp";

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
  hotels: string;
}

function SectionFour() {
  const [hotelsProducts, setHotelsProducts] = useState<ProductData[]>([]);
  const [hotelImage, setHotelImage] = useState<string>(defaultHotelImage);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data: CategoryImages = await response.json();
        if (data.hotels) {
          setHotelImage(data.hotels);
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

    fetchImages();
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
        image={hotelImage}
        color="gold"
        flow="default"
      />
      <CategoryItems
        color="gold"
        title="Book the curation"
        category="Hotels"
        url="/hotels"
      >
        {hotelsProducts.map((product) => (
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

export default SectionFour;
