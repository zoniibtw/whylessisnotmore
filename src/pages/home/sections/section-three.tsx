import { CategoryItems, CategoryBanner, Product } from "../../../components";
import Style from "../../../assets/wepb/categories/style.webp";

function SectionTwo() {
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
                title="Shop the curration"
                category="Style"
                url="/style"
            >
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="blue" link="s"/>
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="blue" link="s"/>
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="blue" link="s"/>
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="blue" link="s" hidden="hidden"/>
            </CategoryItems>
        </div>
     );
}

export default SectionTwo;