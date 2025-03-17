import { useEffect, useState } from "react";
import * as MealsyAPI from "../../../services/api-service";

function ReviewForm({ id }) {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Función para manejar el envío de comentarios
  const handleSubmitReview = async (event) => {
    event.preventDefault();

    try {
      const reviewData = { text: commentText, rating };
      await MealsyAPI.createReview(id, reviewData);
      setCommentText("");
      setRating(0);
      setConfirmationMessage("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      setConfirmationMessage("Error. You have already written a review for this dish.")
    }
  };

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg text-brown-dark">Leave a Review!</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
          <div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 focus:ring-brown-dark "
              placeholder="Write your review here..."
            />
          </div>
          <div>
            <label
              htmlFor="rating"
              className="block text-sm  text-brown-dark font-bold mb-1"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-brown-dark focus:ring-brown-dark"
            >
              <option value="1">1 - 🤢 Unappetizing</option>
              <option value="2">2 - 🤮 Mediocre </option>
              <option value="3">3 - 😐 Average</option>
              <option value="4">4 - 😋 Scrumptious</option>
              <option value="5">5 - 🤩 Exquisite</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-brown-dark text-white rounded-md cursor-pointer hover:bg-brown-medium"
            >
              Submit Review
            </button>
          </div>
        </form>
        {confirmationMessage && (
          <div className={`${confirmationMessage?.includes("Error") ? "bg-red-800" : "bg-green-700"} mt-2 p-2 text-white rounded-lg text-center`}>
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
