import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { Truck } from "lucide-react";

export const TruckIcon = () => {
  return (
    <div className="start-0 bg-white border-2 rounded-full w-fit h-fit p-1">
      <Truck />
    </div>
  );
};

export const GroupViewCard = (item) => {
  return (
    <div>
      <div className=" bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col border border-gray-100 px-5 pt-2 pb-10 mt-5">
        <div className="flex flex-col h-full">
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">order</div>
            <div className="text-sm">date klajk;gja;</div>
          </div>
          <div className="flex flex-col relative w-full h-full justify-center items-center mt-4">
            <div className="flex w-full h-5 justify-center ">
              <hr className="border-5 rounded-2xl border-gray-200 w-60 my-auto" />
            </div>
            <div className="absolute flex flex-row justify-between items-center w-60 top-1">
              <div className="flex items-center justify-center w-3 h-3 bg-black rounded-full ">
                {item.OrderStatus === "Pending" && <TruckIcon />}
              </div>
              <div className="flex items-center justify-center w-3 h-3 bg-black rounded-full ">
                {item.OrderStatus === "Shipped" && <TruckIcon />}
              </div>
              <div className="flex items-center justify-center w-3 h-3 bg-black rounded-full ">
                {item.OrderStatus === "Completed" && <TruckIcon />}
              </div>
            </div>
            <div className="flex flex-row text-xs w-68 justify-between mt-2">
              <div className="text-xs">Shipped</div>
              <div className="text-xs">Out for Delivery</div>
              <div className="text-xs">Delivery</div>
            </div>
          </div>
        </div>
        <ViewOrderCard />
      </div>
    </div>
  );
};
export const ViewOrderCard = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      {cartItems.map((item) => (
        <div className=" w-full mt-6 gap-5">
          <div className=" bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col border border-gray-100 px-5 pt-2 pb-1">
            <div className="flex flex-row  mb-5 mt-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mb3 "
              />
              <div className="flex flex-row justify-between w-full pt-2">
                <div className="flex flex-col ms-3 text-xs">
                  <div className="font-semibold whitespace-nowrap truncate w-28 pb-2">
                    {item.name}
                  </div>
                  <div className="font-thin font-xs">Color: {item.color}</div>
                  <div className="font-thin font-xs">Size: {item.size}</div>
                </div>
                <div className="flex flex-col text-xs ps-8 w-full whitespace-nowrap truncate">
                  <div className="font-semibold pb-2"> {item.price} THB</div>
                  <div className="font-thin font-xs">
                    total: {item.quantity}
                  </div>
                  <div className="font-thin font-xs">status: {item.ToShip}</div>
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
      <div className="flex flex-col relative w-full">
        <div className="flex flex-row justify-center gap-5 ">
          <div className="text-2xl font-semibold text-gray-400">
            <button
              className={`${
                active === "To Ship" ? "text-black underline" : "text-gray-400"
              } hover:underline`}
              onClick={() => setActive("To Ship")}
            >
              To Ship
            </button>
          </div>

          <div className="text-2xl font-semibold text-gray-400">
            <button
              className={`${
                active === "To Receive"
                  ? "text-black underline"
                  : "text-gray-400"
              } hover:underline`}
              onClick={() => setActive("To Receive")}
            >
              To Receive
            </button>
          </div>
        </div>
        <div className="absolute  bottom-0 left-6 right-6">
          <hr className="border-1 border-gray-200" />
        </div>
        <div className>
          <hr className="absolute -bottom-2 left-0 right-0 border-2 border-blue-500" />
        </div>
      </div>
      {active === "To Ship" ? <GroupViewCard /> : <div>safjas</div>}
    </div>
  );
}
