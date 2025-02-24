import React from "react";
import OrderTable from "./OrderTable";
import StatusFilter from "../../public/discovery/StatusFilter";

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
