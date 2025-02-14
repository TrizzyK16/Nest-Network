import { csrfFetch } from "./csrf";
//MUST HAVE CONSTANT THAT WE WILL USE FOR ACTION TYPE
const SET_REVIEWS = 'reviews/setReviews';
const ADD_REVIEW = "reviews/addReviews";
const USER_REVIEWS = "reviews/userReviews"
const UPDATE_REVIEW = "review/updateReview"

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews
    };
};

const addReview = (review) => {
    return {
      type: ADD_REVIEW,
      review,
    }
  };

const userReviews = (review) => {
  return {
    type: USER_REVIEWS,
    payload: review
  }
}

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review
  }
}

export const fetchReviewsBySpotId = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(setReviews(data));
    return response;
}

export const postReview = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
  
    if (response.ok) {
      const newReview = await response.json();
      dispatch(addReview(newReview));
      dispatch(fetchReviewsBySpotId(spotId))
      return newReview;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const deleteReview = (reviewId, spotId) => async (dispatch) =>{
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    const deletedReview = await response.json();
    dispatch(fetchReviewsBySpotId(spotId)); // Fetch updated reviews after deletion
    dispatch(getUsersReviews()); // Ensure user reviews update as well
    return deletedReview;
  }
}

export const getUsersReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`)
  const data = await response.json()
  dispatch(userReviews(data))
  return data
}

export const updateAReview = (reviewId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData)
  })
  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview));
    dispatch(getUsersReviews());
    return updatedReview;
  }
}

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
        case USER_REVIEWS:
          return { ...state, userReviews: action.payload}
        case UPDATE_REVIEW: {
          return {
              ...state,
              userReviews: {
                  ...state.userReviews,
                  Reviews: state.userReviews.Reviews.map(review =>
                      review.id === action.payload.id ? action.payload : review
                  ),
              },
          };
        }
        default:
            return state;
    }
}

export default reviewReducer;