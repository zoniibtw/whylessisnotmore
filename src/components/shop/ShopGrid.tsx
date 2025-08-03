import React, { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../api/wcApi";
import { StoreProductData } from "../../api/product";
import StoreProduct from "./StoreProduct";

interface ShopGridProps {
  categoryId?: number;
}

const ShopGrid: React.FC<ShopGridProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<StoreProductData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [categoryId]);

  useEffect(() => {
    const loadProducts = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      const newProducts = await fetchProducts(categoryId?.toString(), page);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
      setLoading(false);
    };

    loadProducts();
  }, [page, categoryId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.disconnect();
    };
  }, [loaderRef.current, hasMore, loading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <StoreProduct key={product.id} data={product} />
      ))}
      <div ref={loaderRef} className="col-span-full text-center py-10">
        {loading && <p>Loading more products...</p>}
      </div>
    </div>
  );
};

export default ShopGrid;
