import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUsersReviews } from '../../store/reviews'
import './ManageReviews.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal'
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal'

export default function ManageReviews(){
    const reviews = useSelector(state => state?.reviews?.userReviews?.Reviews)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=> {
        dispatch(getUsersReviews())
    }, [dispatch])

    const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    return (
        <div className='mr-container'>
            <div className='title-mr'>
                <h1>Manage Reviews</h1>
            </div>
            <div className='review-grid-mr'>
                {reviews?.map((review) => (
                    <div key={review.id} className='review-card-mr'>
                        <div className='review-spot-name-mr'>
                            <p>{review?.Spot?.name}</p>
                        </div>
                        <div className='review-createdAt-mr'>
                            <p>{review.createdAt}</p>
                        </div>
                        <div className='review-desc-mr'>
                            <p>{review.review}</p>
                        </div>
                        <div className='review-card-buttons-mr'>
                            <div className='update-button-mr'>
                                <OpenModalButton 
                                    buttonText='Update'
                                    modalComponent={<UpdateReviewModal reviewId={review?.id} onClose={handleCloseModal}/>}
                                />
                            </div>
                            <div className='delete-review-button-mr'>
                                <OpenModalButton 
                                    buttonText='Delete'
                                    modalComponent={<DeleteReviewModal reviewId={review?.id} spotId={review?.Spot?.id}/>}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}