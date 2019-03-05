import {
  FETCH_LOCATIONS_BEGIN,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE
} from '../actions/locations';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_LOCATIONS_SUCCESS:
      const lookupTable = {};
      const items = action.payload.locations.map(location => {
        lookupTable[location.id] = location.name;
        return { label: location.name, value: String(location.id) };
      });
      return {
        ...state,
        loading: false,
        items: items,
        lookup: lookupTable
      };

    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
