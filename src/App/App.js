import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "../components/Header/Header.component";
import { Ranking } from "../pages/Ranking/Ranking.component";
import { PairInfo } from "../pages/PairInfo/PairInfo.Component";
import { getSummary } from "../services/data.service";
import { getCurrentDateTime } from "../utils/dateTime.util";
import "./App.css";

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

  render() {
    const filteredData = this.state.pairs.filter((pair) => {
      return ( pair.pairCode.toLowerCase().includes(this.state.searchfield.toLowerCase()) 
            || pair.currencies.toLowerCase().includes(this.state.searchfield.toLowerCase())
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
              />
            )} 
          />
        </Switch>
      </div>
    );
  }
}

export default App;
