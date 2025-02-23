// HomePage.jsx
import PromotionCarousel from "../components/PromotionCarousel.jsx";
import ClickableCard from "../components/ClickableCard";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import { ProductCard } from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import Container from "../components/Container.jsx";
import fetchProducts from "../context/FetchProduct.js";

const categories = [
  {
    imageUrl:
      "https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400",
    title: "Best Sellers",
    navigateTo: "/",
  },
  {
    imageUrl:
      "https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400",
    title: "Best Sellers",
    navigateTo: "/",
  },
  {
    imageUrl:
      "https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400",
    title: "Best Sellers",
    navigateTo: "/",
  },
  {
    imageUrl:
      "https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400",
    title: "Best Sellers",
    navigateTo: "/",
  },
  {
    imageUrl:
      "https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400",
    title: "Best Sellers",
    navigateTo: "/",
  },
];

const promotionsL = [
  {
    image:
      "https://png.pngtree.com/template/20220330/ourmid/pngtree-new-shoes-promotion-in-simple-winter-2018-image_908218.jpg",
    alt: "Buy More Save More",
  },
  {
    image:
      "https://png.pngtree.com/template/20220331/ourlarge/pngtree-new-sports-shoes-promotion-rotation-banner-image_909903.jpg",
    alt: "New Arrivals - Shop Now",
  },
  {
    image:
      "https://png.pngtree.com/template/20220330/ourmid/pngtree-national-day-sports-shoes-promotion-rotation-banner-image_907554.jpg",
    alt: "Free Shipping on Orders Over $50",
  },
];

const promotionsP = [
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/Sonic.png?v=1737033689&width=600",
    alt: "Buy More Save More",
  },
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/4_2e499946-a346-45cf-a78c-9b1ea39554e4.webp?v=1736230585&width=600",
    alt: "New Arrivals - Shop Now",
  },
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/6_3a303838-8938-4cdd-8dfa-a762974ca9c5.webp?v=1736230584&width=600",
    alt: "Free Shipping on Orders Over $50",
  },
];

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);
  return (
    <div className="gap flex w-full flex-col lg:gap-10">
      <div className="hidden lg:flex lg:flex-row">
        <PromotionCarousel promotions={promotionsL} />
      </div>
      <div className="flex flex-row lg:hidden">
        <PromotionCarousel promotions={promotionsP} />
      </div>

      <Container>
        <div className="w-screen px-2">
          {/* Desktop Categories*/}
          <div className="hidden lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
            {categories.map((item, index) => (
              <ClickableCard key={index} {...item} />
            ))}
          </div>

          {/* Mobiel Categories */}
          <div className="my-4 flex flex-row overflow-x-auto lg:hidden">
            <CategoryCarousel categories={categories} />
          </div>

          <div className="my-4 flex w-full flex-row justify-center">
            <div className="flex w-full flex-row items-center lg:my-10">
              <hr className="w-full border-1 border-black" />
              <h1 className="text-ms px-3 font-bold whitespace-nowrap text-black lg:text-xl">
                BEST SELLER
              </h1>
              <hr className="w-full border-1 border-black" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
                size={product.size}
                color={product.color}
                categories={product.categories}
                soldCount={product.soldCount}
                reviews={product.reviews}
                rating={product.rating}
                promotion={product.promotion ? product.promotion : {}}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
