import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreProductData, ProductVariation } from "../../api/product";
import { fetchProducts, fetchProductVariations } from "../../api/wcApi";

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<StoreProductData | null>(null);
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const allProducts = await fetchProducts();
        const found = allProducts.find((p) => p.slug === slug);
        if (!found) {
          setLoading(false);
          return;
        }

        setProduct(found);
        if (found.type === "variable" && found.variations?.length) {
          const vars = await fetchProductVariations(found.id);
          setVariations(vars);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!product) return <div className="p-8 text-white">Product not found.</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.images?.[0]?.src}
        alt={product.name}
        className="w-64 h-auto mb-4"
      />
      <div dangerouslySetInnerHTML={{ __html: product.description }} />

      {product.type === "variable" && variations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Available Variations</h2>
          <ul className="space-y-2">
            {variations.map((v) => (
              <li key={v.id} className="border p-2 rounded">
                {v.attributes.map((attr) => (
                  <span key={attr.name} className="block">
                    {attr.name}: {attr.option}
                  </span>
                ))}
                <p>Price: {v.price} kr</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
