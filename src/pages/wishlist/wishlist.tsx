import React, { useState } from 'react';
import { CategoryBanner, Section, Product } from "../../components";
import Image from "../../assets/wepb/categories/wishlist.webp";

interface SlideProps {
    title: string;
    content: string;
    wishlist: number[];
    onToggleWishlist: (index: number) => void;
}

const Slide: React.FC<SlideProps> = ({ title, content, wishlist, onToggleWishlist }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <div className="flex">
                {/* Render favorited products for this category */}
                {wishlist.map((index) => (
                    <Product
                        key={index}
                        name={`Product ${index + 1}`}
                        desc={`Product content for ${title}`}
                        price="Price placeholder"
                        link="#"
                        type="hotel"
                        color="gold"
                        onToggleWishlist={() => onToggleWishlist(index)}
                    />
                ))}
            </div>
        </div>
    );
};

function WishList() {
    const slidesData = [
        { title: 'Hotels', content: 'Content for Hotels slide.' },
        { title: 'Style', content: 'Content for Style slide.' },
        { title: 'Interiors', content: 'Content for Interiors slide.' },
    ];

    const [activeSlide, setActiveSlide] = useState(0);
    const [wishlist, setWishlist] = useState<number[]>([]);

    const getButtonColor = (index: number) => {
        const activeColor = getActiveButtonColor();
        return `border-2 w-4 h-4 rounded-full ${index === activeSlide ? activeColor : 'border'}`;
    };

    const getActiveButtonColor = () => {
        switch (activeSlide) {
            case 0:
                return 'border-strong-gold bg-strong-gold';
            case 1:
                return 'border-strong-blue bg-strong-blue';
            case 2:
                return 'border-strong-pink bg-strong-pink';
            default:
                return 'border';
        }
    };

    const getBackgroundClass = () => {
        switch (activeSlide) {
            case 0:
                return 'bg-light-gold';
            case 1:
                return 'bg-light-blue';
            case 2:
                return 'bg-light-pink';
            default:
                return '';
        }
    };

    const toggleWishlist = (itemIndex: number) => {
        const updatedWishlist = wishlist.includes(itemIndex)
            ? wishlist.filter((index) => index !== itemIndex)
            : [...wishlist, itemIndex];
        setWishlist(updatedWishlist);
    };

    return (
        <>
            <CategoryBanner
                title="Wish List"
                text="Our platform offers a convenient way to collect, curate, and save all your cherished items in various categories. Whether it's interiors, style, hotels, or any other treasure you stumble upon."
                image={Image}
                color="green"
                flow="default" />
            <div className={`transition-colors ${getBackgroundClass()}`}>
                <Section>
                    <div className="flex w-full justify-center gap-4 pb-[2.5%]">
                        {/* Slide buttons */}
                        {slidesData.map((slide, index) => (
                            <button
                                key={index}
                                className={getButtonColor(index)}
                                onClick={() => setActiveSlide(index)}
                            >
                            </button>
                        ))}
                    </div>
                    <div className="flex w-full">
                        {/* Different slides */}
                        {slidesData.map((slide, index) => (
                            <div
                                key={index}
                                className={`w-full ${index === activeSlide ? 'block' : 'hidden'}`}
                            >
                                <Slide
                                    title={slide.title}
                                    content={slide.content}
                                    wishlist={wishlist}
                                    onToggleWishlist={toggleWishlist}
                                />
                            </div>
                        ))}
                    </div>
                </Section>
            </div>
        </>
    );
}

export default WishList;
