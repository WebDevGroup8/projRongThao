import { useState, useEffect } from "react";
import { Truck, ChevronDown } from "lucide-react";
import ax from "../conf/ax";
import dayjs from "dayjs";
import conf from "../conf/mainapi";
import StatusFilter from "../components/StatusFilter";

export const TruckIcon = () => {
  return (
    <div className="start-0 mb-2 h-fit w-fit rounded-full border-2 bg-white p-1">
      <Truck />
    </div>
  );
};

export const GroupViewCard = ({ selectedStatus }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [expandedIds, setExpandedIds] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await ax.get(`/users/me?populate=order_histories`);
      setOrderItems(res.data.order_histories);
      console.log(res.data.order_histories);
    } catch (error) {
      console.error("Error fetching OrderItems:", error);
    }
  };

  const filteredOrderItems = orderItems?.filter(
    (order) =>
      selectedStatus.length === 0 ||
      selectedStatus.includes(order.orderStatus.trim()),
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Paid: "bg-green-100 text-green-800 border-green-400",
    Abandoned: "bg-red-100 text-red-800 border-red-400",
    Completed: "bg-gray-100 text-gray-800 border-gray-400",
    Shipped: "bg-blue-100 text-blue-800 border-blue-400",
    Canceled: "bg-red-100 text-red-800 border-red-400",
  };

  const toggleExpanded = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-5">
      {filteredOrderItems
        ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow lg:p-5"
          >
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-2xl font-semibold lg:text-4xl">
                    Order #{orderItems.length - index}
                  </p>
                  <span className="text-xl lg:text-2xl">
                    (ref: {item.documentId})
                  </span>
                  <p className="text-xs lg:text-sm">
                    {dayjs(item.createdAt).format(
                      "[Date] DD MMMM YYYY [Time] HH:mm a",
                    )}
                  </p>
                </div>
                <div className="mt-4 w-full lg:w-2/3">
                  <div className="relative h-3 w-full rounded-full bg-gray-200">
                    <div
                      className={`absolute h-3 rounded-full transition-all duration-500 ${
                        item.orderStatus === "Paid"
                          ? "w-1/3 bg-yellow-500"
                          : item.orderStatus === "Shipped"
                            ? "w-2/3 bg-blue-500"
                            : item.orderStatus === "Completed"
                              ? "w-full bg-green-500"
                              : "w-0 bg-gray-300"
                      }`}
                    />
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ${
                        item.orderStatus === "Pending"
                          ? "left-0"
                          : item.orderStatus === "Paid"
                            ? "left-1/3 -translate-x-1/2"
                            : item.orderStatus === "Shipped"
                              ? "left-2/3 -translate-x-full"
                              : item.orderStatus === "Completed"
                                ? "left-full -translate-x-full"
                                : "left-0"
                      }`}
                    >
                      <TruckIcon className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-gray-600">
                    <span>Pending</span>
                    <span>Paid</span>
                    <span>Shipped</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-25">
                  <div
                    className={`mt-3 inline-block rounded-2xl border-2 px-3 py-1 text-sm ${statusClasses[item?.orderStatus]}`}
                  >
                    {item?.orderStatus}
                  </div>
                </div>

                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="mt-4 flex w-fit items-center justify-center transition-transform duration-300 ease-in-out"
                >
                  {expandedIds[item.id] ? "Hide detail" : "View detail"}
                  <ChevronDown
                    className={`mt-1 h-6 w-6 text-black transition-transform duration-300 ${expandedIds[item.id] ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                <div className="w-25"></div>
              </div>
            </div>

            <div className="flex flex-col justify-between lg:flex-row lg:gap-2">
              {expandedIds[item.id] && (
                <>
                  <ViewOrderCard item={item.order_product} />
                  <div className="mt-4 flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg lg:w-1/3">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800">
                      Order Summary
                    </h3>
                    {item.total_price ? (
                      <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-semibold">
                            {item.total_price ? item.total_price : 0} THB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span className="font-semibold">150 THB</span>
                        </div>
                        <div className="font-semi-bold flex justify-between border-t pt-3 text-lg">
                          <span>Total</span>
                          <span>
                            {item.total_price ? item.total_price + 150 : 150}{" "}
                            THB
                          </span>
                        </div>
                        <div className="font-semi-bold mt-5 flex justify-between pt-3 text-lg">
                          <span>Address</span>
                          <span>{item.address ? item.address : "No Data"}</span>
                        </div>
                      </div>
                    ) : (
                      "Payment not success"
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export const ViewOrderCard = ({ item }) => {
  return (
    <div className="mt-2 w-full lg:flex lg:w-2/3 lg:flex-col lg:justify-between lg:gap-0">
      {item?.map((item) => (
        <div
          key={item.id}
          className="mt-2 w-full gap-5 lg:flex lg:w-full lg:justify-between"
        >
          <div className="flex flex-col rounded-lg border border-gray-100 bg-white px-5 pt-2 pb-1 shadow-sm transition-shadow duration-200 hover:shadow-lg lg:flex lg:w-full lg:flex-row lg:justify-between">
            <div className="mt-3 mb-2 flex w-full flex-row">
              <img
                src={
                  `${conf.imageUrlPrefix}${item.image[0].url}` ||
                  "/placeholder.svg"
                }
                alt={item.name}
                className="mb3 h-16 w-16 rounded-md object-cover lg:h-18 lg:w-18"
              />
              <div className="flex w-full flex-row justify-between pt-2 lg:ps-9 lg:pt-0">
                <div className="ms-3 flex flex-col text-sm lg:me-7">
                  <div className="w-28 truncate pb-2 font-semibold whitespace-nowrap lg:text-base">
                    {item.name}
                  </div>
                  <div className="font-xs font-thin lg:text-sm">
                    Color: {item.color}
                  </div>
                  <div className="font-xs font-thin lg:text-sm">
                    Size: {item.size}
                  </div>
                </div>
                <div className="flex flex-col ps-8 text-end whitespace-nowrap">
                  <div className="truncate pb-2 text-sm font-semibold lg:text-base">
                    {item.price} THB
                  </div>
                  <div className="font-xs text-xs font-thin lg:text-sm">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" w-full flex justify-center">
              <div className="relative w-64 flex items-center">
                <hr className=" border-3 border-black w-full" />
                <div className=" absolute flex flex-row  justify-between  w-full">
                  {item.ToShip === "stageOne" ? (
                    <div className="flex w-5 h-5 rounded-full bg-white items-center justify-center">
                      <CircleCheck />
                    </div>
                  ) : (
                    <div className=" w-4 h-4 bg-black rounded-full flex justify-center">
                      <p className="mt-6 text-xs">shipped</p>
                    </div>
                  )}
                  <div className=" w-4 h-4 bg-black rounded-full flex justify-center">
                    <p className="mt-6 text-xs whitespace-nowrap">
                      Out for Delivery
                    </p>
                  </div>
                  <div className=" w-4 h-4 bg-black rounded-full flex justify-center">
                    <p className="mt-6 text-xs">Delivered</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ViewOrder() {
  const [active, setActive] = useState("To Ship");
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusOptions = [
    "Pending",
    "Abandoned",
    "Paid",
    "Shipped",
    "Completed",
    "Canceled",
  ];

  return (
    <div className="w-full px-10">
      <div className="relative flex w-full flex-col justify-between">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mt-2 text-2xl font-semibold lg:my-10 lg:mb-3 lg:text-4xl">
            Your Order
          </div>
          <div className="mb-2 h-fit lg:mt-5 lg:mb-3">
            <StatusFilter
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              statusOptions={statusOptions}
            />
          </div>
        </div>

        <div>
          <hr className="absolute right-0 -bottom-2 left-0 border-2 border-blue-900" />
        </div>
      </div>
      {active === "To Ship" ? (
        <GroupViewCard selectedStatus={selectedStatus} />
      ) : (
        <div>safjas</div>
      )}
    </div>
  );
}
