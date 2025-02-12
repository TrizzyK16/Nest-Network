import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchReviewsBySpotId } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal'
import './ReviewsBySpot.css'

export default function Reviews({spotId}) {
  const reviews = useSelector(state => state?.reviews?.review?.Reviews)
  const sessionUser = useSelector(state => state?.session?.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (spotId) {
      dispatch(fetchReviewsBySpotId(spotId));
    }
  }, [dispatch, spotId]);

  if (!reviews) return <p>No reviews yet...</p>;

  return (
    <div className="review-container">
      {reviews?.map((review, index) => (
        <div key={index} className="review-item">
          <h3 className="review-user">{review?.User?.firstName}</h3>
          <h4 className="review-date">{review?.createdAt}</h4>
          <p className="review-text">{review?.review}</p>
          {review?.User?.id === sessionUser?.id && (
            <div className="delete-container">
              <OpenModalButton
                buttonText='delete'
                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId}/>}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}