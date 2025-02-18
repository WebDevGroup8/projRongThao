import {
  CirclePercent,
  CirclePercentIcon,
  Gauge,
  LayoutList,
  LogOut,
  ReceiptText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";

export default function AdminSidebar() {
  const { logout } = useAuthStore;
  const navigate = useNavigate();
  return (
    <div className="bg-primary flex w-1/8 flex-col">
      <div className="block w-full cursor-pointer pt-8 text-center">
        <p className="text-base text-white">Dashboard</p>
        <p className="cursor-pointer self-center text-2xl font-semibold whitespace-nowrap text-white italic">
          RONGTHAO
        </p>
      </div>
      <div className="mt-20 flex flex-col gap-8 pl-6 text-center text-white">
        <button
          className="flex cursor-pointer flex-row gap-2 hover:underline"
          onClick={() => navigate("/admin/dashboard")}
        >
          <Gauge />
          Dashboard
        </button>
        <button
          className="flex cursor-pointer flex-row gap-2 hover:underline"
          onClick={() => navigate("/admin/order")}
        >
          <ReceiptText />
          Order
        </button>
        <button
          className="flex cursor-pointer flex-row gap-2 hover:underline"
          onClick={() => navigate("/admin/product")}
        >
          <LayoutList />
          Product
        </button>
        <button
          className="flex cursor-pointer flex-row gap-2 hover:underline"
          onClick={() => navigate("/admin/promotion")}
        >
          <CirclePercentIcon />
          Promotion
        </button>
      </div>
      <div className="mt-20 flex justify-center">
        <button className="flex flex-row items-center justify-between gap-4 rounded-md bg-red-400 px-6 py-2 text-white">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}
