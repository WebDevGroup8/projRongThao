import { useEffect, useState } from "react";

import CouponSection from "@admin/promotion/CouponSection";
import CreateCouponModal from "@admin/promotion/CreateCouponModal";
import CreatePromotionModal from "@admin/promotion/CreatePromotionModal";
import Loading from "@layout/Loading";
import PromotionSection from "@admin/promotion/PromotionSection";
import UpdateCouponModal from "@admin/promotion/UpdateCouponModal";
import UpdatePromotionModal from "@admin/promotion/UpdatePromotionModal";
import ax from "@/conf/ax";
import { toast } from "react-toastify";
import { endpoint } from "@/conf/main";

export default function Promotion() {
  const [isLoading, setIsLoading] = useState(true);
  // Coupons State
  const [coupons, setCoupons] = useState([]);
  const [isCreateModalCouponOpen, setIsCreateModalCouponOpen] = useState(false);
  const [isUpdateCouponModalOpen, setIsUpdateCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  // Promotion State
  const [products, setProducts] = useState([]);
  const [promotionedProduct, setPromotionedProduct] = useState([]);
  const [isCreatePromotionModalOpen, setIsCreatePromotionModalOpen] =
    useState(false);
  const [isUpdatePromotionModalOpen, setIsUpdatePromotionModalOpen] =
    useState(false);
  const [selectedPromotionGroup, setSelectedPromotionGroup] = useState(null);

  const handleCreateCoupon = async (formData) => {
    try {
      setIsLoading(true);
      const response = await ax.post(
        endpoint.admin.promotion.coupon.create(),
        formData,
      );

      console.log("Coupon created successfully:", response.data);
      toast.success("Coupon created successfully!"); // Replace with toast notification if needed

      setIsCreateModalCouponOpen(false); // Close the modal after successful submission
      fetchCoupon();
    } catch (error) {
      console.error(
        "Error creating coupon:",
        error.response?.data || error.message,
      );
      toast.error("Failed to create coupon. Please try again."); // Replace with toast notification if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCoupon = async (id, formData) => {
    try {
      setIsLoading(true);
      const response = await ax.post(
        endpoint.admin.promotion.coupon.update(id),
        formData,
      );

      console.log("Coupon updated successfully:", response.data);
      toast.success("Coupon updated successfully!"); // Replace with toast notification if needed

      fetchCoupon(); // Refresh the list
    } catch (error) {
      console.error(
        "Error updating coupon:",
        error.response?.data || error.message,
      );
      toast.error("Failed to update coupon. Please try again."); // Replace with toast notification if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      setIsLoading(true);
      await ax.delete(endpoint.admin.promotion.coupon.delete(id));

      console.log("Coupon deleted successfully.");
      toast.success("Coupon deleted successfully!"); // Replace with toast notification if needed

      fetchCoupon(); // Refresh the list
    } catch (error) {
      console.error(
        "Error deleting coupon:",
        error.response?.data || error.message,
      );
      toast.error("Failed to delete coupon. Please try again."); // Replace with toast notification if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePromotion = async (formData) => {
    try {
      setIsLoading(true);
      console.log("Promotion Data:", formData);

      // Create an array of update requests
      const updateRequests = formData.selectedProducts.map(async (product) => {
        const documentId = product.documentId;
        const promotion = product.promotion;

        // Update request payload
        const payload = {
          promotion: {
            name: formData.name,
            start: formData.start,
            end: formData.end,
            discountType: promotion.discountType,
            percentage: promotion.percentage,
            promotionPrice: promotion.promotionPrice,
          },
        };

        // Return the Axios request promise
        await ax.put(endpoint.admin.promotion.create(documentId), {
          data: payload,
        });
      });

      // Execute all requests in parallel
      await Promise.all(updateRequests);

      setSelectedPromotionGroup(null);

      setIsCreatePromotionModalOpen(false);
      fetchProducts();
      toast.success("All promotions updated successfully!");
      console.log("All promotions updated successfully!");
    } catch (error) {
      console.error("Error updating promotions:", error);
      toast.error("Failed to update promotions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // The Functional is the same so we can do like this
  const handleUpdatePromotion = (formData) => {
    handleCreatePromotion(formData);
    setIsUpdatePromotionModalOpen(false);
  };
  const handleDeletePromotion = async (deletedPromotioGroup) => {
    console.log(deletedPromotioGroup);
    try {
      setIsLoading(true);

      // Create an array of update requests
      const deleteRequest = deletedPromotioGroup.products.map(
        async (product) => {
          const documentId = product.documentId;

          // Erase all promotion
          await ax.put(endpoint.admin.promotion.delete(documentId), {
            data: { promotion: {} },
          });
        },
      );

      // Execute all requests in parallel
      await Promise.all(deleteRequest);

      setIsCreatePromotionModalOpen(false);
      fetchProducts();
      toast.success("All promotions updated successfully!");
      console.log("All promotions updated successfully!");
    } catch (error) {
      console.error("Error updating promotions:", error);
      toast.error("Failed to update promotions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoupon = async () => {
    try {
      setIsLoading(true);
      const response = await ax.get(endpoint.admin.promotion.coupon.query());
      setCoupons(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ax.get(endpoint.admin.product.query());
      setProducts(res.data.data);
      // discountType to track
      setPromotionedProduct(
        res.data.data.filter(
          (product) => product.promotion && product.promotion.discountType,
        ),
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCoupon();
    fetchProducts();
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
            setSelectedPromotionGroup={setSelectedPromotionGroup}
            handleDeletePromotion={handleDeletePromotion}
            promotionedProduct={promotionedProduct}
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
        handleCreatePromotion={handleCreatePromotion}
        products={products}
      />
      <UpdatePromotionModal
        isOpen={isUpdatePromotionModalOpen}
        onClose={() => setIsUpdatePromotionModalOpen(false)}
        selectedPromotionGroup={selectedPromotionGroup}
        handleUpdatePromotion={handleUpdatePromotion}
      />
    </>
  );
}
