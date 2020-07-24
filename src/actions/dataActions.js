export function setLoadSumary(payload){
    return { type: "SET_SUMMARY", payload}
}
export function setUpdated(payload){
    return { type: "GET_CURRENT_DATE_TIME", payload}
}



// import { getSummary } from "../utils/dataHandle.util";
// import { getCurrentDateTime } from "../utils/dateTime.util";

// export const fetchSummary = () => (dispatch) => {
//     const loadSummary = () => 
//         getSummary()
//         .then(res =>
//             dispatch({
//                 type: "GET_SUMMARY",
//                 payload: res
//             })
//         );

//         getCurrentDateTime()
//         .then(res => 
//             dispatch({
//                 type: "GET_CURRENT_DATE_TIME",
//                 payload: res
//             })
//         );
    

// }
