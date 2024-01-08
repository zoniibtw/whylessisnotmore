import { CategoryItems, CategoryBanner, Product } from "../../../components";
import Journal from "../../../assets/wepb/categories/journal.webp";

function SectionFive() {
    return ( 
        <div id="journal">
            <CategoryBanner
                title="From the journal"
                text="From ELLE Sweden contributor to a more personal perspective: Dive into the world of our founder, Louisa Falkenberg, as she spills the beans on Interior Secrets, Hidden Gems, and the Life of a Mom wrangling two tiny toddlers."
                image={Journal}
                color="pink"
                flow="reverse"
            />
            <CategoryItems
                color="pink"
                title="Highlights"
                category="The journal"
                url=""
            >
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="pink" link="s" />
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="pink" link="s" />
                <Product name="Ellos" desc="Vägghylla Wave" price="€80" color="pink" link="s" />
            </CategoryItems>
        </div>
     );
}

export default SectionFive;