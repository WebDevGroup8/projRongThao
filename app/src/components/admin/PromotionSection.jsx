import { Plus, Pencil, Trash } from "lucide-react";
import React, { useMemo } from "react";

export default function PromotionSection({
  setIsCreatePromotionModalOpen,
  setIsUpdatePromotionModalOpen,
  setSelectedPromotionGroup,
  handleDeletePromotion,
  promotionedProduct = [],
}) {
  const currentDate = new Date();

  const groupedPromotions = useMemo(() => {
    const grouped = {};
    promotionedProduct.forEach((product) => {
      console.log(promotionedProduct);
      const { name, price, promotion } = product;
      const promotionStart = new Date(promotion.start);
      const promotionEnd = new Date(promotion.end);

      let promotionPrice = promotion.promotionPrice;
      if (promotion.discountType === "percentage") {
        promotionPrice = price - (price * promotion.percentage) / 100;
      }

      let status = "Upcoming";
      if (currentDate >= promotionStart && currentDate <= promotionEnd) {
        status = "Active";
      } else if (currentDate > promotionEnd) {
        status = "Expired";
      }

      if (!grouped[promotion.name]) {
        grouped[promotion.name] = {
          name: promotion.name,
          start: promotion.start,
          end: promotion.end,
          products: [],
        };
      }
      grouped[promotion.name].products.push({
        id: product.id,
        documentId: product.documentId,
        name,
        price,
        promotionPrice,
        start: promotion.start,
        end: promotion.end,
        promotion: promotion,
        status,
      });
    });
    return grouped;
  }, [promotionedProduct]);

  return (
    <>
      <div className="mb-4 flex flex-row justify-between">
        <p className="text-2xl font-semibold">Promotion List</p>
        <button
          onClick={() => setIsCreatePromotionModalOpen(true)}
          className="flex w-fit cursor-pointer flex-row gap-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          <Plus size={24} /> Create New Promotion
        </button>
      </div>
      <div className="relative mt-5 overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-gray-500 shadow-2xl rtl:text-right">
          <thead className="border-b border-gray-300 bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 text-left" scope="col">
                Product Name
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                Price
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                Promotion Price
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                Start Date
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                End Date
              </th>
              <th className="px-4 py-3 text-center" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedPromotions).map((promotionName, index) => (
              <React.Fragment key={index}>
                <tr
                  key={index}
                  className="border-b border-gray-300 bg-gray-200 text-center font-bold"
                >
                  <td className="px-4 py-4 text-center" colSpan="6">
                    <div className="flex flex-row items-center justify-between pe-15">
                      {promotionName}
                      <div className="flex flex-row gap-4 text-white">
                        <button
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-blue-500 p-2"
                          onClick={() => {
                            setSelectedPromotionGroup(
                              groupedPromotions[promotionName],
                            );
                            setIsUpdatePromotionModalOpen(true);
                          }}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-500 p-2"
                          onClick={() => {
                            setSelectedPromotionGroup(
                              groupedPromotions[promotionName],
                            );
                            handleDeletePromotion(
                              groupedPromotions[promotionName],
                            );
                          }}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                {groupedPromotions[promotionName].products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-300 bg-white"
                  >
                    <td className="px-4 py-4 font-medium whitespace-nowrap text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-4">{product.price.toFixed(2)}</td>
                    <td className="px-4 py-4">
                      {product.promotionPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">{product.start}</td>
                    <td className="px-4 py-4">{product.end}</td>
                    <td className="px-4 py-4 text-center">
                      <div
                        className={`inline-block rounded-md border-2 px-5 py-1.5 font-semibold ${
                          product.status === "Active"
                            ? "border-green-500 bg-green-300 text-green-600"
                            : product.status === "Expired"
                              ? "border-red-600 bg-red-300"
                              : "border-yellow-500 bg-yellow-300 text-yellow-600"
                        }`}
                      >
                        {product.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
