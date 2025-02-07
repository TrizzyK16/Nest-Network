import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotsById } from "../../store/spots"; 
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
        <h1 className="title">{spot.name}</h1>
        <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      </div>
      <div className="spotImageGrid">
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
        <div className="hosted-by-info">
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        </div>
        <div className="spotDescription">
          <p>{spot.description}</p>
        </div>
        <div booking-container>
          <div className="pricing">
            <h3>${spot.price}/ night</h3>
          </div>
          <div review-info>
            <span>⭐ {spot.avgRating}</span>
            <h4>{spot.numReviews} reviews</h4>
          </div>
          <div className="reserve-button">
            <button>Reserve</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
