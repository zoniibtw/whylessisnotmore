import { CategoryBanner } from "../../components";

import InteriorsImage from "../../assets/wepb/categories/interior.webp";
import StyleImage from "../../assets/wepb/categories/style.webp";
import HotelImage from "../../assets/wepb/categories/hotel.webp";
import JournalImage from "../../assets/wepb/categories/journal.webp";

function Category() {
    return ( 
        <>
            <CategoryBanner 
                title="" 
                text="" 
                image={InteriorsImage} 
                color="purple"
                flow="default"
            />
        </>
     );
}

export default Category;