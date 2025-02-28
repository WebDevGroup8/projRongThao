import { useEffect, useState } from "react";

import CategoryCarousel from "@public/home/CategoryCarousel";
import ClickableCard from "@public/home/ClickableCard";
import Container from "@layout/Container";
import ProductCard from "@public/discovery/ProductCard";
import PromotionCarousel from "@public/home/PromotionCarousel";
import fetchProducts from "@/utils/FetchProduct";
import { path } from "@/conf/main";
const categories = [
  {
    imageUrl:
      "https://www.sportpodium.com/cdn/shop/collections/19FW_FP_Shoes-Womens_PLP_IWallpaper-Tile_DT-Rev-01_10212019_tcm274-416491_65c23005-b9bb-422b-8b95-a82809b0d290.jpg?v=1622964858",
    title: "New Arrival",
    navigateTo: `${path.public.discovery}${path.public.discoveryCategory.new}`,
  },
  {
    imageUrl:
      "https://www.blessthisstuff.com/imagens/listagem/2011/grande/grande_img_2011_nike_mag.jpg",
    title: "Limited",
    navigateTo: `${path.public.discovery}${path.public.discoveryCategory.limited}`,
  },
  {
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H25dc07b105f54dca881858a05046426dK.jpg_720x720q50.jpg",
    title: "Sport",
    navigateTo: `${path.public.discovery}${path.public.discoveryCategory.sport}`,
  },
  {
    imageUrl:
      "https://nothingnew.com/cdn/shop/products/HighTop-White-Thumbanil-2_1024x1024.jpg?v=1652119826",
    title: "High Top",
    navigateTo: `${path.public.discovery}${path.public.discoveryCategory.highTop}`,
  },
  {
    imageUrl:
      "https://fashionista.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYyNTA1MDg3MjU0NTM3ODk0/shop-platform-sneakers.jpg",
    title: "Platform",
    navigateTo: `${path.public.discovery}${path.public.discoveryCategory.platform}`,
  },
];

const promotionsL = [
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/4_771dbfba-a682-44f7-8a47-fa83243d704e.webp?v=1736229937&width=2000",
    alt: "Buy More Save More",
  },
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/6_0ff2e531-684c-4521-a9ec-2306fbe7dfc1.webp?v=1736229936&width=2000",
    alt: "New Arrivals - Shop Now",
  },
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/Sonic_horizontal.png?v=1737033666&width=1800",
    alt: "Free Shipping on Orders Over $50",
  },
];

const promotionsP = [
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/4_2e499946-a346-45cf-a78c-9b1ea39554e4.webp?v=1736230585&width=600",
    alt: "Buy More Save More",
  },
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/6_3a303838-8938-4cdd-8dfa-a762974ca9c5.webp?v=1736230584&width=600",
    alt: "New Arrivals - Shop Now",
  },
  {
    image:
      "https://schollshoesthailand.com/cdn/shop/files/Sonic.png?v=1737033689&width=600",
    alt: "Free Shipping on Orders Over $50",
  },
];

export default function HomePage() {
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
}
