import { useDispatch } from "react-redux";
import { deleteASpot } from "../../store/spots";
import { useNavigate } from "react-router-dom";

export default function DeleteSpotModal({ spotId, closeModal }) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleDelete = async () => {
        await dispatch(deleteASpot(spotId));
        // navigate("/spots/current");
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
                    <button type="button" onClick={handleDelete}>
                        Yes (Delete Spot)
                    </button>
                </div>
                <div className="No-button">
                    <button type="button" onClick={closeModal}>
                        No (Keep Spot)
                    </button>
                </div>
            </div>
        </div>
    );
}
