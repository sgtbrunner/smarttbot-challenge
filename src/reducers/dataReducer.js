import { GET_SUMMARY, GET_CURRENT_DATE_TIME} from "../actions/types";

const initialState = {
  pairs: [],
  lastUpdate: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUMMARY:
      return {
        ...state,
        exercises: action.payload
      };
    case GET_CURRENT_DATE_TIME:
      return {
        ...state,
        exercises: state.exercises.filter(el => el._id !== action.payload)
      };
    default:
      return state;
  }
}
