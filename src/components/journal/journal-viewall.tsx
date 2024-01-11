import React, { ReactNode, FC } from 'react';
import Section from "../section/section";
import Product from '../product/product';

interface JournalProps {
    children: ReactNode;
    color?: 'purple' | 'blue' | 'pink' | 'gold' | 'default' ;
}

const JournalViewall: FC<JournalProps> = ({ children }) => {
    return ( 
        <div className="bg-light-pink">
            <Section>
                <div className="w-full flex">
                    <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-10 gap-y-14">
                        {children}
                        {[...Array(12)].map((_, index) => (
                            <Product
                            key={index}
                            name="Ellos"
                            desc="Vägghylla Wave"
                            price="€80"
                            link="s"
                            type="journal" // Pass the type prop here
                            color="pink" // Pass the color prop here
                            />
                        ))}
                    </div>
                </div>
            </Section>
        </div>
     );
}

export default JournalViewall;