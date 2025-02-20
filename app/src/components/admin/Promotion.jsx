import { useEffect, useState } from "react";
import ax from "../../conf/ax";
import Loading from "../Loading";

export default function Promotion() {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const fetchPromotion = async () => {
    try {
      setIsLoading(true);
      const response = await ax.get(`/stripe/promotions`);
      setCoupons(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotion();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="px-10 pt-10">
        <p className="text-2xl font-semibold">Coupon List</p>
        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 shadow-2xl rtl:text-right">
            <thead className="border-1 border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-4" scope="col">
                  ID
                </th>
                <th scope="col">NAME</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">USAGE</th>
                <th
                  scope="col"
                  className="felx items-center justify-center py-3 pe-6 text-center"
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((coupon, index) => (
                <tr key={index} className="border-b border-gray-200 bg-white">
                  {/* coupon id */}
                  <th className="px-4 py-4">{coupon.id}</th>
                  {/* coupon name */}

                  <td className="font-medium whitespace-nowrap text-gray-900">
                    {coupon.name}
                  </td>
                  {/* coupon description */}
                  <td>
                    {coupon.percent_off}% off {coupon.duration}
                  </td>
                  {/* coupon usage */}
                  <td>{coupon.times_redeemed}</td>

                  {/* coupon satatus */}
                  <td className="flex h-full flex-row items-center justify-center text-center">
                    <div
                      className={`my-2 w-fit justify-center rounded-md border-2 px-5 py-1.5 text-center font-semibold ${coupon.valid ? "border-green-500 bg-green-300 text-green-600" : "border-red-600 bg-red-300"}`}
                    >
                      {coupon.valid ? "Active" : "Not active"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
