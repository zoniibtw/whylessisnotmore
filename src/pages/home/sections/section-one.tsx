import Image from "../../../assets/wepb/hero-bg.webp";

function SectionOne() {
    return ( 
        <div className="bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(34, 34, 34, 0.3), rgba(34, 34, 34, 0.3)), url(${Image})`,
        }}>
            <div className="h-[92vh] w-full py-[5%] md:px-0 md:w-70 mx-auto max-w-[1700px] flex items-center">
                <div className="flex flex-col gap-10">
                    <div className="flex justify-start">
                        <h1 className="text-[115px] leading-[115px] font-light text-white uppercase">
                            WELCOME TO<br />
                            OUR WORLD<br />
                            WHERE MORE<br />
                            IS MORE
                        </h1>
                    </div>
                    <div className="w-full h-full flex items-end">
                        <div className="">
                            <p className="text-[28px] leading-[30px] text-white font-light w-[60%]">
                                We have scoured the market for you and offer a highly curated 
                                selection of our favourite items. These precious pieces come 
                                from both small, independent businesses as well as established, 
                                well-known brands. We hope to inspire you with our top picks 
                                of beautiful things from interior design and homeware to unique 
                                hotels and spaces.
                            </p>
                        </div>

                        <div className="">
                            <div className="">
                                <div className="flex flex-col">
                                    <h2 className="text-[28px] leading-[28px] text-white font-medium">Enter</h2>
                                    <h3 className="text-[28px] leading-[28px] text-white font-light">Whylessisnotmore</h3>
                                </div>
                                
                                <div className=""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default SectionOne;