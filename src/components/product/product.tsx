import React, { useState, useEffect } from "react";
import { MdStarOutline } from "react-icons/md";

export interface ProductData {
  id: number;
  title: string;
  product_description: string;
  price: string;
  skimlink_url: string;
  product_image: string;
  gallery_image: string;
  category: string;
}

interface ProductProps {
  data: ProductData;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
}

interface Colors {
  [key: string]: {
    bg: string;
    border: string;
  };
}

function Product({ data, isWishlisted, onToggleWishlist }: ProductProps) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlisted(storedWishlist.some((item: ProductData) => item.id === data.id));
  }, []);

  const handleToggleWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const isProductInWishlist = storedWishlist.some((item: ProductData) => item.id === data.id);

    if (isProductInWishlist) {
      const updatedWishlist = storedWishlist.filter((item: ProductData) => item.id !== data.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlisted(false);
    } else {
      const updatedWishlist = [...storedWishlist, { ...data, isWishlisted: true }];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlisted(true);
    }
  };

  const truncateDescription = (description: string) =>
    description.length > 30 ? description.substring(0, 30) + "..." : description;

  const getCategoryConfig = (category: string) => {
    const colors: Colors = {
      interiors: { bg: "bg-strong-purple", border: "border-strong-purple" },
      style: { bg: "bg-strong-blue", border: "border-strong-blue" },
      hotels: { bg: "bg-strong-gold", border: "border-strong-gold" },
      default: { bg: "bg-white", border: "white" },
    };

    const categoryLowerCase = category.toLowerCase();
    const colorClass = colors[categoryLowerCase]?.bg || colors.default.bg;
    const borderClass = colors[categoryLowerCase]?.border || colors.default.border;
    const hoverClass = `hover:${colorClass} hover:bg-opacity-70 hover:text-[#fff]`;
    const btnColor = `bg-opacity-0 ${borderClass} ${colorClass}`;
    const btnBuy = `bg-opacity-100 ${borderClass} ${colorClass} hover:bg-opacity-70`;

    return {
      colorClassTwo: `${borderClass} ${hoverClass} duration-300 transform-all ease-in-out`,
      btnColor,
      btnBuy,
      goToProductBg: colorClass,
    };
  };

  const {
    colorClassTwo,
    btnColor,
    btnBuy,
    goToProductBg,
  } = getCategoryConfig(data.category);

  // Button text based on product category
  const buttonText = data.category.toLowerCase() === "hotels" ? "Book" : "Go to product";

  return (
    <div className={`flex flex-col h-full justify-between col-span-1 row-span-1 gap-5 max-md:gap-4`}>
      <a href={data.skimlink_url} target="_blank" className={`border-2 p-0 m-0 w-full h-[20rem] relative overflow-hidden group max-md:h-[15rem] max-md:hidden ${colorClassTwo}`}>
        <div className={`h-full w-full absolute bg-no-repeat bg-cover bg-center opacity-100 group-hover:opacity-0 duration-300 transition-opacity ease-in-out`} style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${data.product_image})`}}></div>
        <div className={`h-full w-full absolute bg-no-repeat bg-cover bg-center opacity-0 group-hover:opacity-100 duration-300 transition-opacity ease-in-out`} style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${data.gallery_image})`}}></div>
      </a>
      <div className={`h-[15rem] border-2 p-0 m-0 w-full relative overflow-hidden group md:hidden ${colorClassTwo}`}>
        <div className={`h-full w-full absolute bg-no-repeat bg-cover bg-center opacity-100 group-hover:opacity-0 duration-300 transition-opacity ease-in-out`} style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${data.product_image})`}}></div>
        <div className={`h-full w-full absolute bg-no-repeat bg-cover bg-center opacity-0 group-hover:opacity-100 duration-300 transition-opacity ease-in-out`} style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${data.gallery_image})`}}></div>
      </div>
      <div className="flex flex-col items-center gap-2 max-md:gap-1">
        <h1 className="text-[20px] text-black overflow-hidden text-center max-md:text-[14px]">{data.title}</h1>
        <p title={data.product_description} className="text-[16px] text-center text-black max-md:text-[12px] hover:cursor-pointer">{truncateDescription(data.product_description)}</p>
        {data.category !== "hotels" && <p className="text-[16px] text-center text-black max-md:text-[12px]">{data.price} €</p>}
      </div>
      <div className="flex flex-col gap-4 max-md:gap-3">
        <button 
          onClick={() => window.open(data.skimlink_url, "_blank")} 
          className={`py-2 ${btnBuy} ${colorClassTwo} border-2 text-[16px] text-white font-normal max-md:py-1 max-md:text-[10px]`} 
          style={{ backgroundColor: goToProductBg }}>
          {buttonText}
        </button>
        <button 
          onClick={handleToggleWishlist} 
          className={`bg-none group transition-all duration-300 ease-in-out flex relative justify-center items-center py-3 ${btnColor} border-2 text-[16px] leading-[16px] max-md:text-[10px] max-md:leading-[10px] text-black hover:bg-opacity-70 hover:text-white hover:${colorClassTwo} max-md:py-2`}>
          <MdStarOutline className="absolute left-0 pl-5 h-5 w-auto opacity-100 group-hover:opacity-0 duration-300 transition-all ease-in-out max-md:h-3.5 max-md:pl-2" color="#000" fill="#000" size={15} />
          <MdStarOutline className="absolute left-0 pl-5 h-5 w-auto opacity-0 group-hover:opacity-100 duration-300 transition-all ease-in-out max-md:h-3.5 max-md:pl-2" color="#000" fill="#fff" size={15} />
          <span className="text-center">{wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</span>
        </button>
      </div>
    </div>
  );
}

export default Product;
