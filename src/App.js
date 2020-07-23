import React, { Component } from "react";
import { connect} from "react-redux"
import { Provider } from 'react-redux';
import { Switch, Route } from "react-router-dom";

import { Header } from "./components/Header/Header.component";
import { Ranking } from "./pages/Ranking/Ranking.page";
import { PairInfo } from "./pages/PairInfo/PairInfo.page";
import { fetchSummary } from "./actions/dataActions"
import store from "./store";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pairs: [],
      lastUpdate: "",
      searchfield: "",
    };
  }

  componentDidMount() {
    this.props.fetchSummary();
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  onPairClick = (pairId) => {
    return this.props.pairs.filter((pair) => {
      return pair.id.toString() === pairId.toString()} 
    )[0];
  };

  render() {
    const filteredData = this.props.pairs.filter((pair) => {
      return (
        pair.pairCode.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
        pair.currencies.toLowerCase().includes(this.state.searchfield.toLowerCase())
      );
    });

    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Ranking
                  {...props}
                  rows={filteredData}
                  updatedAt={this.props.lastUpdate}
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
                  updatedAt={this.props.lastUpdate}
                />
              )}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}

const mapStatetoProps = state=> ({pairs: state.pairs, lastUpdate: state.lastUpdate})

export default connect(mapStatetoProps, {fetchSummary}) (App);
