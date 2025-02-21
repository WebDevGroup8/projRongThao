import React from "react";
import OrderTable from "../components/OrderTable";
import StatusFilter from "../components/StatusFilter";

const OrderManagement = () => {
  return (
    <div className="flex h-full w-screen flex-col px-10">
      <div>
        <OrderTable configView={true} />
      </div>
    </div>
  );
};

export default OrderManagement;
