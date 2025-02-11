import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/reviews";
import "./ReviewModal.css";

export default function ReviewModal({ spotId, onClose }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState([]);

  const handleStarClick = (value) => setRating(value);

  const handleSubmit = async () => {
    const newReview = { review: reviewText, stars: rating };
    const response = await dispatch(postReview(spotId, newReview));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      onClose(); // Close modal on success
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Leave a Review</h2>
        {errors.length > 0 && <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
