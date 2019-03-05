import hash from 'object-hash';
import {
  FETCH_CASES_BEGIN,
  FETCH_CASES_SUCCESS,
  FETCH_CASES_FAILURE,
  UPDATE_CASES_BEGIN,
  UPDATE_CASES_SUCCESS,
  UPDATE_CASES_FAILURE,
  DELETE_CASES_BEGIN,
  DELETE_CASES_SUCCESS,
  DELETE_CASES_FAILURE,
  CREATE_CASES_BEGIN,
  CREATE_CASES_SUCCESS,
  CREATE_CASES_FAILURE
} from '../actions/cases';

import { RECORDS_PER_PAGE } from '../../config/constants';

const initialState = {
  items: [],
  loading: false,
  filtersHash: hash({}),
  noMoreToLoad: false,
  error: null
};

export default function cases(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CASES_SUCCESS:
      const ids = action.payload.cases.map(c => c.id);
      let prunedFetchedItems = [];
      if (state.filtersHash === action.payload.filtersHash) {
        prunedFetchedItems = state.items.filter((value, index, arr) => {
          return !ids.includes(value.id);
        });
      }
      return {
        ...state,
        loading: false,
        filtersHash: action.payload.filtersHash,
        noMoreToLoad: action.payload.cases.length < RECORDS_PER_PAGE ? true : false,
        items: [...prunedFetchedItems, ...action.payload.cases]
      };

    case CREATE_CASES_BEGIN:
    case UPDATE_CASES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_CASES_SUCCESS:
      const updatedItems = state.items;
      const caseIndex = state.items.findIndex(x => x.id === action.payload.updatedCase.id);
      updatedItems[caseIndex] = action.payload.updatedCase;

      return {
        ...state,
        loading: false,
        items: updatedItems
      };

    case CREATE_CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload.newCase]
      };

    case DELETE_CASES_FAILURE:
    case FETCH_CASES_FAILURE:
    case CREATE_CASES_FAILURE:
    case UPDATE_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case DELETE_CASES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((value, index, arr) => {
          return value.id !== action.payload.id;
        })
      };
    default:
      return state;
  }
}
