//MUST HAVE CONSTANT THAT WE WILL USE FOR ACTION TYPE
const SET_REVIEWS = 'reviews/setReviews';
const ADD_REVIEW = "reviews/ADD_REVIEW";

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews
    };
};

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
  });

export const fetchReviewsBySpotId = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(setReviews(data));
    return response;
}

export const postReview = (spotId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
  
    if (response.ok) {
      const newReview = await response.json();
      dispatch(addReview(newReview));
      return newReview;
    } else {
      const errors = await response.json();
      return errors;
    }
  };
  

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, review: action.payload};
        case ADD_REVIEW:
            return {
                ...state,
                review: {
                ...state.review,
                Reviews: [action.review, ...(state.review.Reviews || [])],
                },
            };
        default:
            return state;
    }
}

export default reviewReducer;