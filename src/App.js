import React, { useEffect, useState } from "react";
import { connect} from "react-redux"
import { Switch, Route } from "react-router-dom";

import { Header } from "./components/Header/Header.component";
import { Ranking } from "./pages/Ranking/Ranking.page";
import { PairInfo } from "./pages/PairInfo/PairInfo.page";

import { getSummary } from "./utils/dataHandle.util";
import { getCurrentDateTime } from "./utils/dateTime.util";
import { setLoadSumary, setUpdated } from "./actions/dataActions";


const App = ( { pairs, lastUpdate, setPairs, setUpdated} ) => {
  const [searchField, setSearchField] = useState("");
 

    useEffect(() => {
       async function fetchData() {
        const resultSumary = await getSummary()
        const resultUpdated = getCurrentDateTime();
        
        
        setPairs(resultSumary);
        setUpdated(resultUpdated);
      }
      fetchData();
      setInterval(() => { fetchData() }, 60000)
    }, []);

  const onSearchChange = event => {
    setSearchField(event.target.value);
  };

  const onPairClick = (pairId) => {
    return pairs.filter((pair) => {
      return pair.id.toString() === pairId.toString()} 
    )[0];
  };

  
    const filteredData = pairs.filter((pair) => {
      return (
        pair.pairCode.toLowerCase().includes(searchField.toLowerCase()) ||
        pair.currencies.toLowerCase().includes(searchField.toLowerCase())
      );
    });

    return (
        <div className="app">
          <Header />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Ranking
                  {...props}
                  rows={filteredData}
                  updatedAt={lastUpdate}
                  onSearchChange={onSearchChange}
                />
              )}
            />
            <Route
              path="/pair/:pairId"
              render={(props) => (
                <PairInfo
                  {...props}
                  pair={onPairClick(props.match.params.pairId)}
                  updatedAt={lastUpdate}
                />
              )}
            />
          </Switch>
        </div>
    );
  }

const mapStateToProps = (state) => ({
    pairs: state.dataReducer.pairs, 
    lastUpdate: state.dataReducer.lastUpdate
  })

  const mapDispatchToProps = (dispatch) => ({
    setPairs: (pairs) => dispatch(setLoadSumary(pairs)),
    setUpdated: (date) => dispatch(setUpdated(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

