const INITIAL_STATE = {
  pairs: [],
  lastUpdate: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SUMMARY":
      console.log(action.payload)
      return {
        ...state,
        pairs: action.payload
      };
    case "GET_CURRENT_DATE_TIME":
      return {
        ...state,
        lastUpdate: action.payload
      };
    default:
      return state;
  }
}
