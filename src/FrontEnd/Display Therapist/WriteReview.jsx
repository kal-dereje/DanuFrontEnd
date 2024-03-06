import axios from "axios";
import React, { useState } from "react";
import endpoint from "../endpoint";

const ReviewPage = ({ data }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // onSubmit({ review, rating });

    try {
      const clientUserId = sessionStorage.getItem("userID");
      const therapistUserId = data.data.user._id;
      const reviewContent = review;

      const response = await axios.post(`${endpoint}/api/review/createReview`, {
        clientUserId,
        therapistUserId,
        reviewContent,
        rating,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

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
        Rate Therapist
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

export default ReviewPage;
