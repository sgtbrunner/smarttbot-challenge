import React, { Component } from "react";

import { Ranking } from "../pages/Ranking/ranking.component";
import { Loading } from "../components/Loading/Loading.component";
import { getSummary, getCurrencies } from "../utils/dataService.util";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      searchfield: "",
      clickedCoin: "",
    };
  }

  async componentDidMount() {
    this.setState({ coins: await getSummary() });
    // getCurrencies();
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value }, () =>
      console.log(this.state.searchfield)
    );
  };

  render() {
    // const filteredData = this.state.coins.filter(entry => {
    //     return entry.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    //   }
    // );

    if (!this.state.coins.length) {
      return <Loading />;
    } else {
      return (
        <Ranking onSearchChange={this.onSearchChange} rows={this.state.coins} />
      );
    }
  }
}

export default App;
