import { X } from "lucide-react";
import { useState } from "react";
import conf from "../../conf/mainapi";

export default function CreatePromotionModal({ isOpen, onClose, products }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    selectedProducts: [],
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelection = (product) => {
    setFormData((prevState) => {
      const selected = prevState.selectedProducts.map((p) => p.id);
      if (!selected.includes(product.id)) {
        return {
          ...prevState,
          selectedProducts: [
            ...prevState.selectedProducts,
            {
              ...product,
              discountType: "percentage",
              percentage: "",
              promotionPrice: "",
            },
          ],
        };
      }
      return prevState;
    });
    setDropdownOpen(false);
  };

  const handleProductChange = (productId, field, value) => {
    setFormData((prevState) => {
      const updatedProducts = prevState.selectedProducts.map((product) => {
        if (product.id === productId) {
          let newValue = Math.max(0, Number(value));

          // Prevent percentage from going above 100
          if (field === "percentage") {
            newValue = Math.min(Math.max(0, Number(value)), 100); // Ensures value is between 0-100
          }
          return { ...product, [field]: newValue };
        }
        return product;
      });

      return { ...prevState, selectedProducts: updatedProducts };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
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

            {/* Custom Product Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium">
                Select Products
              </label>
              <button
                type="button"
                className="mt-1 w-full rounded-lg border p-2 text-left"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {formData.selectedProducts.length > 0
                  ? "Add More Products"
                  : "-- Select Product --"}
              </button>
              {dropdownOpen && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border bg-white shadow-lg">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex cursor-pointer items-center p-2 hover:bg-gray-200"
                      onClick={() => handleProductSelection(product)}
                    >
                      <img
                        src={`${conf.imageUrlPrefix}${product.image[0].formats.thumbnail.url}`}
                        alt={product.name}
                        className="mr-2 h-6 w-6"
                      />
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Selected Products */}
            {formData.selectedProducts.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Set Discounts
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
                  <tbody className="h-full w-full">
                    {formData.selectedProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="h-full w-full border border-gray-300"
                      >
                        <td className="border border-gray-300 px-2 py-2">
                          <div className="flex items-center">
                            <img
                              src={`${conf.imageUrlPrefix}${product.image[0].formats.thumbnail.url}`}
                              alt={product.name}
                              className="mr-2 h-6 w-6"
                            />
                            <span className="whitespace-nowrap">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          {product.price.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <select
                            value={product.discountType}
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
                        <td className="w-30 border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={
                              product.discountType === "percentage"
                                ? product.percentage
                                : product.promotionPrice
                            }
                            onChange={(e) =>
                              handleProductChange(
                                product.id,
                                product.discountType === "percentage"
                                  ? "percentage"
                                  : "promotionPrice",
                                e.target.value,
                              )
                            }
                            className="w-full rounded border p-1"
                            min="0"
                          />
                        </td>
                        <td className="w-30 border border-gray-300 px-2 py-2 text-center">
                          {product.discountType === "percentage"
                            ? (
                                product.price *
                                (1 - product.percentage / 100)
                              ).toFixed(2)
                            : product.promotionPrice}
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
                Create Promotion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
