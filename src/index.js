import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App/App';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1BA39C'
    }
  }
});

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
