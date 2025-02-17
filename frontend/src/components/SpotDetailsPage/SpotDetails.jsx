import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpotsById } from "../../store/spots";
import { postReview } from "../../store/reviews";
import ReviewsBySpot from '../ReviewsBySpot/ReviewsBySpot';
import ReviewModal from '../ReviewModal/ReviewModal'
import './SpotDetails.css';

//still need to work on page 26 of wireframe

export default function SpotDetails() {
  const { spotId } = useParams();
  const spot = useSelector(state => state?.spots?.spotDetails);
  const reviews = useSelector(state => state?.reviews?.review?.Reviews)
  const sessionUser = useSelector((state) => state?.session?.user);
  const dispatch = useDispatch();

  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpotsById(spotId));
    }
    
  }, [dispatch, spotId, reviews]);

  if (!spot) return <p>Loading...</p>;

  const handleReviewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReview = (reviewData) => {
    dispatch(postReview(spotId, reviewData));
  };

  const handleAlert = () => {
    alert("Feature Coming Soon...")
  }
  

  return (
    <div className="container-sd">
      <div className="gen-info-container">
        <h1 className="spot-title">{spot?.name}</h1>
        <h2 className="location">{spot?.city}, {spot?.state}, {spot?.country}</h2>
      </div>
      <div className="spotImages">
        <div className="main-image">
          {spot.SpotImages && spot?.SpotImages.length > 0 && (
            (() => {
              const previewImage = spot?.SpotImages.find(image => image.preview === true);
              return previewImage ? <img src={previewImage?.url} alt="Main Spot Preview" /> : <p>No preview image available</p>;
            })()
          )}
        </div>
        <div className="other-images">
          {spot?.SpotImages && spot?.SpotImages.length > 0 &&
            spot?.SpotImages.filter(image => !image?.preview).map((image, index) => (
              <img key={index} src={image?.url} alt={`Spot image ${index}`} />
            ))
          }
        </div>
      </div>
      <div className="info-container">
        <div className="host-and-description">
          <div className="hosted-by-info">
            <h2>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
          </div>
          <div className="spotDescription">
            <p>{spot?.description}</p>
          </div>
        </div>
        <div className="booking-container">
          <div className="price-review">
            <div className="pricing">
              <h3>${spot?.price} night</h3>
            </div>
            <div className="review-info">
              {spot?.numReviews > 0 ? (
                <span>⭐ {spot?.avgRating} · {spot?.numReviews} {spot?.numReviews === 1 ? "review" : "reviews"}</span>
              ) : (
                <span>⭐ New</span>
              )}
            </div>
          </div>
          <div className="reserve-button">
            <button onClick={() => handleAlert()}>Reserve</button>
          </div>
        </div>
      </div>
      <div className="reviews-container">
        <div className="large-review-info">
          {spot.numReviews > 0 ? (
            <span>⭐ {spot?.avgRating} · {spot?.numReviews} {spot?.numReviews === 1 ? "review" : "reviews"}</span>
          ) : (
            <span>⭐ New</span>
          )}
        </div>
        <div className="review-button">
          {sessionUser && sessionUser?.id !== spot?.ownerId && (
            <button onClick={handleReviewClick}>Post Your Review</button>
          )}
          {isModalOpen && <ReviewModal spotId={spotId} onClose={handleCloseModal} onSubmit={handleSubmitReview} />}
        </div>
        <ReviewsBySpot spotId={spotId}/>
      </div>
    </div>
  );
}
