import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import dayjs from "dayjs";
import SearchBar from "./SearchBar";

const OrderTable = (props) => {
  const status = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Paid: "bg-green-100 text-green-800 border-green-400",
    Abandoned: "bg-red-100 text-red-800 border-red-400",
    Completed: "bg-gray-100 text-gray-800 border-gray-400",
    Shipped: "bg-blue-100 text-blue-800 border-blue-400",
    Canceled: "bg-red-100 text-red-800 border-red-400",
  };
  const statusOptions = [
    "Pending",
    "Paid",
    "Abandoned",
    "Completed",
    "Shipped",
    "Canceled",
  ];

  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/orders?populate=*`);
      setOrder(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const filteredOrder = order?.filter((order) =>
    order.order_product.some((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const updateStatus = async (orderId, newStatus) => {
    try {
      await ax.put(`/orders/${orderId}`, { orderStatus: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mt-10 w-full">
      <div className="text-lg font-semibold">
        <p>Order Status</p>
      </div>
      <div className="py-4">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
      </div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500 shadow-2xl rtl:text-right">
          <thead class="border-1 border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                ADDRESS
              </th>
              <th scope="col" class="px-6 py-3">
                DATE
              </th>
              <th scope="col" class="py-3 ps-6">
                PRODUCT
              </th>
              <th
                scope="col"
                class="felx items-center justify-center py-3 pe-6"
              >
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrder?.map((item, index) => (
              <tr key={index} class="border-b border-gray-200 bg-white">
                <th
                  scope="row"
                  class="px-4 py-4 font-medium whitespace-nowrap text-gray-900"
                >
                  {item.documentId}
                </th>
                <td class="px-6 py-4">{item.owner?.username}</td>
                <td class="px-6 py-4">{item.address}</td>
                <td class="px-6 py-4">
                  {dayjs(item.createdAt).format("DD MMM YYYY")}
                </td>
                <td class="py-4 ps-6">
                  {item?.order_product?.map((item, index) => (
                    <div key={index}>{item?.name}</div>
                  ))}
                </td>
                <td className="py-4 pe-6">
                  <div
                    className={`h-7 w-30 rounded-2xl border-2 ${status[item?.orderStatus]} ${props.hiddenView} text-center`}
                  >
                    {item.orderStatus}
                  </div>
                  <div className={`${props.hiddenEdit}`}>
                    <select
                      className={`h-7 w-32 rounded-2xl border-2 px-2 ${status[item.orderStatus]}`}
                      value={item.orderStatus}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
