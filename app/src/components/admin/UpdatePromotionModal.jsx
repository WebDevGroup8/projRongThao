import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function UpdatePromotionModal({
  isOpen,
  onClose,
  selectedPromotionGroup,
  handleUpdatePromotion,
}) {
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    selectedProducts: [],
  });

  useEffect(() => {
    if (selectedPromotionGroup) {
      setFormData({
        name: selectedPromotionGroup.name || "",
        start: selectedPromotionGroup.start
          ? selectedPromotionGroup.start.split("T")[0]
          : "",
        end: selectedPromotionGroup.end
          ? selectedPromotionGroup.end.split("T")[0]
          : "",
        selectedProducts: selectedPromotionGroup.products
          ? selectedPromotionGroup.products.map((product) => ({
              ...product,
              promotion: {
                discountType: product.promotion?.discountType || "percentage",
                percentage: product.promotion?.percentage || 0,
                promotionPrice: product.promotion?.promotionPrice || 0,
              },
            }))
          : [],
      });
    }
  }, [selectedPromotionGroup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (productId, field, value) => {
    setFormData((prevState) => {
      const updatedProducts = prevState.selectedProducts.map((product) => {
        if (product.id === productId) {
          let newValue = value;

          if (field === "percentage") {
            newValue = Math.min(Math.max(0, Number(value)), 100);
          } else if (field === "promotionPrice") {
            newValue = Math.max(0, Number(value));
          }

          return {
            ...product,
            promotion: {
              ...product.promotion,
              [field]: newValue,
            },
          };
        }
        return product;
      });

      return { ...prevState, selectedProducts: updatedProducts };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Promotion name is required.");
      return;
    }
    handleUpdatePromotion(formData);
  };

  if (!isOpen || !selectedPromotionGroup) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Update Promotion</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-4">
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

            {/* Selected Products */}
            {formData.selectedProducts.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Edit Discounts
                </label>
                <table className="mt-2 w-full border-collapse border border-gray-300 text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-2 py-2">
                        Product
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center">
                        Original Price
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center">
                        Type
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center">
                        Value
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center">
                        New Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.selectedProducts.map((product, index) => (
                      <tr key={index} className="border border-gray-300">
                        <td className="border border-gray-300 px-2 py-2">
                          {product.name}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          {product.price.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <select
                            value={product.promotion.discountType}
                            onChange={(e) =>
                              handleProductChange(
                                product.id,
                                "discountType",
                                e.target.value,
                              )
                            }
                            className="w-full rounded border p-1"
                          >
                            <option value="percentage">%</option>
                            <option value="fixed">฿</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={
                              product.promotion.discountType === "percentage"
                                ? product.promotion.percentage
                                : product.promotion.promotionPrice
                            }
                            onChange={(e) =>
                              handleProductChange(
                                product.id,
                                product.promotion.discountType === "percentage"
                                  ? "percentage"
                                  : "promotionPrice",
                                e.target.value,
                              )
                            }
                            className="w-full rounded border p-1"
                            min="0"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          {product.promotion.discountType === "percentage"
                            ? (
                                product.price *
                                (1 - product.promotion.percentage / 100)
                              ).toFixed(2)
                            : product.promotion.promotionPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Update Promotion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
