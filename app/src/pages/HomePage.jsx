// Home.jsx
import PromotionCarousel from "../components/PromotionCarousel"
import ClickableCard from "../components/ClickableCard";

export const HomePage = () => (
    <div className="flex flex-col px-10 lg:px-40">
        <div className="flex flex-row py-5 lg:py-10">
            <PromotionCarousel />
        </div>
        <div className="flex flex-row">
            <h1>This is the Home Page</h1>
            <ClickableCard />
        </div>
        <div className="flex flex-row">
            <h1>This is the Home Page</h1>
        </div>
    </div>
);
