import React, { Component } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

import nutrition from './nutrition.json';

class App extends Component {
  constructor(props) {
    super(props)
    const initialFilter = {
      logic: 'and',
      filters: [{ field: 'Description', operator: 'contains', value: 'Apple' }]
    };
    
    this.state = {
      data: this.getnutrition(initialFilter),
      filter: initialFilter,
    };
    this.filterChange = this.filterChange.bind(this);
  }

  filterChange = (event) => {
    this.setState({
      data: this.getnutrition(event.filter),
      filter: event.filter
    });
  }

  getnutrition = (filter) => filterBy(nutrition, filter);
      
  render() {
    return (
      <div className="App">
        <h1> Healthy Things! </h1>
        <Grid
          style={{ maxHeight: '500px' }}
          data={this.state.data}
          filterable={true}
          filter={this.state.filter}
          filterChange={this.filterChange}>
          <Column field='Description' title='Food' />
          <Column field='Measure' title='Amount' />
          <Column field='Protein(g)Per Measure' title='Protein' />
          <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs' />
          <Column field='Sugars, total(g)Per Measure' title='Sugars' />
        </Grid>
      </div>
    );
  }
}

export default App;
