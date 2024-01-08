// src/pages/category/category.tsx
import React, { useState, useEffect } from 'react';
import wcApi, { WooCommerceProduct } from '../../api/wcApi';
import { CategoryBanner, CategoryViewall, Product } from '../../components';
import InteriorsImage from '../../assets/wepb/categories/interior.webp';
import StyleImage from '../../assets/wepb/categories/style.webp';
import HotelImage from '../../assets/wepb/categories/hotel.webp';

interface CategoryProps {
  selectedCategory: string | null;
}

// Define the type for category colors
type CategoryColor = 'purple' | 'blue' | 'gold' | 'pink' | 'default';

interface ProductProps {
  id: number;
  name: string;
  // Add actual properties from your WooCommerceProduct type
  description: string;
  price: number;
  link: string;
}

function Category({ selectedCategory }: CategoryProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const [categoryColor, setCategoryColor] = useState<CategoryColor | null>();
  const [categoryTitle, setCategoryTitle] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await wcApi.getAllData(selectedCategory);
        setCategories(data.categories.map((category: any) => category.name));
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    // Set category-specific properties based on the selected category
    switch (selectedCategory) {
      case 'interiors':
        setCategoryImage(InteriorsImage);
        setCategoryColor('purple');
        setCategoryTitle('Interiors');
        setCategoryText(
          'Your home is a canvas of your personality. Whether you lean towards elegant minimalism or embrace vibrant chic, weve scoured the market to unveil a meticulously curated collection of our absolute favorite pieces.'
        );
        break;
      case 'style':
        setCategoryImage(StyleImage);
        setCategoryColor('blue');
        setCategoryTitle('Style');
        setCategoryText(
          'Discover the epitome of elegance and sophistication in our thoughtfully assembled collection of timeless classics and cutting-edge fashion pieces. Our very own expression of lasting allure.'
        );
        break;
      case 'hotels':
        setCategoryImage(HotelImage);
        setCategoryColor('gold');
        setCategoryTitle('Hotels');
        setCategoryText(
          'Passion for travel runs deep within us, and we invite you to join in the adventure. Explore a world of charm with our handpicked collection of unique hotels across the globe. Each one promises an unforgettable stay and a touch of enchantment.'
        );
        break;
      default:
        // Set default values or handle other categories
        setCategoryImage(null);
        setCategoryColor(null);
        setCategoryTitle('');
        setCategoryText('');
        break;
    }
  }, [selectedCategory]);

  return (
    <>
      {categoryImage && categoryColor && (
        <CategoryBanner
          title={categoryTitle}
          text={categoryText}
          image={categoryImage}
          color={categoryColor}
          flow="default"
        />
      )}
      <CategoryViewall color={categoryColor || 'purple'}>
        {products.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            desc={product.description}
            price={product.price}
            link={product.link}
          />
        ))}
      </CategoryViewall>
    </>
  );
}

export default Category;
