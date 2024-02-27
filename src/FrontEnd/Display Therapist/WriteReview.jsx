import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ review, rating });
    setReview("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <label className="block mb-2 font-semibold" htmlFor="review">
        Your Review
      </label>
      <textarea
        id="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      ></textarea>

      <label className="block mt-4 mb-2 font-semibold" htmlFor="rating">
        Rating
      </label>
      <div className="flex ">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setRating(index + 1)}
            className={`mr-2 transform scale-150 focus:outline-none ${
              index + 1 <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="inline-flex 
             px-4 py-2 my-10 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Review
      </button>
    </form>
  );
};

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <ReviewForm onSubmit={addReview} />
    </div>
  );
};

export default ReviewPage;
