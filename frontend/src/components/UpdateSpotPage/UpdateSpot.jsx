import { useState } from 'react'
import { updateUserSpot, createSpotImages } from '../../store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import './UpdateSpot.css'

export default function UpdateSpot() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();

  const sessionUser = useSelector((state) => state?.session.user);
  const spot = useSelector(state => state?.spots?.spotDetails)

  const [address, setAddress] = useState(spot.address)
  const [city, setCity] = useState(spot.city)
  const [state, setState] = useState(spot.state)
  const [country, setCountry] = useState(spot.country)
  const [name, setName] = useState(spot.name)
  const [price, setPrice] = useState(spot.price)
  const [description, setDescription] = useState(spot.description)
  const [image1, setImage1] = useState(spot?.SpotImages[0]?.url)
  const [image2, setImage2] = useState(spot?.SpotImages[1]?.url)
  const [image3, setImage3] = useState(spot?.SpotImages[2]?.url)
  const [image4, setImage4] = useState(spot?.SpotImages[3]?.url)
  const [image5, setImage5] = useState(spot?.SpotImages[4]?.url)
  const [lat, setLat] = useState(spot.lat)
  const [lng, setLng] = useState(spot.lng)


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const validImageExtensions = /.(png|jpg|jpeg)$/i;

    if (!country) newErrors.country = "Country is required.";
    if (!address) newErrors.address = "Street address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!lat || isNaN(lat)) newErrors.lat = "Latitude must be a number.";
    if (!lng || isNaN(lng)) newErrors.lng = "Longitude must be a number.";
    if (!description || description.length < 30) newErrors.description = "Description must be at least 30 characters.";
    if (!name) newErrors.name = "Spot name is required.";
    if (!price || price <= 0) newErrors.price = "Price must be a positive number.";
    if (!image1) newErrors.previewImage = "Must include a preview image.";

    // Image URL validation
    const imageArray = [image1, image2, image3, image4, image5];
    imageArray.forEach((image, index) => {
      if (image && !validImageExtensions.test(image)) {
        newErrors[`image${index + 1}`] = "Image URL needs to end in .png, .jpg, or .jpeg.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSpot = {id: spotId, country, address, city, state, lat, lng, description, name, price}
        if(!validateForm()){
        return
        }
        const response = await dispatch(updateUserSpot(spotId, updatedSpot))
        if(response){
            const imageArray = [image1, image2, image3, image4, image5]
            imageArray.map(async (image) =>{
            let preview = false;
            await dispatch(createSpotImages(response.id, image, preview))
            })
            navigate(`/spots/${response.id}`)
        }
    }
    return (
        <div className="new-spot-container">
            <h1>Update your Spot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Where is your place located?</h2>
                <p>Guests will only get your exact address once they book a reservation.</p>
                
                {errors.country && <p className="error">{errors.country}</p>}
                <input type="text" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />

                {errors.address && <p className="error">{errors.address}</p>}
                <input type="text" name="address" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                <div className="city-state">
                {errors.city && <p className="error">{errors.city}</p>}
                <input type="text" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <p>,</p>

                {errors.state && <p className="error">{errors.state}</p>}
                <input type="text" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                </div>

                <div className="lat-lng">
                {errors.lat && <p className="error">{errors.lat}</p>}
                <input type="text" name="lat" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
                <p>,</p>

                {errors.lng && <p className="error">{errors.lng}</p>}
                <input type="text" name="lng" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
                </div>

                <h2>Describe your place to guests</h2>
                {errors.description && <p className="error">{errors.description}</p>}
                <textarea name="description" placeholder="Please write at least 30 characters" value={description} onChange={(e) => setDescription(e.target.value)} />

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

                <div className="images-us">
                    {errors.previewImage && <p className="error">{errors.previewImage}</p>}
                    {errors.image1 && <p className="error">{errors.image1}</p>}
                    <input type="text" placeholder="Preview Image URL" value={image1} onChange={(e) => setImage1(e.target.value)} />

                    {errors.image2 && <p className="error">{errors.image2}</p>}
                    <input type="text" placeholder="Image URL" value={image2} onChange={(e) => setImage2(e.target.value)} />

                    {errors.image3 && <p className="error">{errors.image3}</p>}
                    <input type="text" placeholder="Image URL" value={image3} onChange={(e) => setImage3(e.target.value)} />

                    {errors.image4 && <p className="error">{errors.image4}</p>}
                    <input type="text" placeholder="Image URL" value={image4} onChange={(e) => setImage4(e.target.value)} />

                    {errors.image5 && <p className="error">{errors.image5}</p>}
                    <input type="text" placeholder="Image URL" value={image5} onChange={(e) => setImage5(e.target.value)} />
                </div>

                {sessionUser && <button type="submit">Create Spot</button>}
            </form>
        </div>
    )
}