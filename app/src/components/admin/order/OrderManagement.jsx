import OrderTable from "@admin/order/OrderTable";
import React from "react";

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
