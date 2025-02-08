//MUST HAVE CONSTANT THAT WE WILL USE FOR ACTION TYPE
const SET_REVIEWS = 'reviews/setReviews';

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews
    };
};

export const fetchReviewsBySpotId = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(setReviews(data));
    return response;
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, review: action.payload};
        default:
            return state;
    }
}

export default reviewReducer;