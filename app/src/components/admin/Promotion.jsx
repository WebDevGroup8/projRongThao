import { useEffect, useState } from "react";
import ax from "../../conf/ax";
import Loading from "../Loading";
import { Pencil, Plus, Trash } from "lucide-react";
import CreateCouponModal from "./CreateCouponModal";

export default function Promotion() {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCoupon = async (formData) => {
    try {
      setIsLoading(true);
      const response = await ax.post("/stripe/promotion", formData);

      console.log("Coupon created successfully:", response.data);
      alert("Coupon created successfully!"); // Replace with toast notification if needed

      setIsCreateModalOpen(false); // Close the modal after successful submission
      fetchPromotion();
    } catch (error) {
      console.error(
        "Error creating coupon:",
        error.response?.data || error.message,
      );
      alert("Failed to create coupon. Please try again."); // Replace with toast notification if needed
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPromotion = async () => {
    try {
      setIsLoading(true);
      const response = await ax.get(`/stripe/promotions`);
      setCoupons(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotion();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="px-10 pt-10">
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-semibold">Coupon List</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex w-fit cursor-pointer flex-row gap-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            <Plus size={24} /> Add new coupon
          </button>
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 shadow-2xl rtl:text-right">
            <thead className="border-1 border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-4" scope="col">
                  ID
                </th>
                <th scope="col">NAME</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">USAGE</th>
                <th
                  scope="col"
                  className="flex items-center justify-center py-3 text-center"
                >
                  STATUS
                </th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((coupon, index) => (
                <tr
                  key={index}
                  className="items-center border-b border-gray-200 bg-white"
                >
                  {/* coupon id */}
                  <td className="px-4 py-4">{coupon.id}</td>

                  {/* coupon name */}
                  <td className="font-medium whitespace-nowrap text-gray-900">
                    {coupon.name}
                  </td>

                  {/* coupon description */}
                  <td>
                    {coupon.percent_off}% off {coupon.duration}
                  </td>

                  {/* coupon usage */}
                  <td>{coupon.times_redeemed}</td>

                  {/* coupon status */}
                  <td className="text-center">
                    <div
                      className={`inline-block rounded-md border-2 px-5 py-1.5 font-semibold ${
                        coupon.valid
                          ? "border-green-500 bg-green-300 text-green-600"
                          : "border-red-600 bg-red-300"
                      }`}
                    >
                      {coupon.valid ? "Active" : "Not active"}
                    </div>
                  </td>

                  {/* Action buttons */}
                  <td className="flex items-center justify-center gap-2 py-4 text-white">
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-blue-500 p-2">
                      <Pencil size={16} />
                    </button>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-500 p-2">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateCouponModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        handleCreateCoupon={handleCreateCoupon}
      />
    </>
  );
}
