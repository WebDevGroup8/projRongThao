import { useNavigate } from "react-router-dom";

export default function ClickableCard(props) {
    const navigate = useNavigate();

    return (
        <div
            className="relative w-15 h-15 md:w-40 md:h-40 lg:w-50 lg:h-50 bg-cover bg-center rounded-xl shadow-lg cursor-pointer"
            style={{ backgroundImage: `url('${props.imageUrl}')` }}
            onClick={() => navigate(props.navigateTo)}
        >
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-end p-3">
                <h2 className="text-white text-[10px] lg:text-sm lg:font-bold">{props.title}</h2>
            </div>
        </div>
    );
}



