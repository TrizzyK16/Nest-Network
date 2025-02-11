//MUST HAVE CONSTANT THAT WE WILL USE FOR ACTION TYPE
const SET_SPOTS = "spots/setSpots";
const SET_SPOT_DETAILS = "spots/setSpotDetails"
const CREATE_A_NEW_SPOT = 'spot/createSpot'

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

const createANewSpot = (spot) => {
  return {
    type: CREATE_A_NEW_SPOT,
    payload: spot
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

export const createSpot = (spotData) => async (dispatch) => {
  const response = await fetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
    body: JSON.stringify(spotData)
  });
  const data = await response.json();
  dispatch(createANewSpot(data))
  return response;
}

const initialState = {
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spot: action.payload };
    case SET_SPOT_DETAILS:
      return {...state, spotDetails: action.payload}
    case CREATE_A_NEW_SPOT:
      return { ...state, spot: [...state.spots, action.payload] };
    default:
      return state;
  }
};

export default spotReducer;