import React, { ReactNode, FC } from 'react';
import { Link } from "react-router-dom";
import Section from "../section/section";

interface CategoryProps {
    children: ReactNode;
    color?: 'purple' | 'blue' | 'pink' | 'gold' | 'default' ;
}

const CategoryViewall: FC<CategoryProps> = ({ children, color = 'default' }) => {
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
                <div className="w-full flex">
                    <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-10">
                        {children}
                    </div>
                </div>
            </Section>
        </div>
     );
}

export default CategoryViewall;