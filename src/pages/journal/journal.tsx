import { CategoryBanner, JournalViewall } from "../../components";
import Banner from "../../assets/wepb/categories/journal.webp";
import useScrollToTop from "../../utils/ScrollToTop";

function Journal() {
  return (
    <>
      <CategoryBanner
        title="From the journal"
        text="From ELLE Sweden contributor to a more personal perspective: Dive into the world of our founder, Louisa Falkenberg, as she spills the beans on Interior Secrets, Hidden Gems, and the Life of a Mom wrangling two tiny toddlers."
        image={Banner}
        color="pink"
        flow="default"
      />
      <JournalViewall>
        <div className="hidden"></div>
      </JournalViewall>
    </>
  );
}

export default Journal;
