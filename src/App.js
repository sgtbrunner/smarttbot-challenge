import React, {Component} from 'react';
import Container from '@material-ui/core/Container';

import { SearchFilter } from './components/SearchFilter.component';
import { CustomizedTable } from './components/CustomizedTable.component';
import './App.css';

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
  // createData('India', 'IN', 1324171354, 3287263),
  // createData('China', 'CN', 1403500365, 9596961),
  // createData('Italy', 'IT', 60483973, 301340),
  // createData('United States', 'US', 327167434, 9833520),
  // createData('Canada', 'CA', 37602103, 9984670),
  // createData('Australia', 'AU', 25475400, 7692024),
  // createData('Germany', 'DE', 83019200, 357578),
  // createData('Ireland', 'IE', 4857000, 70273),
  // createData('Mexico', 'MX', 126577691, 1972550),
  // createData('Japan', 'JP', 126317000, 377973),
  // createData('France', 'FR', 67022000, 640679),
  // createData('United Kingdom', 'GB', 67545757, 242495),
  // createData('Russia', 'RU', 146793744, 17098246),
  // createData('Nigeria', 'NG', 200962417, 923768),
  // createData('Brazil', 'BR', 210147125, 8515767)
];

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: rows,
      searchfield: '',
      clickedCoin: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value}, () => console.log(this.state.searchfield));
  }
  
  render() {
    const filteredData = this.state.data.filter(entry => {
        return entry.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
      } 
    );

    return (
      <Container maxWidth="lg">
        <h1>SmarttBot Challenge</h1>
        <SearchFilter searchChange={this.onSearchChange}/>
        <CustomizedTable rows={filteredData} />
      </Container>
    );
  }
}

export default App;
