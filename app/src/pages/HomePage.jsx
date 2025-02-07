// Home.jsx
import PromotionCarousel from "../components/PromotionCarousel"
import ClickableCard from "../components/ClickableCard";

export const HomePage = () => (
    <div className="flex flex-col px-10 lg:px-40 w-full pt-4 gap-4 lg:gap-10 lg:pt-10">
        <div className="flex flex-row mp-10">
            <PromotionCarousel />
        </div>
        <div className="flex flex-row justify-between">
            <ClickableCard
                imageUrl="https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://schollshoesthailand.com/cdn/shop/files/2_0bdac0de-c147-4fe2-a3e3-9da5fc918957.png?v=1726229426&width=400"
                title="Best Sellers"
                navigateTo="/"
            />
        </div>
        <div className="flex flex-row w-full justify-center">
            <div className="flex flex-row w-full items-center ">
                <hr className="border-black border-1 w-full " />
                <h1 className="text-black text-xs lg:text-xl font-bold whitespace-nowrap px-3">BEST SELLER</h1>
                <hr className="border-black border-1 w-full" />
            </div>
        </div>
        <div className="flex flex-row w-full justify-between">
            <ClickableCard
                imageUrl="https://img-feed.firster.com/prod/2021/09/13154642/firster_feed_on_1492x1492.jpg"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://img-feed.firster.com/prod/2021/09/13154642/firster_feed_on_1492x1492.jpg"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://img-feed.firster.com/prod/2021/09/13154642/firster_feed_on_1492x1492.jpg"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://img-feed.firster.com/prod/2021/09/13154642/firster_feed_on_1492x1492.jpg"
                title="Best Sellers"
                navigateTo="/"
            />
            <ClickableCard
                imageUrl="https://img-feed.firster.com/prod/2021/09/13154642/firster_feed_on_1492x1492.jpg"
                title="Best Sellers"
                navigateTo="/"
            />

        </div>
    </div>
);
