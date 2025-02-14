import { useDispatch } from "react-redux";
import { deleteASpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css"

export default function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal }= useModal()
    
    const handleDelete = async () => {
        await dispatch(deleteASpot(spotId));
        closeModal()
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Confirm Delete</h1>
            </div>
            <div className="text">
                <h2>Are you sure you want to remove this spot from the listings?</h2>
            </div>
            <div className="button-containers">
                <div className="yes-button">
                    <button className="delete-spot-button" type="button" onClick={handleDelete} >
                        Yes (Delete Spot)
                    </button>
                </div>
                <div className="No-button">
                    <button className="keep-spot-button" type="button" onClick={closeModal}>
                        No (Keep Spot)
                    </button>
                </div>
            </div>
        </div>
    );
}
