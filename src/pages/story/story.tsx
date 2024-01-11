import { Section } from "../../components";
import Image from "../../assets/wepb/story.webp"

function Story() {
    return ( 
        <div className="bg-light-purple">
            <Section>
                <div className="flex w-full py-[5%]">
                    <div className="w-1/2">
                        <div className="bg-cover bg-no-repeat bg-right max-w-[35rem] w-[80%] h-[40rem]" style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${Image})`,
                        }}></div>
                    </div>

                    <div className="w-1/2 flex flex-col items-center justify-center">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-[36px] leading-[36px] text-black">A personal view of beauty</h1>
                            <p className="test-[24px] leading-[22px] text-black">
                                With a background working in fashion, interior design 
                                and high-end real estate, our founder Louisa Falkenberg 
                                has experience building homes, curating spaces and 
                                beautifying your way of living. Louisa is currently based 
                                in her home-town Stockholm, having spent several years 
                                abroad soaking up cultures from around the world. 
                                She has a passion for travelling to new cities to explore 
                                wonderful one-of-a-kind shops, markets and hotels. 
                                Louisa finds beauty everywhere she goes and we are 
                                excited to share her world with you.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
     );
}

export default Story;