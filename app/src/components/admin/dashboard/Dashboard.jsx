// DashBoard.jsx

import { useEffect, useState } from "react";

import { ChartNoAxesCombined } from "lucide-react";
import OrderTable from "@admin/order/OrderTable";
import ax from "@/conf/ax";
import { endpoint } from "@/conf/main";

export const StatCard = (props) => {
  const [user, setUser] = useState([]);
  const [totalPurchasedItems, setTotalPurchasedItems] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await ax.get(endpoint.admin.user.customer.query());
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Calculate total purchased items when user data changes
  useEffect(() => {
    const total = user.reduce((grandTotal, customer) => {
      // Count items for this customer across all their orders
      const customerItems =
        customer.order_histories?.reduce((customerTotal, order) => {
          return customerTotal + (order.order_product?.length || 0);
        }, 0) || 0;

      return grandTotal + customerItems;
    }, 0);

    setTotalPurchasedItems(total);
  }, [user]);

  useEffect(() => {
    // Step 1: Create an object to count items
    const itemCounts = {};

    user.forEach((customer) => {
      customer.order_histories?.forEach((order) => {
        order.order_product?.forEach((item) => {
          // Assuming item has a name or id property to identify it
          const itemName = item.name;
          itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
        });
      });
    });

    // Step 2: Convert to array and sort
    const sortedBestSellers = Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Descending order

    setBestSellers(sortedBestSellers);
  }, [user]);

  const formattedPrice = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(props.totalRevenue);

  // Fetch users on component mount
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="w-full">
      <div className="flex w-full flex-row gap-5">
        <div className="flex w-full flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-5">
            <div>
              <p className="text-2xl font-semibold text-gray-600">
                Total Revenue
              </p>
            </div>
          </div>
          <div className="flex w-fit flex-row items-center justify-center gap-4">
            <div className="rounded-lg bg-blue-400 p-2">
              <ChartNoAxesCombined className="stroke-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-600">
                {formattedPrice} THB
              </h1>
            </div>
          </div>
        </div>
        <div className="p- flex w-fit flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-5">
            <div>
              <p className="min-w-70 text-2xl font-bold whitespace-nowrap text-gray-600">
                All time Orders :
              </p>
            </div>
          </div>
          <div className="text-5xl whitespace-nowrap text-gray-600">
            {totalPurchasedItems || 0}
          </div>
        </div>
        <div className="flex w-full flex-col justify-start gap-4 rounded-lg border-2 border-gray-400 p-4 shadow-sm">
          <div className="mb-2 flex flex-row items-center justify-between gap-5">
            <div>
              <p className="text-2xl font-bold text-gray-600">Best Selling</p>
            </div>
          </div>

          {bestSellers.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="-mt-3 flex w-full flex-row items-center justify-between font-semibold whitespace-nowrap text-gray-600"
            >
              <div>
                <p className="">{item.name}</p>
              </div>
              <div>
                <p className="">{item.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);

  return (
    <div className="mt-5 w-full px-10">
      <StatCard totalRevenue={totalRevenue} setTotalRevenue={setTotalRevenue} />
      <OrderTable
        totalRevenue={totalRevenue}
        setTotalRevenue={setTotalRevenue}
        configView={false}
      />
    </div>
  );
}
