import React, { ReactNode, FC } from 'react';
import { Link } from "react-router-dom";
import Section from "../section/section";
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

interface CategoryProps {
    children: ReactNode;
    title: string;
    category: string;
    url: string;
    color?: 'purple' | 'blue' | 'pink' | 'gold' | 'default' ;
}

const CategoryItems: FC<CategoryProps> = ({ children, url, category, title, color = 'default' }) => {
    const getColorClass = (color: string) => {
        switch (color) {
            case 'purple':
                return 'bg-light-purple';
            case 'blue':
                return 'bg-light-blue';
            case 'pink':
                return 'bg-light-pink';
            case 'gold':
                return 'bg-light-gold';
            default:
                return 'bg-white';
        }
    };
    
    return ( 
        <>
            <div className={`${getColorClass( color )} max-md:hidden`}>
                <Section>
                    <div className="w-full flex py-[5%]">
                        <div className="w-[30%] flex justify-start items-center pb-[14%] max-lg:w-[40%]">
                            {/* <Fade direction="left" triggerOnce> */}
                                <div className="flex flex-col text-center gap-2">
                                    <h3 className="text-[16px] leading-[16px] text-black">{category}</h3>
                                    <h2 className="text-[24px] leading-[24px] text-black">{title}</h2>
                                    <Link className="underline underline-offset-1" to={url}>
                                        <span className="text-[16px] leading-[16px] text-blacks">View all</span>
                                    </Link>
                                </div>
                            {/* </Fade> */}
                        </div>

                        <div className="w-full grid grid-cols-3 grid-rows-1 gap-x-10 overflow-hidden max-lg:grid-cols-2">
                            {/* <Reveal keyframes={customAnimation} cascade triggerOnce> */}
                                {children}
                            {/* </Reveal> */}
                        </div>
                    </div>
                </Section>
            </div>

            <div className={`${getColorClass( color )} md:hidden`}>
                <Section>
                    <div className="w-full flex flex-col gap-14 py-[5%]">
                        <div className="w-full grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-10 max-lg:grid-cols-2">
                            {children}
                        </div>

                        <div className="w-full flex justify-center items-center pb-[14%]">
                            <div className="flex flex-col text-center gap-2">
                                <h3 className="text-[16px] leading-[16px] text-black">{category}</h3>
                                <h2 className="text-[24px] leading-[24px] text-black">{title}</h2>
                                <Link className="underline underline-offset-1" to={url}>
                                    <span className="text-[16px] leading-[16px] text-blacks">View all</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
     );
}

export default CategoryItems;