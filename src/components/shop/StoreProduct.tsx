import React from "react";
import { StoreProductData } from "../../api/product";

interface StoreProductProps {
  data: StoreProductData;
}

const StoreProduct: React.FC<StoreProductProps> = ({ data }) => {
  const imageUrl = data.images?.[0]?.src ?? "/placeholder.png";

  return (
    <div className="bg-zinc-900 p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={data.name}
        className="w-full h-64 object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-black font-semibold text-lg truncate">
          {data.name}
        </h3>
        <p className="text-orange-400 text-md">
          {data.sale_price && data.sale_price !== data.regular_price ? (
            <>
              <span className="line-through text-black mr-2">
                ${data.regular_price}
              </span>
              <span>${data.sale_price}</span>
            </>
          ) : (
            <span>${data.price}</span>
          )}
        </p>
        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-black py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default StoreProduct;
