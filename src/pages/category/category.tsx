// src/pages/category/category.tsx
import React, { useState, useEffect } from 'react';
import wcApi, { WooCommerceProduct } from '../../api/wcApi';
import { CategoryBanner, CategoryViewall, Product } from '../../components';
import InteriorsImage from '../../assets/wepb/categories/interior.webp';
import StyleImage from '../../assets/wepb/categories/style.webp';
import HotelImage from '../../assets/wepb/categories/hotel.webp';
import useScrollToTop from '../../utils/useScrollToTop';

interface CategoryProps {
  selectedCategory: string | null;
  // Add type and color props here
  type?: 'hotel' | 'journal' | 'standard';
  color?: 'purple' | 'blue' | 'gold' | 'pink';
}

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  link: string;
  // Add type and color props here
  type?: 'hotel' | 'journal' | 'standard';
  color?: 'purple' | 'blue' | 'gold' | 'pink';
}

function Category({ selectedCategory, type, color }: CategoryProps) {
  useScrollToTop();
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const [categoryColor, setCategoryColor] = useState<'purple' | 'blue' | 'gold' | 'pink' | 'default' | null>(
    null
  );
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
            type={type} // Pass the type prop here
            color={color} // Pass the color prop here
          />
        ))}
        {[...Array(12)].map((_, index) => (
          <Product
            key={index}
            name="Ellos"
            desc="Vägghylla Wave"
            price="€80"
            link="s"
            type={type} // Pass the type prop here
            color={color} // Pass the color prop here
          />
        ))}
      </CategoryViewall>
    </>
  );
}

export default Category;
