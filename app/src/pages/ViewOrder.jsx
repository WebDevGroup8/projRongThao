import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { Truck } from "lucide-react";
import ax from "../conf/ax";
import dayjs from "dayjs";

export const TruckIcon = () => {
  return (
    <div className="start-0 bg-white border-2 rounded-full w-fit h-fit p-1">
      <Truck />
    </div>
  );
};

export const GroupViewCard = (props) => {
  const [orderItems, setOrderItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/orders?populate=*`);
      setOrderItems(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {orderItems?.map((item) => (
        <div
          key={item.id}
          className=" bg-white rounded-lg shadow-sm h transition-shadow  flex flex-col border border-gray-300 px-5 pt-2 pb-10 mt-5 lg:px-10 lg:pb-10"
        >
          <div className="flex flex-col h-full lg:flex-row lg:pb-10 lg:pt-5">
            <div className="flex flex-col relative lg:pe-90">
              <div className="text-2xl lg:text-4xl whitespace-nowrap">
                Order #{item.id}
              </div>
              <div className="text-xs whitespace-nowrap lg:text-sm lg:pt-2">
                {dayjs(item.createdAt).format(
                  "[Date ]DD MMMM YYYY [Time ]HH:mm a"
                )}
              </div>
            </div>
            <div className="lg:justify-center flex flex-col relative w-full  h-full justify-center items-center mt-4 ">
              <div className="flex w-60 lg:w-120 h-5 justify-center items-center">
                {item.orderStatus === "Shipped" && (
                  <hr className="transition-normal  border-5 rounded-2xl border-blue-700 w-full" />
                )}

                {item.orderStatus === "Completed" ? (
                  <hr className="transition-normal  border-5 rounded-2xl border-blue-700 w-full" />
                ) : (
                  <hr className="border-5 rounded-2xl border-gray-200 w-full " />
                )}
              </div>

              <div className="absolute flex flex-row justify-between items-center w-60 lg:w-120 top-1 ">
                <div className="flex items-center justify-center w-3 h-3 bg-black rounded-full ">
                  {item.orderStatus === "Pending" && <TruckIcon />}
                </div>
                <div className="flex items-center justify-center w-3 h-3 bg-black rounded-full ">
                  {item.orderStatus === "Shipped" && <TruckIcon />}
                </div>
                <div className="flex items-center justify-center w-3 h-3 bg-black rounded-full ">
                  {item.orderStatus === "Completed" && <TruckIcon />}
                </div>
              </div>

              {item.orderStatus === "Canceled" ? (
                <div className="text-red-500 text-l font-semibold underline">
                  Canceled
                </div>
              ) : (
                <div className="flex flex-row text-xs w-68 justify-between mt-2 lg:w-128">
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
    <div className="lg:flex lg:gap-0 lg:flex-wrap lg:justify-between lg:px-18 mt-2">
      {item?.map((item) => (
        <div
          key={item.id}
          className=" w-full mt-2 gap-5 lg:w-110 lg:flex lg:justify-between"
        >
          <div className="lg:flex-row lg:flex lg:w-full lg:justify-between bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col border border-gray-100 px-5 pt-2 pb-1 ">
            <div className="w-full flex flex-row  mb-5 mt-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mb3 lg:w-18 lg:h-18"
              />
              <div className="flex flex-row justify-between w-full pt-2 lg:pt-0 lg:ps-9">
                <div className="flex flex-col ms-3 text-xs lg:me-7">
                  <div className="font-semibold whitespace-nowrap truncate w-28 pb-2 lg:text-sm">
                    {item.name}
                  </div>
                  <div className="font-thin font-xs lg:text-sm">
                    Color: {item.color}
                  </div>
                  <div className="font-thin font-xs lg:text-sm">
                    Size: {item.size}
                  </div>
                </div>
                <div className="flex flex-col text-xs ps-8 w-full whitespace-nowrap truncate">
                  <div className="font-semibold pb-2 lg:text-sm">
                    {" "}
                    {item.price} THB
                  </div>
                  <div className="font-thin font-xs lg:text-sm">
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
    <div className="p-10 ">
      <div className="flex flex-col relative w-full">
        <div className="lg:text-5xl text-2xl font-semibold lg:mb-3 mb-1">
          Your Order
        </div>

        <div className>
          <hr className="absolute -bottom-2 left-0 right-0 border-2 border-blue-900" />
        </div>
      </div>
      {active === "To Ship" ? <GroupViewCard /> : <div>safjas</div>}
    </div>
  );
}
