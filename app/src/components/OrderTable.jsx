import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import dayjs from "dayjs";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { Trash2 } from "lucide-react";
import PrintShipLabel from "./PrintShipLabel";

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
    "Abandoned",
    "Paid",
    "Shipped",
    "Completed",
    "Canceled",
  ];

  //TODO: print Shipping Label

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/orders?populate=*`);
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const filteredOrder = orders
    ?.filter(
      (order) =>
        (selectedStatus.length === 0 ||
          selectedStatus.includes(order.orderStatus.trim())) &&
        (order.documentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderStatus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.order_product?.some((product) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()),
          )),
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const updateStatus = async (order, newStatus) => {
    try {
      await ax.put(`/orders/${order}`, { data: { orderStatus: newStatus } });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.documentId === order
            ? { ...order, orderStatus: newStatus }
            : order,
        ),
      );
      fetchProducts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await ax.delete(`/orders/${id}`);
      fetchProducts();
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
      <div className="flex flex-row justify-between py-2">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        {props.configView && (
          <StatusFilter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            statusOptions={statusOptions}
          />
        )}
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
              {props.configView && (
                <th scope="col" class="px-6 py-3">
                  DELETE
                </th>
              )}
              {props.configView && (
                <th scope="col" class="px-6 py-3">
                  PRINT
                </th>
              )}
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
                  {props.configView ? (
                    <select
                      className={`h-7 w-32 rounded-2xl border-2 ${status[item.orderStatus]} text-center`}
                      value={item.orderStatus}
                      onChange={(e) =>
                        updateStatus(item.documentId, e.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      className={`h-7 w-30 rounded-2xl border-2 ${status[item?.orderStatus]} text-center`}
                    >
                      {item.orderStatus}
                    </div>
                  )}
                </td>
                {props.configView && (
                  <td className="px-5 text-center">
                    <Trash2
                      size={40}
                      onClick={() => deleteOrder(item.documentId)}
                      className="cursor-pointer rounded-lg p-2 text-red-500 transition-all duration-200 hover:bg-red-100 hover:text-red-700"
                    />
                  </td>
                )}
                {props.configView && (
                  <td className="px-5 text-center">
                    <PrintShipLabel order={item} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
