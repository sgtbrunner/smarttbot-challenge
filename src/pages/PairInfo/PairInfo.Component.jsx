import React from "react";

export const PairInfo = (props) => {
    console.log(props);
    return (
        <div>Tela do id {props.match.params.pairId}</div>
    )
}