import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/reviews";
import "./ReviewModal.css";

export default function ReviewModal({ spotId, onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState([]);

  const handleStarClick = (value) => setRating(value);

  const handleSubmit = async () => {
    const validationErrors = [];

    if (sessionUser.id === 4) {
      validationErrors.push("Cannot post a review as a demo user");
    }

    if (rating <= 0) {
      validationErrors.push("Please select a rating.");
    }

    if (reviewText.trim() === "") {
      validationErrors.push("Please write your review.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newReview = { review: reviewText, stars: rating };
    const response = await dispatch(postReview(spotId, newReview));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Leave a Review</h2>

        {errors.length > 0 && (
          <div className="error-list">
            {errors.map((err, i) => (
              <p key={i} className="error-message">{err}</p>
            ))}
          </div>
        )}

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
        </div>
      </div>
    </div>
  );
}
