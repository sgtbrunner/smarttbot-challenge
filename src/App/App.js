import React, { Component } from "react";

import { Ranking } from "../pages/Ranking/ranking.component";
import { Loading } from "../components/Loading/Loading.component";
import { getSummary } from "../utils/dataService.util";
import { getCurrentDateTime } from "../utils/dateTime.util";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pairs: [],
      searchfield: '',
      lastUpdate: '',
    };
  }

  componentDidMount() {
    this.loadSummary();
    setInterval(() => { this.loadSummary() }, 60000);
  }

  async loadSummary() {
    this.setState({ pairs: await getSummary(), lastUpdate: getCurrentDateTime() });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filteredData = this.state.pairs.filter((pair) => {
        return ( pair.pairCode.toLowerCase().includes(this.state.searchfield.toLowerCase()) 
          || pair.currencies.toLowerCase().includes(this.state.searchfield.toLowerCase()));
      }
    );

    if (!this.state.pairs.length) {
      return <Loading />;
    } else {
      return (
        <Ranking 
          rows={filteredData} 
          updatedAt={this.state.lastUpdate} 
          onSearchChange={this.onSearchChange} 
        />
      );
    }
  }
}

export default App;
