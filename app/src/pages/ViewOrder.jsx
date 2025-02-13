import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { Truck } from "lucide-react";
import ax from "../conf/ax";
import dayjs from "dayjs";
import conf from "../conf/mainapi";

export const TruckIcon = () => {
  return (
    <div className="start-0 h-fit w-fit rounded-full border-2 bg-white p-1">
      <Truck />
    </div>
  );
};

export const GroupViewCard = (props) => {
  const [orderItems, setOrderItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/users/me?populate=order_histories`);
      setOrderItems(res.data.order_histories);
      console.log(res.data.order_histories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isPendingOrCanceled = ["Pending", "Abandoned", "Canceled"].includes(
    orderItems?.orderStatus,
  );

  const status = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Paid: "bg-green-100 text-green-800 border-green-400",
    Abandoned: "bg-red-100 text-red-800 border-red-400",
    Completed: "bg-gray-100 text-gray-800 border-gray-400",
    Shipped: "bg-blue-100 text-blue-800 border-blue-400",
    Canceled: "bg-red-100 text-red-800 border-red-400",
  };
  return (
    <div>
      {orderItems?.map((item) => (
        <div
          key={item.id}
          className="mt-5 flex w-full flex-col rounded-lg border border-gray-300 bg-white px-5 pt-2 pb-10 shadow-sm transition-shadow lg:px-10 lg:pb-10"
        >
          <div className="flex h-full flex-col lg:flex-row lg:pt-5 lg:pb-10">
            <div className="relative">
              <div>
                <div className="text-2xl whitespace-nowrap lg:text-4xl">
                  Order{" "}
                  <span className="text-xl lg:text-2xl">
                    #{item.documentId}
                  </span>
                </div>
                <div className="text-xs whitespace-nowrap lg:pt-2 lg:text-sm">
                  {dayjs(item.createdAt).format(
                    "[Date ]DD MMMM YYYY [Time ]HH:mm a",
                  )}
                </div>
                <div
                  className={`mt-3 h-7 w-30 rounded-2xl border-2 ${status[item?.orderStatus]} text-center`}
                >
                  {item?.orderStatus}
                </div>
              </div>
            </div>

            <div className="relative mt-4 flex h-full w-full flex-col items-center justify-center lg:justify-center">
              <div className="flex h-5 w-60 items-center justify-center lg:w-120">
                {item.orderStatus === "Shipped" && (
                  <hr className="w-full rounded-2xl border-5 border-blue-700 transition-normal" />
                )}

                {item.orderStatus === "Completed" ? (
                  <hr className="w-full rounded-2xl border-5 border-blue-700 transition-normal" />
                ) : (
                  <hr className="w-full rounded-2xl border-5 border-gray-200" />
                )}
              </div>

              <div className="absolute top-1 flex w-60 flex-row items-center justify-between lg:w-120">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-black">
                  {item.orderStatus === "Paid" && <TruckIcon />}
                </div>
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-black">
                  {item.orderStatus === "Shipped" && <TruckIcon />}
                </div>
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-black">
                  {item.orderStatus === "Completed" && <TruckIcon />}
                </div>
              </div>

              {item.orderStatus === "Canceled" ? (
                <div className="text-l font-semibold text-red-500 underline">
                  Canceled
                </div>
              ) : (
                <div className="mt-2 flex w-68 flex-row justify-between text-xs lg:w-128">
                  <div className="text-xs">Shipped</div>
                  <div className="text-xs">Out for Delivery</div>
                  <div className="text-xs">Delivery</div>
                </div>
              )}
            </div>
          </div>

          <ViewOrderCard item={item.order_product} />
        </div>
      ))}
    </div>
  );
};

export const ViewOrderCard = ({ item }) => {
  return (
    <div className="mt-2 lg:flex lg:flex-wrap lg:justify-between lg:gap-0 lg:px-18">
      {item?.map((item) => (
        <div
          key={item.id}
          className="mt-2 w-full gap-5 lg:flex lg:w-110 lg:justify-between"
        >
          <div className="flex flex-col rounded-lg border border-gray-100 bg-white px-5 pt-2 pb-1 shadow-sm transition-shadow duration-200 hover:shadow-lg lg:flex lg:w-full lg:flex-row lg:justify-between">
            <div className="mt-3 mb-5 flex w-full flex-row">
              <img
                src={
                  `${conf.imageUrlPrefix}${item.image[0].url}` ||
                  "/placeholder.svg"
                }
                alt={item.name}
                className="mb3 h-16 w-16 rounded-md object-cover lg:h-18 lg:w-18"
              />
              <div className="flex w-full flex-row justify-between pt-2 lg:ps-9 lg:pt-0">
                <div className="ms-3 flex flex-col text-xs lg:me-7">
                  <div className="w-28 truncate pb-2 font-semibold whitespace-nowrap lg:text-sm">
                    {item.name}
                  </div>
                  <div className="font-xs font-thin lg:text-sm">
                    Color: {item.color}
                  </div>
                  <div className="font-xs font-thin lg:text-sm">
                    Size: {item.size}
                  </div>
                </div>
                <div className="flex w-full flex-col truncate ps-8 text-xs whitespace-nowrap">
                  <div className="pb-2 font-semibold lg:text-sm">
                    {" "}
                    {item.price} THB
                  </div>
                  <div className="font-xs font-thin lg:text-sm">
                    total: {item.quantity}
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

  return (
    <div className="p-10">
      <div className="relative flex w-full flex-col">
        <div className="mb-1 text-2xl font-semibold lg:mb-3 lg:text-5xl">
          Your Order
        </div>

        <div className>
          <hr className="absolute right-0 -bottom-2 left-0 border-2 border-blue-900" />
        </div>
      </div>
      {active === "To Ship" ? <GroupViewCard /> : <div>safjas</div>}
    </div>
  );
}
