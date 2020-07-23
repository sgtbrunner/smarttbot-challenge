import { getSummary } from "../utils/dataHandle.util";
import { getCurrentDateTime } from "../utils/dateTime.util";
import { GET_SUMMARY, GET_CURRENT_DATE_TIME} from "../actions/types";

export const fetchSummary = () => (dispatch) => {
    const loadSummary = () => 
        getSummary()
        .then(res =>
            dispatch({
                type: GET_SUMMARY,
                payload: res
            })
        );

        getCurrentDateTime()
        .then(res => 
            dispatch({
                type: GET_CURRENT_DATE_TIME,
                payload: res
            })
        );
    
    loadSummary();
    setInterval(() => { loadSummary() }, 60000);
}
