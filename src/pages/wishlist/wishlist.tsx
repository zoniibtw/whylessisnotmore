import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryBanner, Section, Product } from "../../components";
import defaultWishlistImage from "../../assets/wepb/categories/wishlist.webp";  // Default image path

interface SlideProps {
  children: React.ReactNode;
  title: string;
  content: string;
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
  wishlist: string;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-10 gap-y-14 max-lg:grid-cols-3 max-md:grid-cols-2">
      {children}
    </div>
  );
};

const slidesData: { title: string; content: string; category: string }[] = [
  { title: "Hotels", content: "Content for Hotels slide.", category: "hotels" },
  { title: "Style", content: "Content for Style slide.", category: "style" },
  { title: "Interiors", content: "Content for Interiors slide.", category: "interiors" },
];

const WishList: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const [wishlistData, setWishlistData] = useState<ProductData[]>([]);
  const [wishlistImage, setWishlistImage] = useState<string>(defaultWishlistImage);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch category images");
        }
        const data: CategoryImages = await response.json();
        if (data.wishlist) {
          setWishlistImage(data.wishlist);
        }
      } catch (error) {
        console.error("Error fetching category images:", error);
      }
    };

    fetchImages();

    const storedWishlist: ProductData[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistData(storedWishlist);
    const firstSlideIndex = slidesData.findIndex(slide => storedWishlist.some(item => item.category === slide.category));
    setActiveSlide(firstSlideIndex !== -1 ? firstSlideIndex : 0);
  }, []);

  const filterWishlistByCategory = (category: string) => wishlistData.filter((product) => product.category === category);

  const renderProductsForSlide = (category: string) => {
    const products = filterWishlistByCategory(category);

    const emptyCategoryMessages: { [key: string]: string } = {
      hotels: "Add your favourite hotels",
      style: "Add items to your wishlist",
      interiors: "Add items to your wishlist",
    };

    const emptyMessage = emptyCategoryMessages[category] || "Empty, discover more here.";
    const emptyLink = `/${category}`;

    if (products.length === 0) {
      return (
        <div className="flex col-span-4 h-full justify-center items-center">
          <div className="flex flex-col items-center">
            <p>{emptyMessage}</p>
            <Link to={emptyLink} className="underline">
              Discover here.
            </Link>
          </div>
        </div>
      );
    }
    return products.map((product) => (
      <Product
        key={product.id}
        data={product}
        isWishlisted={true}
        onToggleWishlist={() => {}}
      />
    ));
  };

  const getButtonColor = (index: number) => {
    const colors = ["bg-strong-gold", "bg-strong-blue", "bg-strong-pink"];
    return `border w-3 h-3 rounded-full ${index === activeSlide ? colors[index] : "border"}`;
  };

  const getBackgroundClass = () => {
    const colors = ["bg-light-gold", "bg-light-blue", "bg-light-pink"];
    return colors[activeSlide ?? 0];
  };

  return (
    <>
      <CategoryBanner
        title="Wishlist"
        text="Our platform offers a convenient way to collect, curate, and save all your cherished items in various categories. Whether it's interiors, style, hotels, or any other treasure you stumble upon."
        image={wishlistImage}
        color="green"
        flow="default"
      />
      <div className={`pb-[5%] pt-[2.5%] transition-colors ${getBackgroundClass()} max-md:pt-8 max-md:pb-8`}>
        <Section>
          <div className="flex w-full justify-center gap-4 pb-[2.5%] max-md:pb-8 max-md:pt-0">
            {slidesData.map((slide, index) => (
              <button
                title={slide.title}
                key={index}
                className={getButtonColor(index)}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
          <div className="flex w-full overflow-hidden">
            <div className="slide-container" style={{ transform: `translateX(-${activeSlide! * 100}%)` }}>
              {slidesData.map((slide, index) => (
                <div key={index} className="slide">
                  <Slide title={slide.title} content={slide.content}>
                    {renderProductsForSlide(slide.category)}
                  </Slide>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default WishList;
