import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import './UpdateReviewModal.css';
import { updateAReview } from '../../store/reviews';

export default function UpdateReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { setModalContent } = useModal(); // Access modal context to close it
    const review = useSelector(state => 
        state?.reviews?.userReviews?.Reviews?.find(r => r.id === reviewId)
    );

    const [rating, setRating] = useState(review?.stars || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState(review?.review || "");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (review) {
            setRating(review.stars);
            setReviewText(review.review);
        }
    }, [review]);

    const handleStarClick = (value) => setRating(value);
    const handleStarHover = (value) => setHoverRating(value);

    const handleSubmit = async () => {
        const validationErrors = [];

        if (rating <= 0) validationErrors.push("Please select a rating.");
        if (reviewText.trim() === "") validationErrors.push("Please write your review.");

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!review || !review.Spot) {
            setErrors(["Review data is missing or incomplete."]);
            return;
        }

        const newReview = { review: reviewText, stars: rating };
        console.log("Submitting update for reviewId:", reviewId, "Data:", newReview);

        const response = await dispatch(updateAReview(reviewId, newReview));

        if (response?.errors) {
            setErrors(response.errors);
        } else {
            console.log('made it here');
            setModalContent(null); // Close the modal properly
            console.log('should be closed');
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            setModalContent(null);
        }
    };

    if (!review) {
        return (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content">
                    <h2>Review Not Found</h2>
                    <p>Unable to load review data.</p>
                    <button onClick={() => setModalContent(null)}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>How was your stay at</h2>
                <h2>{review?.Spot?.name}</h2>
                {errors.length > 0 && (
                    <div className="error-list">
                        {errors.map((err, i) => (
                            <p key={i} className="error-message">{err}</p>
                        ))}
                    </div>
                )}
                <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                            onClick={() => handleStarClick(star)}
                            onMouseOver={() => handleStarHover(star)}
                            onMouseOut={() => setHoverRating(0)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={reviewText.trim().length < 10 || rating === 0}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
