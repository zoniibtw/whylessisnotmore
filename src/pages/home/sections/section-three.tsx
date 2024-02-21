import { useState, useEffect } from "react";
import { CategoryItems, CategoryBanner, Product } from "../../../components";
import Style from "../../../assets/wepb/categories/style.webp";

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

function SectionThree() {
  const [styleProducts, setStyleProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ProductData[] = await response.json();
        const latestStyleProducts = data
          .filter((product) => product.category.toLowerCase() === "style")
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 4);
        setStyleProducts(latestStyleProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
    <div id="style">
      <CategoryBanner
        title="Style"
        text="Discover the epitome of elegance and sophistication in our thoughtfully assembled collection of timeless classics and cutting-edge fashion pieces. Our very own expression of lasting allure."
        image={Style}
        color="blue"
        flow="reverse"
      />
      <CategoryItems
        color="blue"
        title="Shop the curation"
        category="Style"
        url="/style"
      >
        {/* Render the Product component for each interior product */}
        {styleProducts.map((product) => (
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

export default SectionThree;
