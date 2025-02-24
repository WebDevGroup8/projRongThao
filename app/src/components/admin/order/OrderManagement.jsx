import React from "react";
import OrderTable from "@admin/order/OrderTable";

const OrderManagement = () => {
  return (
    <div className="flex h-full flex-col px-10">
      <div>
        <OrderTable configView={true} />
      </div>
    </div>
  );
};

export default OrderManagement;
