import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotsById } from "../../store/spots";
import ReviewsBySpot from '../ReviewsBySpot/ReviewsBySpot'
import './SpotDetails.css'

export default function SpotDetails() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.spotDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpotsById(spotId));
    }
  }, [dispatch, spotId]);

  if (!spot) return <p>Loading...</p>;


  return (
    <div className="container">
      <div className="gen-info-container">
        <h1 className="spot-title">{spot.name}</h1>
        <h2 className="location">{spot.city}, {spot.state}, {spot.country}</h2>
      </div>
      <div className="spotImages">
        <div className="main-image">
          {spot.SpotImages && spot.SpotImages.length > 0 && (
            (() => {
              const previewImage = spot.SpotImages.find(image => image.preview === true);
              return previewImage ? <img src={previewImage.url} alt="Main Spot Preview" /> : <p>No preview image available</p>;
            })()
          )}
        </div>
        <div className="other-images">
          {spot.SpotImages && spot.SpotImages.length > 0 &&
            spot.SpotImages.filter(image => !image.preview).map((image, index) => (
              <img key={index} src={image.url} alt={`Spot image ${index}`} />
            ))
          }
        </div>
      </div>
      <div className="info-container">
        <div className="host-and-description">

          <div className="hosted-by-info">
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          </div>
          <div className="spotDescription">
            <p>{spot.description}</p>
          </div>
        </div>
        <div className="booking-container">
          <div className="price-review">
            <div className="pricing">
              <h3>${spot.price} night</h3>
            </div>
            <div className="review-info">
              <span>⭐ {spot.avgRating}</span>
              <h4>{spot.numReviews} reviews</h4>
            </div>
          </div>
          <div className="reserve-button">
            <button>Reserve</button>
          </div>
        </div>
      </div>
      <div className="reviews-container">
        <div className="large-review-info">
          <span>⭐ {spot.avgRating} {spot.numReviews} reviews</span>
        </div>
        <ReviewsBySpot />
      </div>
    </div>
  );
}
