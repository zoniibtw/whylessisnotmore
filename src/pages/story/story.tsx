import { Section } from "../../components";
import Image from "../../assets/wepb/story.webp";
import { Fade, Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

function Story() {
  return (
    <>
      <div className="bg-light-purple flex justify-center items-center h-[92vh] mt-[8vh] max-md:hidden">
        <Section>
          <div className="flex w-full">
            <div className="w-1/2">
              <Fade triggerOnce>
                <div
                  className="bg-cover bg-no-repeat bg-right max-w-[35rem] w-[80%] h-[40rem]"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${Image})`,
                  }}
                ></div>
              </Fade>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-5 pr-36">
                <Reveal keyframes={customAnimation} triggerOnce cascade>
                  <h1 className="text-[36px] leading-[36px] text-[#222]">
                    A personal view of beauty
                  </h1>
                  <p className="test-[24px] leading-[22px] text-[#222]">
                    With a background working in fashion, interior design and
                    high-end real estate, our founder Louisa Falkenberg has
                    experience building homes, curating spaces and beautifying
                    your way of living. Louisa is currently based in her
                    home-town Stockholm, having spent several years abroad
                    soaking up cultures from around the world. She has a passion
                    for travelling to new cities to explore wonderful
                    one-of-a-kind shops, markets and hotels. Louisa finds beauty
                    everywhere she goes and we are excited to share her world
                    with you.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Mobile component */}

      <div className="bg-light-purple md:hidden">
        <Section>
          <div className="flex flex-col w-full py-[10%] gap-10">
            <div className="w-full">
              <div
                className="bg-cover bg-no-repeat bg-right w-full h-[45vh]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${Image})`,
                }}
              ></div>
            </div>

            <div className="w-full flex flex-col items-center justify-center mb-10">
              <div className="flex flex-col gap-5">
                <h1 className="text-[25px] leading-[25px] text-[#222]">
                  A personal view of beauty
                </h1>
                <p className="test-[14px] leading-[18px] text-[#222]">
                  With a background working in fashion, interior design and
                  high-end real estate, our founder Louisa Falkenberg has
                  experience building homes, curating spaces and beautifying
                  your way of living. Louisa is currently based in her home-town
                  Stockholm, having spent several years abroad soaking up
                  cultures from around the world. She has a passion for
                  travelling to new cities to explore wonderful one-of-a-kind
                  shops, markets and hotels. Louisa finds beauty everywhere she
                  goes and we are excited to share her world with you.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Story;
