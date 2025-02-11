import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CreateASpot.css";

export default function NewSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    name: "",
    price: "",
    description: "",
    previewImage: "",
    images: ["", "", "", ""],
    lat: "",
    lng: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.address) newErrors.address = "Street address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.lat || isNaN(formData.lat)) newErrors.lat = "Latitude must be a number.";
    if (!formData.lng || isNaN(formData.lng)) newErrors.lng = "Longitude must be a number.";
    if (!formData.description || formData.description.length < 30) newErrors.description = "Description must be at least 30 characters.";
    if (!formData.name) newErrors.name = "Spot name is required.";
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be a positive number.";
    if (!formData.previewImage) newErrors.previewImage = "At least one preview image URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const spotData = { ...formData, price: Number(formData.price) };
    const response = await dispatch(createSpot(spotData));

    if (response.ok) {
        //chage to /spots/${spotData.id} when u can
      navigate(`/`);
    }
  };

  return (
    <div className="new-spot-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <h2>Where is your place located?</h2>
        <p>Guests will only get your exact address once they book a reservation.</p>
        
        {errors.country && <p className="error">{errors.country}</p>}
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />

        {errors.address && <p className="error">{errors.address}</p>}
        <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} />

        <div className="city-state">
          {errors.city && <p className="error">{errors.city}</p>}
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <p>,</p>

          {errors.state && <p className="error">{errors.state}</p>}
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        </div>

        <div className="lat-lng">
          {errors.lat && <p className="error">{errors.lat}</p>}
          <input type="text" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} />
          <p>,</p>

          {errors.lng && <p className="error">{errors.lng}</p>}
          <input type="text" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} />
        </div>

        <h2>Describe your place to guests</h2>
        {errors.description && <p className="error">{errors.description}</p>}
        <textarea name="description" placeholder="Please write at least 30 characters" value={formData.description} onChange={handleChange} />

        <h2>Create a title for your spot</h2>
        {errors.name && <p className="error">{errors.name}</p>}
        <input type="text" name="name" placeholder="Name of your spot" value={formData.name} onChange={handleChange} />

        <h2>Set a base price for your spot</h2>
        <div className="price-section">
          <p>$</p>
          {errors.price && <p className="error">{errors.price}</p>}
          <input type="number" name="price" placeholder="Price per night (USD)" value={formData.price} onChange={handleChange} />
        </div>

        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        {errors.previewImage && <p className="error">{errors.previewImage}</p>}
        <input type="text" name="previewImage" placeholder="Preview Image URL" value={formData.previewImage} onChange={handleChange} />

        {formData.images.map((image, index) => (
          <input key={index} type="text" placeholder="Image URL" value={image} onChange={(e) => handleImageChange(index, e.target.value)} />
        ))}

        {sessionUser && <button type="submit">Create Spot</button>}
      </form>
    </div>
  );
}
