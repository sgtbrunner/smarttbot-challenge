import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./components/Header/Header.component";
import { Ranking } from "./pages/Ranking/Ranking.component";
import { PairInfo } from "./pages/PairInfo/PairInfo.Component";
import { getSummary } from "./utils/dataHandle.util";
import { getCurrentDateTime } from "./utils/dateTime.util";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pairs: [],
      searchfield: "",
      lastUpdate: "",
    };
  }

  componentDidMount() {
    this.loadSummary();
    setInterval(() => { this.loadSummary() }, 60000);
  }

  async loadSummary() {
    this.setState({
      pairs: await getSummary(),
      lastUpdate: getCurrentDateTime(),
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  onPairClick = (pairId) => {
    return this.state.pairs.filter((pair) => {
      return pair.id.toString() === pairId.toString()} 
    )[0];
  };

  render() {
    const filteredData = this.state.pairs.filter((pair) => {
      return (
        pair.pairCode.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
        pair.currencies.toLowerCase().includes(this.state.searchfield.toLowerCase())
      );
    });

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <Ranking
                {...props}
                rows={filteredData}
                updatedAt={this.state.lastUpdate}
                onSearchChange={this.onSearchChange}
              />
            )}
          />
          <Route
            path="/pair/:pairId"
            render={(props) => (
              <PairInfo
                {...props}
                pair={this.onPairClick(props.match.params.pairId)}
                updatedAt={this.state.lastUpdate}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
