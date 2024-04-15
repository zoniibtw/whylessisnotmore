import React, { useState, useEffect } from "react";
import useScrollToTop from "../../utils/ScrollToTop";
import { CategoryBanner, CategoryViewall, Product } from "../../components";

interface CategoryProps {
  selectedCategory: string | null;
  color?: "purple" | "blue" | "gold" | "pink";
}

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
  hero_page: string;
  interior: string;
  style: string;
  hotels: string;
  journal: string;
  story: string;
  wishlist: string;
  cookies: string;
}

function Category({ selectedCategory, color }: CategoryProps) {
  const [categoryImages, setCategoryImages] = useState<CategoryImages | null>(null);
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryText, setCategoryText] = useState<string>("");
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch category images");
        }
        const data: CategoryImages = await response.json();
        setCategoryImages(data);
      } catch (error) {
        console.error("Error fetching category images:", error);
      }
    };

    fetchImages();
    // Fetch product data as well
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ProductData[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!categoryImages) return;
    switch (selectedCategory) {
      case "interiors":
        setCategoryImage(categoryImages.interior);
        setCategoryTitle("Interiors");
        setCategoryText(
          "Your home is a canvas of your personality. Whether you lean towards elegant minimalism or embrace vibrant chic, we've scoured the market to unveil a meticulously curated collection of our absolute favorite pieces."
        );
        break;
      case "style":
        setCategoryImage(categoryImages.style);
        setCategoryTitle("Style");
        setCategoryText(
          "Discover the epitome of elegance and sophistication in our thoughtfully assembled collection of timeless classics and cutting-edge fashion pieces. Our very own expression of lasting allure."
        );
        break;
      case "hotels":
        setCategoryImage(categoryImages.hotels);
        setCategoryTitle("Hotels");
        setCategoryText(
          "Passion for travel runs deep within us, and we invite you to join in the adventure. Explore a world of charm with our handpicked collection of unique hotels across the globe. Each one promises an unforgettable stay and a touch of enchantment."
        );
        break;
      default:
        setCategoryImage(null);
        setCategoryTitle("");
        setCategoryText("");
        break;
    }
  }, [selectedCategory, categoryImages]);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category.toLowerCase() === selectedCategory
      )
    : [];

  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <>
      {categoryImage && (
        <CategoryBanner
          title={categoryTitle}
          text={categoryText}
          image={categoryImage}
          color={color || "purple"}
          flow="default"
          mt="true"
        />
      )}
      <CategoryViewall color={color || "purple"}>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            data={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={() => toggleWishlist(product.id)}
          />
        ))}
      </CategoryViewall>
    </>
  );
}

export default Category;
