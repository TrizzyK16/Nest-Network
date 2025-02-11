import './ManageSpots.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
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
        <div className='container'>
            <div>
                <h1>Manage Your Spots</h1>
            </div>
            <div>
                <button type='button' onClick={createSpotPageRoute}>Create A Spot</button>
            </div>
            <div className="listing-grid">
                {spots?.map((spot) => (
                <div key={spot.id} className="listing-card">
                    <Link to={`/spots/${spot.id}`}>
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
                    <div className='update-delete-container'>
                        <div className='update-container'>
                            <button type='button' onClick={() => updateForm(spot.id)}>Update</button>
                        </div>
                        <div className='delete-container'>
                            <OpenModalButton 
                                buttonText="delete"
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

