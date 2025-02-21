// DashBoard.jsx

import { ChartNoAxesCombined, ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ax from "../conf/ax";
import dayjs from "dayjs";
import OrderTable from "../components/OrderTable";

export const StatCard = () => {
  const day = ["7 days", "30 days", "90 days"];
  const bestSell = [
    { product: "product1", amount: 9009 },
    { product: "product3", amount: 99 },
    { product: "product5", amount: 99 },
    { product: "product10", amount: 99 },
  ];
  const [daysRevenue, setDaysRevenue] = useState(day[0]);
  const [daysOrder, setDaysOrder] = useState(day[0]);
  const [openDaysRevenue, setOpenDaysRevenue] = useState(false);
  const [openDaysOrder, setOpenDaysOrder] = useState(false);

  return (
    <div className="w-full">
      <div className="flex w-full flex-row gap-5">
        <div className="flex w-full flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Total Revenue
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setOpenDaysRevenue(!openDaysRevenue)}
                className="inline-flex w-22 items-center gap-2 rounded-lg border-1 border-gray-400 px-2 text-center text-xs font-light text-black focus:outline-none"
                type="button"
              >
                {daysRevenue}

                <div className="ms-auto">
                  <ChevronDown className="size-5 stroke-1" />
                </div>
              </button>
              {openDaysRevenue && (
                <div className="absolute top-full mt-1 w-fit divide-y divide-gray-100 rounded-lg bg-white shadow-sm">
                  <ul className="py-2 text-xs text-gray-700">
                    {day.map((item, index) => (
                      <li key={index}>
                        <a
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            return (
                              setDaysRevenue(item),
                              setOpenDaysRevenue(!openDaysRevenue)
                            );
                          }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-fit flex-row items-center justify-center gap-4">
            <div className="rounded-lg bg-blue-400 p-2">
              <ChartNoAxesCombined className="stroke-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-600">
                91002 Bath
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Daily Orders
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setOpenDaysOrder(!openDaysOrder)}
                className="inline-flex w-22 items-center gap-2 rounded-lg border-1 border-gray-400 px-2 text-center text-xs font-light text-black focus:outline-none"
                type="button"
              >
                {daysOrder}

                <div className="ms-auto">
                  <ChevronDown className="size-5 stroke-1" />
                </div>
              </button>
              {openDaysOrder && (
                <div className="absolute top-full mt-1 w-fit divide-y divide-gray-100 rounded-lg bg-white shadow-sm">
                  <ul className="py-2 text-xs text-gray-700">
                    {day.map((item, index) => (
                      <li key={index}>
                        <a
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            return (
                              setDaysOrder(item),
                              setOpenDaysOrder(!openDaysOrder)
                            );
                          }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="-mt-3 font-semibold text-gray-600">
            <p className="text-3xl">45</p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
          <div className="mb-2 flex flex-row items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Best Selling
              </p>
            </div>
            <div>
              <p className="text-xs font-light">(235 total)</p>
            </div>
          </div>
          {bestSell.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="-mt-3 flex w-50 flex-row items-center justify-between font-semibold text-gray-600"
            >
              <p className="text-xs font-thin">{item.product}</p>
              <p className="text-xs font-thin">{item.amount}</p>
            </div>
          ))}
          <div className="flex items-end justify-end">
            <button className="flex w-fit rounded-lg bg-blue-900 px-2 py-1 text-xs text-white hover:underline">
              view all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashBoard() {
  return (
    <div className="mt-5 w-full px-10">
      <StatCard />
      <OrderTable />
    </div>
  );
}
