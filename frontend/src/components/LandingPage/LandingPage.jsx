import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import "./LandingPage.css";

export default function LandingPage() {
  const spots = useSelector(state => state?.spots?.spot);
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title">Find Your Perfect Stay</h1>

       <div className="listing-grid">
        {spots?.map((spot) => (
          <div key={spot.id}>
            <div className="image">
                <img src={spot.previewImage} alt={spot.name}/>
            </div>
            <div className="city-state">
                <h3>{spot.city}, {spot.state}</h3>
            </div>
            <div className="star">
                <span>⭐</span>
            </div>
            <div className="rating number">
                <h3>{spot.avgRating}</h3>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}

