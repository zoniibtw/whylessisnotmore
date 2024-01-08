import { CategoryItems, CategoryBanner, Product } from "../../../components";
import Hotel from "../../../assets/wepb/categories/hotel.webp";

function SectionFour() {
    return ( 
        <div id="hotels">
            <CategoryBanner
                title="Hotels"
                text="Discover the epitome of elegance and sophistication in our thoughtfully assembled collection of timeless classics and cutting-edge fashion pieces. Our very own expression of lasting allure."
                image={Hotel}
                color="gold"
                flow="default"
            />
            <CategoryItems
                color="gold"
                title="Book the curration"
                category="Hotels"
                url=""
            >
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="gold" link="s" />
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="gold" link="s" />
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="gold" link="s" />
            </CategoryItems>
        </div>
     );
}

export default SectionFour;