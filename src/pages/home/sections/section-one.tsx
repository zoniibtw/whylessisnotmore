import Image from "../../../assets/wepb/hero-bg.webp";
import { scrollTo } from "../../../utils/scrollTo";

function SectionOne() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(34, 34, 34, 0.3), rgba(34, 34, 34, 0.3)), url(${Image})`,
      }}
    >
      <div className="h-[92vh] w-full py-[5%] px-4 md:px-0 md:w-11/12 xl:w-10/12 mx-auto max-w-custom flex items-center">
        <div className="flex flex-col gap-10">
          <div className="flex justify-start">
            <h1 className="text-[58px] leading-[60px] font-light text-white uppercase">
              WELCOME TO<br />
              OUR WORLD<br />
              WHERE MORE<br />
              IS MORE
            </h1>
          </div>
          <div className="w-full h-full flex items-end">
            <div className="">
              <p className="text-[20px] leading-[20px] text-white font-light w-[60%]">
                We have scoured the market for you and offer a highly curated 
                selection of our favourite items. These precious pieces come 
                from both small, independent businesses as well as established, 
                well-known brands. We hope to inspire you with our top picks 
                of beautiful things from interior design and homeware to unique 
                hotels and spaces.
              </p>
            </div>
            <div className="flex justify-end items-end w-full">
              <button
                className="group flex items-end gap-10"
                onClick={() => scrollTo('interiors')}
                style={{ color: '#F7F6F2' }}
              >
                <div className="flex flex-col items-start">
                    <p className="text-[20px] leading-[22px] font-normal">Enter</p>
                    <p className="text-[20px] leading-[22px] font-light">Whylessisnotmore</p>
                </div>
                <span className="flex items-center w-16 h-6 border-2 rounded-full overflow-hidden group-hover:bg-white group-hover:text-[var(--background-color)] group-hover:border-[var(--text-color)] transition-colors duration-500 ease-out">
                  <span className="relative w-full flex items-center justify-center rotate-[0.01deg] transition-transform duration-500 ease-out group-hover:translate-x-[80px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3">
                      <path d="M22.35 12 12 1.65 10.95 2.7l8.54 8.55H1.75v1.5h17.74l-8.55 8.55L12 22.35 22.35 12Z" fill="#fff"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3 absolute top-0 -left-14">
                      <path d="M22.35 12 12 1.65 10.95 2.7l8.54 8.55H1.75v1.5h17.74l-8.55 8.55L12 22.35 22.35 12Z"></path>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionOne;
