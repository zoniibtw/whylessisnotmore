import React from 'react';
import { CategoryBanner, Section } from "../../components";
import Image from "../../assets/wepb/categories/wishlist.webp"

interface SlideProps {

}

const Slide: React.FC = () => {
    return(
        <div></div>
    )
};

function WishList() {
    return ( 
        <>
            <CategoryBanner 
                title="Wish List" 
                text="Our platform offers a convenient way to collect, curate, and save all your cherished items in various categories. Whether it's interiors, style, hotels, or any other treasure you stumble upon." 
                image={Image} 
                color="green"
                flow="default" />
            <Section>
                <div className="flex w-full">

                </div>
            </Section>
        </>
     );
}

export default WishList;