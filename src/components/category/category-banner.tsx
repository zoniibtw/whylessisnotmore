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
        <>
            <div className={`w-full flex min-h-[70vh] max-md:hidden ${getFlowClass(flow)}`}>
                <div className="w-1/2 bg-center bg-cover bg-no-repeat" style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${image})`,
                }}></div>

                <div className={`w-1/2 flex justify-center items-center ${getColorClass(color)}`}>
                    <div className="w-full flex flex-col gap-6 px-[10%]">
                        <h1 className="text-[40px] leading-[40px] text-white font-normal text-center">{title}</h1>
                        <p className="text-[18px] leading-[20px] text-white font-normal text-center">{text}</p>
                    </div>
                </div>
            </div>

            <div className={`w-full flex flex-col md:hidden`}>
                <div className="w-full bg-center bg-cover bg-no-repeat h-[38vh]" style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${image})`,
                }}></div>

                <div className={`w-full flex justify-center items-center ${getColorClass(color)}`}>
                    <div className="w-full flex flex-col gap-4 px-[5%] py-[20%]">
                        <h1 className="text-[20px] leading-[20px] text-white font-normal text-center">{title}</h1>
                        <p className="text-[16px] leading-[18px] text-white font-normal text-center">{text}</p>
                    </div>
                </div>
            </div>
        </>
     );
}

export default CategoryBanner;