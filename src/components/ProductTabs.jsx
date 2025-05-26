import React, { useState } from "react";
import { Avatar, Rating, LinearProgress } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useAddReview } from "../hooks/useReview";
import { useFetchReviews } from "../hooks/useFetchReviews";
import { useAuthStore } from "../store/authStore";
import useDeleteReview from "../hooks/useDeleteReview";
import useGetProfile from "../hooks/useGetProfile";
import toast from "react-hot-toast";

const getRatingStats = (reviews) => {
  const stats = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      stats[r.rating - 1]++;
    }
  });
  return stats;
};

const ProductTabs = ({ longdes, id }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const currentUser = useAuthStore((state) => state.user);
  const { mutate: addReview, isPending } = useAddReview();
  const { data: fetchedReviews, refetch } = useFetchReviews(id);
  const { deleteReview, loading: deleting } = useDeleteReview();

  const { profile } = useGetProfile();

  const reviews = fetchedReviews?.data?.reviewlist || [];
  const averageRating = fetchedReviews?.data?.avragerating || 0;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment || rating === 0) return;

    addReview(
      {
        product_id: id,
        rating,
        review: comment,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            const newReview = {
              review: comment,
              rating,
              user: "You",
              created_at: new Date().toISOString(),
            };

            fetchedReviews.data.reviewlist = [newReview, ...reviews];
            setRating(0);
            setComment("");
            refetch();
          } else {
            toast(
              "You can’t review this product unless you’ve purchased it or already reviewed it."
            );
            setRating(0);
            setComment("");
          }
        },
        onError: (error) => {
          console.error("Error submitting review:", error);
          toast.error("Error while submitting your review.");
        },
      }
    );
  };

  const handleDeleteReview = async (review_id) => {
    await deleteReview({ product_id: id, review_id });
    refetch();
  };

  const ratingStats = getRatingStats(reviews);
  const totalReviews = reviews.length;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 justify-center">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "description"
              ? "text-gray-600 border-b-2 border-gray-600"
              : "text-gray-600 hover:text-teal-500"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "review"
              ? "text-gray-600 border-b-2 border-gray-600"
              : "text-gray-600 hover:text-teal-500"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div className="mt-2">
        {activeTab === "description" && (
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: longdes }}
          ></div>
        )}

        {activeTab === "review" && (
          <div className="flex flex-col sm:flex-row gap-10">
            {/* Left Panel */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Average Rating
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Rating value={averageRating} precision={0.1} readOnly />
                  <span className="text-sm text-gray-700">
                    {averageRating.toFixed(1)} / 5 ({totalReviews} reviews)
                  </span>
                </div>
              </div>

              {/* Star Distribution */}
              <div className="space-y-2 mb-6">
                {[...ratingStats].reverse().map((count, i) => {
                  const star = 5 - i;
                  const percentage = totalReviews
                    ? Math.round((count / totalReviews) * 100)
                    : 0;

                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-8 text-gray-700">{star}★</span>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        className="flex-1 h-3 rounded bg-gray-200"
                      />
                      <span className="w-8 text-right text-gray-600">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Review List */}
              <div className="flex-1">
                {reviews.length > 0 ? (
                  reviews.map((review, idx) => {
                    const isCurrentUser =
                      profile?.id && review.user_id === profile.id;

                    return (
                      <div
                        key={review._id || idx}
                        className="pt-4 mt-4 flex items-start gap-4"
                      >
                        <Avatar className="bg-teal-500">
                          {review.user_details?.first_name
                            ?.charAt(0)
                            .toUpperCase() || "A"}
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-800">
                              {isCurrentUser
                                ? "Your Review"
                                : `${review.user_details?.first_name || ""} ${
                                    review.user_details?.last_name || ""
                                  }`}
                            </h4>

                            <span className="text-xs text-gray-500">
                              {review.created_at
                                ? format(parseISO(review.created_at), "PPP p")
                                : "Date not available"}
                            </span>
                          </div>

                          <Rating
                            value={Number(review.rating)}
                            readOnly
                            size="small"
                          />
                          <p className="text-sm text-gray-700 mt-2">
                            {review.review}
                          </p>

                          {isCurrentUser && (
                            <button
                              onClick={() => handleDeleteReview(review.id, id)}
                              disabled={deleting}
                              className="mt-2 text-sm text-red-500 hover:underline"
                            >
                              {deleting ? "Deleting..." : "Delete Review"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-600 mt-4">No reviews yet.</p>
                )}
              </div>
            </div>

            {/* Review Form */}
            <div>
              <h1 className="text-base font-medium text-gray-600 mb-1">
                Write a review about this product
              </h1>
              <form onSubmit={handleReviewSubmit}>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  className="mb-2"
                />
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition disabled:opacity-50"
                >
                  {isPending ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
