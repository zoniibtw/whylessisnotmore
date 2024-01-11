import React, { FC } from 'react';

interface BannerProps {
    title: string;
    text: string;
    image: string;
    color?: 'purple' | 'blue' | 'pink' | 'gold' | 'green' | 'default';
    flow?: 'reverse' | 'default';
}

const CategoryBanner: FC<BannerProps> = ({ title, text, image, color = 'default', flow = 'default' }) => {
    const getColorClass = (color: string) => {
        switch (color) {
        case 'purple':
            return 'bg-strong-purple';
        case 'blue':
            return 'bg-strong-blue';
        case 'pink':
            return 'bg-strong-pink';
        case 'gold':
            return 'bg-strong-gold';
        case 'green':
            return 'bg-[#4D5E4C]';
        default:
            return 'bg-white';
        }
    };

    const getFlowClass = (flow: string) => {
        switch (flow) {
            case 'reverse':
                return 'flex-row-reverse';
            default:
                return '';
        }
    };

    return ( 
        <div className={`w-full flex min-h-[50rem] ${getFlowClass(flow)}`}>
            <div className="w-1/2 bg-center bg-cover bg-no-repeat" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${image})`,
            }}></div>

            <div className={`w-1/2 flex justify-center items-center ${getColorClass(color)}`}>
                <div className="w-full flex flex-col gap-10 px-[15%]">
                    <h1 className="text-[48px] leading-[48px] text-white font-normal text-center">{title}</h1>
                    <p className="text-[28px] leading-[28px] text-white font-normal text-center">{text}</p>
                </div>
            </div>
        </div>
     );
}

export default CategoryBanner;