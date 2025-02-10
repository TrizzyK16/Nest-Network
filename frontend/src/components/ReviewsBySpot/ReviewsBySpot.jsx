import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchReviewsBySpotId } from "../../store/reviews";
import './ReviewsBySpot.css'

export default function Reviews() {
  const { spotId } = useParams();
  const reviews = useSelector(state => state?.reviews?.review?.Reviews)
  const dispatch = useDispatch();

  useEffect(() => {
    if (spotId) {
      dispatch(fetchReviewsBySpotId(spotId));
    }
  }, [dispatch, spotId]);

  if (!reviews) return <p>No reviews yet...</p>;

  return (
    <div className="review-container">
      {reviews.filter(review => review).map((review, index) => (
        <div key={index} className="review-item">
          <h3 className="review-user">{review.User.firstName}</h3>
          <h4 className="review-date">{review.createdAt}</h4>
          <p className="review-text">{review.review}</p>
        </div>
      ))}
    </div>
  )
}