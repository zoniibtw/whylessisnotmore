import { CategoryItems, CategoryBanner, Product } from "../../../components";
import Interiors from "../../../assets/wepb/categories/interior.webp";

function SectionTwo() {
    return ( 
        <div id="interiors">
            <CategoryBanner
                title="Interiors"
                text="Your home is a canvas of your personality. Whether you lean towards elegant minimalism or embrace vibrant chic, we've scoured the market to unveil a meticulously curated collection of our absolute favorite pieces."
                image={Interiors}
                color="purple"
                flow="default"
            />
            <CategoryItems
                color="purple"
                title="Shop the curration"
                category="Interiors"
                url="/interiors"
            >
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="purple" link="s"/>
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="purple" link="s"/>
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="purple" link="s"/>
            </CategoryItems>
        </div>
     );
}

export default SectionTwo;