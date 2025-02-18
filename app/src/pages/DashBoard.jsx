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
    <div>
      <div className="flex flex-row gap-5">
        <div className="flex w-100 flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
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
        <div className="flex w-100 flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
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
        <div className="flex w-100 flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
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
export const Chart = () => {
  const status = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Paid: "bg-green-100 text-green-800 border-green-400",
    Abandoned: "bg-red-100 text-red-800 border-red-400",
    Completed: "bg-gray-100 text-gray-800 border-gray-400",
    Shipped: "bg-blue-100 text-blue-800 border-blue-400",
    Canceled: "bg-red-100 text-red-800 border-red-400",
  };
  const [order, setOrder] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/orders?populate=*`);
      setOrder(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
      <div className="flex w-full justify-center">
        <div className="relative flex w-1/3 items-center justify-center">
          <div className="absolute start-0 ms-1 flex text-gray-500">
            <Search className="size-5" />
          </div>
          <input
            placeholder="Search"
            className="w-full rounded-2xl border-2 border-gray-300 px-6 shadow-2xl"
          ></input>
        </div>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500 shadow-2xl rtl:text-right dark:text-gray-400">
          <thead class="border-1 border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                EMAIL
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
            {order?.map((item, index) => (
              <tr
                key={index}
                class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  class="px-4 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {item.documentId}
                </th>
                <td class="px-6 py-4">{item.owner?.username}</td>
                <td class="px-6 py-4">{item.owner?.email}</td>
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
                    className={`h-7 w-30 rounded-2xl border-2 ${status[item?.orderStatus]} text-center`}
                  >
                    {item.orderStatus}
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

export default function DashBoard() {
  return (
    <div className="mx-10 mt-5 w-full">
      <StatCard />
      <OrderTable />
    </div>
  );
}
