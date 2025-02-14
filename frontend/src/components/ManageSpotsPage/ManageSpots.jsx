import './ManageSpots.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import { currentUsersSpots } from '../../store/spots'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal/DeletSpotModal'

export default function ManageSpots(){
    const spots = useSelector(state => state?.spots?.userSpots)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(currentUsersSpots())
    }, [dispatch])

    const createSpotPageRoute = () => {
        navigate(`/spots/new`)
    }

    const updateForm = (spotId) => {
        navigate(`/spots/${spotId}/edit`)
    }

    return (
        <div className='container-ms'>
            <div className='title-ms'>
                <h1>Manage Your Spots</h1>
            </div>
            <div className='create-spot-button-div'>
                <button className='create-spot-button-ms' type='button' onClick={createSpotPageRoute}>Create a New Spot</button>
            </div>
            <div className="listing-grid-ms">
                {spots?.map((spot) => (
                <div key={spot.id} className="listing-card-ms">
                    <Link to={`/spots/${spot.id}`}>
                        <div className="image-ms">
                        <img src={spot.previewImage} alt={spot.name} />
                        </div>
                        <div className="location-rating-ms">
                        <div>
                            <h3 className="city-state-ms">{spot.city}, {spot.state}</h3>
                        </div>
                        <div>
                            <h3 className="rating-ms">⭐{spot.avgRating}</h3>
                        </div>
                        </div>
                        <div className="price-ms">
                        <h3>${spot.price} night</h3>
                        </div>
                    </Link>
                    <div className='update-delete-container'>
                        <div className='update-container'>
                            <button className='update-button' type='button' onClick={() => updateForm(spot.id)}>Update</button>
                        </div>
                        <div className='delete-container'>
                            <OpenModalButton 
                                buttonText="Delete"
                                modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                            />
                        </div>
                    </div>
                </div>
                
                ))}
                
            </div>
        </div>
    )
}

