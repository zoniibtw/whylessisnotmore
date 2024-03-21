import React, { useEffect, useState } from "react";
import { CategoryBanner, Section, Product } from "../../components";
import Image from "../../assets/wepb/categories/wishlist.webp";
import { CSSTransition } from "react-transition-group";

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

  useEffect(() => {
    // Retrieve wishlist data from local storage
    const storedWishlist: ProductData[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistData(storedWishlist);

    // Determine the first slide to display based on the presence of wishlist items
    const firstSlideIndex = slidesData.findIndex(slide => storedWishlist.some((item: ProductData) => item.category === slide.category));
    setActiveSlide(firstSlideIndex !== -1 ? firstSlideIndex : 0);
  }, []);

  const filterWishlistByCategory = (category: string) => {
    return wishlistData.filter((product) => product.category === category);
  };

  const renderProductsForSlide = (category: string) => {
    const products = filterWishlistByCategory(category);
    return products.map((product) => (
      <Product
        key={product.id}
        data={product}
        isWishlisted={true} // Assuming all products in the wishlist are wishlisted
        onToggleWishlist={() => {}}
      />
    ));
  };

  const getButtonColor = (index: number) => {
    const activeColor = getActiveButtonColor();
    return `border w-3 h-3 rounded-full ${index === activeSlide ? activeColor : "border"}`;
  };

  const getBorderColor = (index: number) => {
    switch (activeSlide) {
      case 0:
        return "border-strong-gold";
      case 1:
        return "border-strong-blue";
      case 2:
        return "border-strong-pink";
      default:
        return "";
    }
  };

  const getActiveButtonColor = () => {
    switch (activeSlide) {
      case 0:
        return "bg-strong-gold";
      case 1:
        return "bg-strong-blue";
      case 2:
        return "bg-strong-pink";
      default:
        return "border";
    }
  };

  const getBackgroundClass = () => {
    switch (activeSlide) {
      case 0:
        return "bg-light-gold";
      case 1:
        return "bg-light-blue";
      case 2:
        return "bg-light-pink";
      default:
        return "";
    }
  };

  return (
    <>
      <CategoryBanner
        title="Wish List"
        text="Our platform offers a convenient way to collect, curate, and save all your cherished items in various categories. Whether it's interiors, style, hotels, or any other treasure you stumble upon."
        image={Image}
        color="green"
        flow="default"
      />
      <div
        className={`pb-[5%] pt-[2.5%] transition-colors ${getBackgroundClass()} max-md:pt-8 max-md:pb-0`}
      >
        <Section>
          <div className="flex w-full justify-center gap-4 pb-[2.5%] max-md:pb-8 max-md:pt-0">
            {/* Slide buttons */}
            {slidesData.map((slide, index) => (
              <button
                title={slide.title}
                key={index}
                className={`${getButtonColor(index)} ${getBorderColor(index)}`}
                onClick={() => setActiveSlide(index)}
              ></button>
            ))}
          </div>
          <div className="flex w-full overflow-hidden">
            {/* Slide container with sliding effect */}
            <div
              className="slide-container"
              style={{ transform: `translateX(-${activeSlide! * 100}%)` }}
            >
              {slidesData.map((slide, index) => (
                <div key={index} className="slide">
                  <Slide title={slide.title} content={slide.content}>
                    {/* Render products for the current slide's category */}
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
}

export default WishList;
