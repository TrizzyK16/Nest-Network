import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import { Link } from 'react-router-dom';
import "./LandingPage.css";

export default function LandingPage() {
  const spots = useSelector(state => state?.spots?.spot);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch]);

  return (
    <>
      <div className="title">
        <div>
          <h1 className="greeting">Find Your Perfect Stay</h1>
        </div>
      </div>
      <div className="listing-grid">
        {spots?.map((spot) => (
          <Link key={spot.id} to={`/spots/${spot.id}`} className="listing-card">
            <div className="image">
              <img src={spot.previewImage} alt={spot.name} />
            </div>
            <div className="location-rating">
              <div>
                <h3 className="city-state">{spot.city}, {spot.state}</h3>
              </div>
              <div>
                <h3 className="rating">⭐{spot.avgRating}</h3>
              </div>
            </div>
            <div className="price">
              <h3>${spot.price} night</h3>
            </div>
          </Link>
        ))}
      </div>
    </>);
}