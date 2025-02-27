import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ax from "@/conf/ax";
import { endpoint } from "@/conf/main";

export default function Review({ user, productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await ax.get(endpoint.public.review.get(productId));
      console.log("Reviews:", res.data.data);
      setReviews(res.data.data);
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async () => {
    if (newReview.trim() === "" || rating === 0) return;

    try {
      const newReviewData = {
        comment: newReview,
        rating: rating,
        product: productId,
        user: user.id,
      };

      const res = await ax.post(endpoint.public.review.create, newReviewData);
      console.log("New Review:", res.data);

      setReviews([{ ...res.data }, ...reviews]);
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-2xl font-bold">Overall Reviews</h2>
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">
                {averageRating.toFixed(1)} out of 5
              </span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Write a Review</h3>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-medium">Your Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-all ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>
            <textarea
              placeholder={
                user?.username
                  ? `Share your experience about this product....`
                  : "Please login to write a review."
              }
              value={newReview}
              disabled={!user}
              onChange={(e) => setNewReview(e.target.value)}
              className="min-h-[100px] w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSubmitReview}
              disabled={newReview.trim() === "" || rating === 0 || !user}
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Reviews ({reviews.length})</h2>

        {reviews.map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{review.user?.username}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            </div>
            <hr className="border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
