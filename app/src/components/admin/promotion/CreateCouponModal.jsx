import { X } from "lucide-react";
import { useState } from "react";

export default function CreateCouponModal({
  isOpen,
  onClose,
  handleCreateCoupon,
}) {
  const [formData, setFormData] = useState({
    name: "",
    duration: "forever", // Default duration
    percent_off: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateCoupon(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Coupon</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-10">
            <div>
              <label className="block text-sm font-medium">Coupon Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2"
              >
                <option value="forever">Forever</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Discount Percentage
              </label>
              <input
                type="number"
                name="percent_off"
                value={formData.percent_off}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2"
                required
                min="1"
                max="100"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
