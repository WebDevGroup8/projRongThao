import { Plus } from "lucide-react";

export default function PromotionSection({
  setIsCreatePromotionModalOpen,
  setIsUpdatePromotionModalOpen,
}) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-semibold">Promotion List</p>
        <button
          onClick={() => setIsCreatePromotionModalOpen(true)}
          className="flex w-fit cursor-pointer flex-row gap-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          <Plus size={24} /> Create New Promotion
        </button>
      </div>
    </>
  );
}
