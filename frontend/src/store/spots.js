import { csrfFetch } from "../store/csrf";

//MUST HAVE CONSTANT THAT WE WILL USE FOR ACTION TYPE
const SET_SPOTS = "spots/setSpots";
const SET_SPOT_DETAILS = "spots/setSpotDetails"
const CREATE_A_NEW_SPOT = 'spot/createSpot'
const CREATE_SPOT_IMAGES = 'images/spotImages'
const SET_USERS_SPOTS = 'spots/usersSpots'
const UPDATE_SPOT = 'spot/updateSpot'
const DELETE_SPOT = 'spot/deleteSpot'

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

const setImages = (images) => {
  return {
      type: CREATE_SPOT_IMAGES,
      payload: images
  }
}

const setUsersSpots = (spots) => {
  return {
    type: SET_USERS_SPOTS,
    payload: spots
  }
}

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId
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
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error creating spot:", errorData);
    return errorData;
  }

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createANewSpot(newSpot));
    return newSpot;
  }
};


export const createSpotImages = (spotId, imageUrl, preview) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: imageUrl, preview: preview}),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setImages(data));
    return data;
  } else {
    console.error("Failed to upload image:", await response.json());
  }
};

export const currentUsersSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`)
  const data = await response.json();
  dispatch(setUsersSpots(data.Spots));
  return data;
}

export const updateUserSpot = (spotId, spotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotData)
  })
  const updatedSpot = await response.json()
  dispatch(updateSpot(updatedSpot))
  return updatedSpot;
}

export const deleteASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const deletedSpot = await response.json()
  dispatch(deleteSpot(deletedSpot))
  return deletedSpot
}


const initialState = {
  spot: [],
  userSpots: []
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spot: action.payload };
    case SET_SPOT_DETAILS:
      return {...state, spotDetails: action.payload}
    case CREATE_A_NEW_SPOT:
      return { ...state, spot: [...state.spot, action.payload] };
    case CREATE_SPOT_IMAGES:
      return { ...state, spotImages: [...(state.spotImages || []), action.payload] };
    case SET_USERS_SPOTS:
      return { ...state, userSpots: action.payload}
    case UPDATE_SPOT:
      return {
        ...state,
        spot: state.spot.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case DELETE_SPOT:
      return {
        ...state,
        spots: state.spot.filter((s) => s.id !== action.payload),
      };
    default:
      return state;
  }
};

export default spotReducer;