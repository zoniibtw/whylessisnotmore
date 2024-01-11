import React, { useState, ReactNode } from 'react';
import { CategoryBanner, Section, Product } from "../../components";
import Image from "../../assets/wepb/categories/wishlist.webp";
import useScrollToTop from '../../utils/useScrollToTop';

interface SlideProps {
  children: ReactNode;
  title: string;
  content: string;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-10 gap-y-14">
      {children}
    </div>
  );
};

function WishList() {
  useScrollToTop();
  const slidesData = [
    { title: 'Hotels', content: 'Content for Hotels slide.' },
    { title: 'Style', content: 'Content for Style slide.' },
    { title: 'Interiors', content: 'Content for Interiors slide.' },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

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

  const getType = () => {
    switch (activeSlide) {
      case 0:
        return 'hotel';
      case 1:
      case 2:
        return 'standard';
      default:
        return 'standard'; // Set a default value
    }
  };

  const getColor = () => {
    switch (activeSlide) {
      case 0:
        return 'gold';
      case 1:
        return 'blue';
      case 2:
        return 'pink';
      default:
        return 'purple'; // Set a default value
    }
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
                <Slide title={slide.title} content={slide.content}>
                  {[...Array(12)].map((_, index) => (
                    <Product
                      key={index}
                      name="Ellos"
                      desc="Vägghylla Wave"
                      price="€80"
                      link="s"
                      type={getType()} // Call the function to get the actual value
                      color={getColor()} // Call the function to get the actual value
                    />
                  ))}
                </Slide>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

export default WishList;
