import { useEffect, useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [spots, setSpots] = useState([]); // Ensure spots remains an array

  useEffect(() => {
    const fetchSpotData = async () => {
      try {
        const response = await fetch("http://localhost:8050/api/spots");
        const data = await response.json();

        const spotDetails = await Promise.all(
          data.Spots.map(async (spot) => {
            const res = await fetch(`http://localhost:8050/api/spots/${spot.id}`);
            return res.json();
          })
        );

        setSpots(spotDetails); // Set spots as an array of objects
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };

    fetchSpotData();
  }, []);



  return (
    <div className="container">
      <h1 className="title">Find Your Perfect Stay</h1>

      <div className="search-box">
        <div className="search-bar">
          <input type="text" placeholder="Search destinations..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="listing-grid">
        {spots.map((spot) => (
          <div key={spot.id}>
            <div className="image">
                {spot.SpotImages && spot.SpotImages.length > 0 && (
                <img src={spot.SpotImages[0].url} alt={spot.name} />
                )}
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
