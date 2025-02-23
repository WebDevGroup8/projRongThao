import { useEffect, useState } from "react";
import ax from "../../conf/ax";
import Loading from "../Loading";
import CreateCouponModal from "./CreateCouponModal";
import UpdateCouponModal from "./UpdateCouponModal";
import CouponSection from "./CouponSection";
import PromotionSection from "./PromotionSection";
import CreatePromotionModal from "./CreatePromotionModal";
import UpdatePromotionModal from "./UpdatePromotionModal";

export default function Promotion() {
  const [isLoading, setIsLoading] = useState(true);
  // Coupons State
  const [coupons, setCoupons] = useState([]);
  const [isCreateModalCouponOpen, setIsCreateModalCouponOpen] = useState(false);
  const [isUpdateCouponModalOpen, setIsUpdateCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  // Promotion State
  const [isCreatePromotionModalOpen, setIsCreatePromotionModalOpen] =
    useState(false);

  const [isUpdatePromotionModalOpen, setIsUpdatePromotionModalOpen] =
    useState(false);
  const handleCreateCoupon = async (formData) => {
    try {
      setIsLoading(true);
      const response = await ax.post("/stripe/promotion", formData);

      console.log("Coupon created successfully:", response.data);
      alert("Coupon created successfully!"); // Replace with toast notification if needed

      setIsCreateModalCouponOpen(false); // Close the modal after successful submission
      fetchCoupon();
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

  const handleUpdateCoupon = async (id, formData) => {
    try {
      setIsLoading(true);
      const response = await ax.post(`/stripe/promotion/${id}`, formData);

      console.log("Coupon updated successfully:", response.data);
      alert("Coupon updated successfully!"); // Replace with toast notification if needed

      fetchCoupon(); // Refresh the list
    } catch (error) {
      console.error(
        "Error updating coupon:",
        error.response?.data || error.message,
      );
      alert("Failed to update coupon. Please try again."); // Replace with toast notification if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      setIsLoading(true);
      await ax.delete(`/stripe/promotion/${id}`);

      console.log("Coupon deleted successfully.");
      alert("Coupon deleted successfully!"); // Replace with toast notification if needed

      fetchCoupon(); // Refresh the list
    } catch (error) {
      console.error(
        "Error deleting coupon:",
        error.response?.data || error.message,
      );
      alert("Failed to delete coupon. Please try again."); // Replace with toast notification if needed
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoupon = async () => {
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
    fetchCoupon();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="px-10 pt-10">
        <CouponSection
          coupons={coupons}
          setIsCreateModalCouponOpen={setIsCreateModalCouponOpen}
          setIsUpdateCouponModalOpen={setIsUpdateCouponModalOpen}
          setSelectedCoupon={setSelectedCoupon}
          handleDeleteCoupon={handleDeleteCoupon}
        />
        <div className="mt-10">
          <PromotionSection
            setIsCreatePromotionModalOpen={setIsCreatePromotionModalOpen}
            setIsUpdatePromotionModalOpen={setIsUpdatePromotionModalOpen}
          />
        </div>
      </div>
      <CreateCouponModal
        isOpen={isCreateModalCouponOpen}
        onClose={() => setIsCreateModalCouponOpen(false)}
        handleCreateCoupon={handleCreateCoupon}
      />
      <UpdateCouponModal
        isOpen={isUpdateCouponModalOpen}
        onClose={() => setIsUpdateCouponModalOpen(false)}
        handleUpdateCoupon={handleUpdateCoupon}
        coupon={selectedCoupon}
      />
      <CreatePromotionModal
        isOpen={isCreatePromotionModalOpen}
        onClose={() => setIsCreatePromotionModalOpen(false)}
      />

      <UpdatePromotionModal
        isOpen={isUpdatePromotionModalOpen}
        onClose={() => setIsUpdatePromotionModalOpen(false)}
      />
    </>
  );
}
