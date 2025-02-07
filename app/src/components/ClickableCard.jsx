import { useNavigate } from "react-router-dom";

export default function ClickableCard() {
    const navigate = useNavigate();

    return (
        <div
            className="relative w-80 h-48 bg-cover bg-center rounded-xl shadow-lg cursor-pointer"
            style={{ backgroundImage: "url('https://down-th.img.susercontent.com/file/83073216dbcc25b2f24b5e29b39d78f0')" }}
            onClick={() => navigate("/")}
        >
            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                <h2 className="text-white text-xl font-bold">คลิกเพื่อไปหน้าถัดไป</h2>
            </div>
        </div>
    );
}



