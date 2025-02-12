import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";

export default function DeleteReviewModal({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const { closeModal }= useModal()
    
    const handleDelete = async () => {
        await dispatch(deleteReview(reviewId, spotId));
        closeModal()
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Confirm Delete</h1>
            </div>
            <div className="text">
                <h2>Are you sure you want to remove this review?</h2>
            </div>
            <div className="button-containers">
                <div className="yes-button">
                    <button type="button" onClick={handleDelete} >
                        Yes (Delete Review)
                    </button>
                </div>
                <div className="No-button">
                    <button type="button" onClick={closeModal}>
                        No (Keep Review)
                    </button>
                </div>
            </div>
        </div>
    );
}
