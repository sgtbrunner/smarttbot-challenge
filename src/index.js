import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import store from "./store";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1BA39C",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
