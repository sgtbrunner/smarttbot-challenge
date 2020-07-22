import React from "react";

import { getComplementaryPairInfo } from "../../utils/dataHandle.util";

export const PairInfo = props => {
    console.log(props);
    const { history, location, match, pair, updatedAt } = props;

    const getData = async pair => {
        if(pair) {
            const response = await getComplementaryPairInfo(props.pair.pairCode.replace('/','_'));
            console.log(response);
        }
    }

    getData(pair);

    return (
        <div>Tela do id {props.match.params.pairId}</div>
    )
}