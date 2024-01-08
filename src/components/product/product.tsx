import Image from "../../assets/product-test.jpg";
import Star from "../../assets/svg/star.svg";

interface ProductProps {
    name: string;
    desc: string;
    price: string;
    link: string;
    color?: 'purple' | 'blue' | 'pink' | 'gold';
}

function Product(props: ProductProps) {
    const getColorClass = (color?: string) => {
        switch (color) {
            case 'purple':
                return 'bg-strong-purple';
            case 'blue':
                return 'bg-strong-blue';
            case 'pink':
                return 'bg-strong-pink';
            case 'gold':
                return 'bg-strong-gold';
            default:
                return 'bg-white';
        }
    };

    const getColorClassTwo = (color?: string) => {
        switch (color) {
            case 'purple':
                return 'border-strong-purple';
            case 'blue':
                return 'border-strong-blue';
            case 'pink':
                return 'border-strong-pink';
            case 'gold':
                return 'border-strong-gold';
            default:
                return 'white';
        }
    };

    const getColorClassThree = (color?: string) => {
        switch (color) {
            case 'purple':
                return '#AF979E';
            case 'blue':
                return '#2C6481';
            case 'pink':
                return '#D0948C';
            case 'gold':
                return '#AFA16E';
            default:
                return 'white';
        }
    };

    return (
        <div className="flex flex-col col-span-1 row-span-1 gap-5">
            <div className={`border-4 ${getColorClassTwo(props.color)}`}>
                <div
                    className={`h-[18.75rem] w-full bg-no-repeat bg-cover bg-center`}
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(15, 25, 32, 0), rgba(15, 25, 32, 0)), url(${Image})`,
                    }}
                ></div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h1 className="text-[28px] leading-[28px] text-black">{props.name}</h1>
                <p className="text-[20px] leading-[20px] text-black">{props.desc}</p>
                <p className="text-[20px] leading-[20px] text-black">{props.price}</p>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => {
                        const url = props.link; // Replace with the actual URL you want to open
                        window.open(url, '_blank');
                    }}
                    className={`py-3 ${getColorClass(props.color)} ${getColorClassTwo(props.color)} border-2 text-[20px] leading-[20px] text-white font-normal`}
                >
                    Go to product
                </button>
                <button
                    className={`bg-none flex relative justify-center py-3 ${getColorClassTwo(props.color)} border-2 text-[20px] leading-[20px] text-black`}
                >
                    <svg className={`absolute left-0 pl-3 w-8 h-auto`} width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 3.25071L13.2735 8.70902L13.4643 9.29635H14.0819H19.8211L15.178 12.6698L14.6784 13.0328L14.8692 13.6201L16.6427 19.0784L11.9996 15.705L11.5 15.342L11.0004 15.705L6.35727 19.0784L8.13078 13.6201L8.32162 13.0328L7.822 12.6698L3.17888 9.29635H8.91809H9.53565L9.72649 8.70902L11.5 3.25071Z" stroke={`${getColorClassThree(props.color)}`} stroke-width="1.7"/>
                    </svg>
                    <span className="text-center">Add to Wish List</span>
                </button>
            </div>
        </div>
    );
}

export default Product;
