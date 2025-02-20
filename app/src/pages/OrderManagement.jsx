import React from "react";
import OrderTable from "../components/OrderTable";

const OrderManagement = () => {
  return (
    <div className="px-10">
      <OrderTable configView={true} />
    </div>
  );
};

export default OrderManagement;
