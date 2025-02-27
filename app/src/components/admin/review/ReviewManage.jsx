import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Star, Trash2 } from "lucide-react";
import ax from "@/conf/ax";
import { endpoint } from "@/conf/main";
import { conf } from "../../../conf/main";
import dayjs from "dayjs";

const ReviewManage = () => {
  const [products, setProducts] = useState();
  const [expandedProduct, setExpandedProduct] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await ax.get(endpoint.admin.review.query());
      const productsWithReviews = res.data.data.filter(
        (product) => product.reviews && product.reviews.length > 0,
      );
      setProducts(productsWithReviews);
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  const getProductStats = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const reviews = product.reviews;
    return {
      total: reviews.length,
      average:
        reviews.length > 0
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
            reviews.length
          : 0,
    };
  };

  const toggleExpand = (productId) => {
    setExpandedProduct((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleDeleteReview = async (documentId) => {
    try {
      ax.delete(endpoint.admin.review.delete(documentId));
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="mt-10 w-full px-4 pb-20 md:px-10">
      <h1 className="mb-6 text-2xl font-semibold">Product Reviews</h1>

      <div className="space-y-4">
        {products?.map((product) => {
          const isExpanded = expandedProduct.includes(product.id);
          const stats = getProductStats(product.id);
          const reviews = product.reviews;
          console.log(reviews);

          return (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <div
                className="flex cursor-pointer items-center p-4 hover:bg-gray-50"
                onClick={() => toggleExpand(product.id)}
              >
                <div className="mr-4 h-20 w-20 overflow-hidden rounded-lg">
                  <img
                    src={
                      `${conf.imageUrlPrefix}${product.image[0]?.url}` ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {product.reviews.length} Reviews
                    </div>
                    <div className="flex items-center justify-end">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < (Math.round(stats?.average) || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-300">
                  <div className="grid grid-cols-2 gap-4 rounded-md bg-gray-50 p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm text-gray-500">Total Reviews</h3>
                      <p className="text-xl font-bold text-gray-900">
                        {stats?.total}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm text-gray-500">Average Rating</h3>
                      <div className="flex items-center">
                        <div className="relative flex h-4 w-24 items-center rounded-full bg-gray-300">
                          <div
                            className="absolute top-0 left-0 h-full rounded-full bg-yellow-400"
                            style={{ width: `${(stats?.average / 5) * 100}%` }}
                          />
                        </div>
                        <p className="ml-2 text-xl font-bold text-gray-900">
                          {stats?.average.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Comment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {reviews?.map((review) => (
                          <tr
                            key={review.id}
                            className="transition duration-200 ease-in-out hover:bg-gray-100"
                          >
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {review.user?.username}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-4 w-4 ${
                                      index < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-500">
                              {review.comment}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {dayjs(review.created_at).format("DD MMM YYYY")}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() =>
                                  handleDeleteReview(review.documentId)
                                }
                                className="text-red-600 transition duration-200 ease-in-out hover:text-red-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewManage;
