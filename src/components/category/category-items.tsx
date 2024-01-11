import React, { ReactNode, FC } from 'react';
import { Link } from "react-router-dom";
import Section from "../section/section";

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
        <div className={`${getColorClass( color )}`}>
            <Section>
                <div className="w-full flex py-[5%]">
                    <div className="w-[30%] flex justify-start items-center pb-[14%]">
                        <div className="flex flex-col text-center gap-2">
                            <h3 className="text-[16px] leading-[16px] text-black">{category}</h3>
                            <h2 className="text-[24px] leading-[24px] text-black">{title}</h2>
                            <Link className="underline underline-offset-1" to={url}>
                                <span className="text-[16px] leading-[16px] text-blacks">View all</span>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-3 grid-rows-1 gap-x-10">
                        {children}
                    </div>
                </div>
            </Section>
        </div>
     );
}

export default CategoryItems;