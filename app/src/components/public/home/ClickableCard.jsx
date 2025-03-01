import { useNavigate } from "react-router-dom";

export default function ClickableCard(props) {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-55 w-55 cursor-pointer rounded-xl bg-cover bg-center shadow-lg hover:scale-115"
      style={{ backgroundImage: `url('${props.imageUrl}')` }}
      onClick={() => navigate(props.navigateTo)}
    >
      <div className="absolute inset-0 flex items-end rounded-xl bg-black/20 p-3">
        <h2 className="text-sm font-bold text-white">{props.title}</h2>
      </div>
    </div>
  );
}
