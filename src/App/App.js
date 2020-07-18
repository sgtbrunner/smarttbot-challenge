import React, { Component } from "react";

import { Ranking } from "../pages/Ranking/ranking.component";
import { Loading } from "../components/Loading/Loading.component";
import { getSummary, getCurrencies } from "../utils/dataService.util";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pairs: [],
      searchfield: '',
      clickedCoin: '',
    };
  }

  componentDidMount() {
    this.loadPairsData();
    setInterval(() => { this.loadPairsData() }, 60000);
    // getCurrencies();
  }

  async loadPairsData() {
    console.log('load starts');
    this.setState({ pairs: await getSummary() });
    console.log('load ends');
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filteredData = this.state.pairs.filter((pair) => {
        return pair.pairName.toLowerCase().includes(this.state.searchfield.toLowerCase());
      }
    );

    if (!this.state.pairs.length) {
      return <Loading />;
    } else {
      return (
        <Ranking onSearchChange={this.onSearchChange} rows={filteredData} />
      );
    }
  }
}

export default App;
