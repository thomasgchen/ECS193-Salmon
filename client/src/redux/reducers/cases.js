import { FETCH_CASES_BEGIN, FETCH_CASES_SUCCESS, FETCH_CASES_FAILURE } from '../actions/cases';

const initialState = {
  items: [
    {
      id: 4,
      caseNum: 'AAA1234',
      date: '12/12/2018',
      confidence: 'High',
      species: 'CHIN',
      age: 'Adult',
      pathogen: 'HIV',
      numFish: 69,
      fish: true,
      numPositive: 420,
      prevalence: 0.69,
      comments: 'Hi',
      createdAt: '2019-02-10T06:15:16.844Z',
      updatedAt: '2019-02-10T06:15:16.844Z',
      LocationId: null
    }
  ],
  loading: false,
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
      return {
        ...state,
        loading: false,
        items: action.payload.cases
      };

    case FETCH_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}
