import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot, createSpotImages } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CreateASpot.css";

export default function NewSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [description, setDescription] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState()
  const [image3, setImage3] = useState()
  const [image4, setImage4] = useState()
  const [image5, setImage5] = useState()
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!country) newErrors.country = "Country is required.";
    if (!address) newErrors.address = "Street address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!lat || isNaN(lat)) newErrors.lat = "Latitude must be a number.";
    if (!lng || isNaN(lng)) newErrors.lng = "Longitude must be a number.";
    if (!description || description.length < 30) newErrors.description = "Description must be at least 30 characters.";
    if (!name) newErrors.name = "Spot name is required.";
    if (!price || price <= 0) newErrors.price = "Price must be a positive number.";
    if (!image1) newErrors.previewImage = 'Must include a preview image'

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = { country, address, city, state, lat, lng, description, name, price }
    if (!validateForm()) {
      return
    }
    const response = await dispatch(createSpot(newSpot))
    if (response) {
      const imageArray = [image1, image2, image3, image4, image5]
      imageArray.map(async (image, i) => {
        let preview = false;
        if (i === 0) {
          preview = true
        }
        await dispatch(createSpotImages(response.id, image, preview))
      })
      navigate(`/spots/${response.id}`)
    }
  }


  return (
    <div className="new-spot-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <h2>Where is your place located?</h2>
        <p>Guests will only get your exact address once they book a reservation.</p>

        <div className="location-grid">


          <div>
            Country
            {errors.country && <p className="error">{errors.country}</p>}
            <input className="_country" type="text" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div>
            Street
            {errors.address && <p className="error">{errors.address}</p>}
            <input className="_address" type="text" name="address" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="city-state">
            <div className="_city">
              City
              {errors.city && <p className="error">{errors.city}</p>}
              <input type="text" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <p id="comma">,</p>
            <div className="_state">
              State
              {errors.state && <p className="error">{errors.state}</p>}
              <input type="text" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </div>

          <div className="lat-lng">
            <div className="_lat">
              Latitude
              {errors.lat && <p className="error">{errors.lat}</p>}
              <input type="text" name="lat" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
            </div>
            <p id="comma">,</p>

            <div className="_lng">
              Longitude
              {errors.lng && <p className="error">{errors.lng}</p>}
              <input type="text" name="lng" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
            </div>
          </div>
        </div>

        <h2>Describe your place to guests</h2>
        {errors.description && <p className="error">{errors.description}</p>}
        <textarea className="text-area" name="description" placeholder="Please write at least 30 characters" value={description} onChange={(e) => setDescription(e.target.value)} />

        <h2>Create a title for your spot</h2>
        {errors.name && <p className="error">{errors.name}</p>}
        <input type="text" name="name" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />

        <h2>Set a base price for your spot</h2>
        <div className="price-section">
          <p>$</p>
          {errors.price && <p className="error">{errors.price}</p>}
          <input type="number" name="price" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="image-container">
          <div className="images">
            {errors.previewImage && <p className="error">{errors.previewImage}</p>}
            <input type="text" placeholder="Preview Image URL" value={image1} onChange={(e) => setImage1(e.target.value)} />
            <input type="text" placeholder="Image URL" value={image2} onChange={(e) => setImage2(e.target.value)} />
            <input type="text" placeholder="Image URL" value={image3} onChange={(e) => setImage3(e.target.value)} />
            <input type="text" placeholder="Image URL" value={image4} onChange={(e) => setImage4(e.target.value)} />
            <input type="text" placeholder="Image URL" value={image5} onChange={(e) => setImage5(e.target.value)} />
          </div>
        </div>
        <div className="button-box">

          {sessionUser && <button type="submit">Create Spot</button>}
        </div>
      </form >
    </div >
  );
}
