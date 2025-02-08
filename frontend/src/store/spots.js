//MUST HAVE CONSTANT THAT WE WILL USE FOR ACTION TYPE
const SET_SPOTS = "spots/setSpots";
const SET_SPOT_DETAILS = "spots/setSpotDetails"

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots
  };
};

const setSpotDetails = (spots) => {
  return {
    type: SET_SPOT_DETAILS,
    payload: spots
  }
}

export const fetchSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const data = await response.json();
  dispatch(setSpots(data.Spots));
  return response;
};

export const fetchSpotsById = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(setSpotDetails(data));
  return response;
};

const initialState = {
  spotDetails: null
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spot: action.payload };
    case SET_SPOT_DETAILS:
      return {...state, spotDetails: action.payload}
    default:
      return state;
  }
};

export default spotReducer;