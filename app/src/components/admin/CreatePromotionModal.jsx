import { X } from "lucide-react";
import { useState } from "react";

export default function CreatePromotionModal({ isOpen, onClose, products }) {
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    discountType: "percentage",
    percentage: "",
    price: "",
    selectedProducts: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelection = (productId) => {
    setFormData((prevState) => {
      const selected = new Set(prevState.selectedProducts);
      if (selected.has(productId)) {
        selected.delete(productId);
      } else {
        selected.add(productId);
      }
      return { ...prevState, selectedProducts: Array.from(selected) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Promotion</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-4">
            {/* Promotion Name */}
            <div>
              <label className="block text-sm font-medium">
                Promotion Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2"
                required
              />
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">End Date</label>
                <input
                  type="date"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2"
                  required
                />
              </div>
            </div>

            {/* Discount Type Selection */}
            <div>
              <label className="block text-sm font-medium">Discount Type</label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2"
              >
                <option value="percentage">Percentage Off</option>
                <option value="fixed">Fixed Price</option>
              </select>
            </div>

            {/* Discount Amount */}
            {formData.discountType === "percentage" ? (
              <div>
                <label className="block text-sm font-medium">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2"
                  min="1"
                  max="100"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium">
                  Fixed Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2"
                  min="0"
                  required
                />
              </div>
            )}

            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium">
                Select Products
              </label>
              <div className="mt-2 grid max-h-40 grid-cols-2 gap-2 overflow-auto rounded-lg border p-2">
                {products?.map((product) => (
                  <label
                    key={product.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={product.id}
                      checked={formData.selectedProducts.includes(product.id)}
                      onChange={() => handleProductSelection(product.id)}
                    />
                    <span>{product.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Create Promotion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
